import {Injectable, EventEmitter} from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent,
  HttpClient
} from '@angular/common/http';
import {Observable, Observer, Subscription, throwError, timer} from 'rxjs';
import {retryWhen, mergeMap, finalize} from 'rxjs/operators';

@Injectable()
export class NetworkQueueInterceptor implements HttpInterceptor {
  onChanges = new EventEmitter<boolean>();
  private lastValue = this.isOnline();

  queue = new Map<string, { req: HttpRequest<any>, next: HttpHandler, subscriber: Observer<any> }>();

  get pending() {
    return this.queue.size;
  }

  isQueued = false;

  constructor(private http: HttpClient) {
    // Monitor network state. Emit event on changes.
    // 1. Online/Offline events Will work in IE. Chrome will ignore these unless we put the event listener on the window object. But then IE will ignore them.
    document.body.addEventListener('offline', () => this.fireChange(this.isOnline()));
    document.body.addEventListener('online', () => this.fireChange(this.isOnline()));

    // 2. Online/Offline events is only triggered on the window object in chrome. Theses events do not bubble up to window object on IE, so we need both until point 3 is implemented as a standard.
    window.addEventListener('offline', () => this.fireChange(this.isOnline()));
    window.addEventListener('online', () => this.fireChange(this.isOnline()));

    // 3. Test if client supports Network Information API: https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API
    // [INFO]: Removed as Network Information API is in proposal only. It's implemented in Chrome, but Typescript wont compile with this in.
    // if (navigator.connection) {
    //   navigator.connection.addEventListener('change', () => this.fireChange(this.isOnline()));
    // }
  }

  /**
   * Event fire debouncer.
   */
  private fireChange(val: any) {
    if (this.lastValue !== val) { // Do not emit events when status has not changed.
      this.lastValue = val;       // Cache last emitted value.
      this.onChanges.emit(val);   // Emit the event
    }
  }

  /**
   * Check the current network state
   */
  isOnline(): boolean {
    return !!window.navigator.onLine;
  }

  displayToast() {
    // Suggest using a MatSnackbar here for this, but keep the reference so we can close it later.
    // this.toastRef = this.snackBar.open('We are offline...', 'WAIT', {});
  }

  dismissToast() {
    // If using a MatSnackbar, here is the place you should dismiss the reference.
    // this.toastRef.dismiss();
  }

  /**
   * Wrap our queue around any requests going out
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    // Wrap the request in our own observable. This gains us total control over when and how we return.
    return new Observable((subscriber: Observer<any>) => {
      // Add request to the queue, identified by our own UUID implementation
      this.queue.set(NetworkQueueInterceptor.fakeUuid(), {req: req, next: next, subscriber: subscriber});
      // Try to process queue immediately
      this.processQueue();
    });
  }

  /**
   * Process the current network queue.
   *
   * This will perform a test of network state for each item in the queue. If we are online, we process
   * immediately. If we are offline, we defer to when we are online again.
   *
   * We also generate a unique identifier for the requests and attach this to the header.
   * This is something we can use to identify if the request was performed backend or not, in case our
   * network die in mid-flight.
   */
  processQueue() {
    if (this.pending === 0) {
      return;
    } // Just exit if queue is empty

    // We have queued up requests. Go through each of them.
    this.queue.forEach((q, uuid) => {
      if (!this.isOnline()) { // We are offline
        if (this.isQueued) {
          return;
        } // Die fast here if we enter multiple times...
        this.isQueued = true;          // ... because there should only be one process listener.

        // Notify user of network state
        this.displayToast();

        // Listen to connectivity changes and defer queue to when we are online again
        const connectivity = this.onChanges.subscribe(online => {
          if (online) {
            this.dismissToast();
            this.processQueue();
            connectivity.unsubscribe(); // Should only process once
          }
        });
        return; // Exit loop
      }

      // We are online
      this.isQueued = false;

      // Attach uuid to original request header only if we have not previously added.
      if (!q.req.headers.has('n-uuid')) {
        // We have to clone the request in order to attach headers, because they are immutable: ref. https://angular.io/guide/http#update-headers
        q.req = q.req.clone({headers: q.req.headers.append('n-uuid', uuid)});
      }

      // Try request immediately
      const req = q.next.handle(q.req);
      if (['GET', 'DELETE'].includes(q.req.method)) {
        // This will retry the request once every other second, 5 times.
        req.pipe(retryWhen(retryStrategy({
          maxRetryAttempts: 5,
          scalingDuration: 2000,
          excludedStatusCodes: [400, 401, 403, 404]
        })));
      }

      // Return the response to our observer
      let connectivity: Subscription;
      const onSuccess = (res: any) => {
        q.subscriber.next(res);   // This will just push data into the pipeline. It will not complete the request.
      };
      const onError = (err: any) => {
        q.subscriber.error(err);  // Inform subscriber on error
      };
      const onCompleted = () => {
        q.subscriber.complete();  // Notify original subscriber
        this.queue.delete(uuid);  // Request processed successfully. Remove from queue.
        if (connectivity) {
          connectivity.unsubscribe();
        } // Cleanup
      };
      const reqSubscription = req.subscribe(onSuccess, onError, onCompleted);

      // Check online status during the request transmission
      if (['POST', 'PUT'].includes(q.req.method)) {
        connectivity = this.onChanges.subscribe(online => {
          if (!online) {
            // We've died mid-flight!!
            reqSubscription.unsubscribe(); // Timeout original request, but do not throw yet.
          } else {
            // We are back online, ask server to verify that the request was received.
            connectivity.unsubscribe();
            this.http.get(`/api/verify/${uuid}`).subscribe(val => {
              if (!!val) { // Request went through. We have no official response, but we can at least return truthy.
                onSuccess(val);
                onCompleted();
              } else { // Server has not received our request. We start over.
                this.processQueue();
              }
            });
          }
        });
      }
    });
  }

  /**
   * Generate a UUID for the request. This will be attached to the header of the request and
   * can be used to verify if a request is processed or not.
   */
  private static fakeUuid() {
    const r = (new Date()).getTime().toString(16) + Math.random().toString(16).substring(2) + '0'.repeat(16);
    return r.substr(0, 8) + '-' + r.substr(8, 4) + '-4000-8' + r.substr(12, 3) + '-' + r.substr(15, 12);
  }
}

export interface RetryOptions {
  maxRetryAttempts?: number;
  scalingDuration?: number;
  excludedStatusCodes?: number[];
}

/**
 * Retry helper.
 *
 * This is just an extra safety precausion. If request is sent, but is corrupted along the way resulting
 * in obscure errors, we can retry the same request hoping for better results.
 *
 * Now we would not want to do this for POST or PUT requests, as we cannot guarantee that the errors occur
 * from network instability. But for GET and DELETE requests it's absolutely safe to retry several times
 * if we experience obscure errors.
 *
 * BTW: This piece of code is stolen from https://www.learnrxjs.io/operators/error_handling/retrywhen.html
 */
export const retryStrategy = ({
                                maxRetryAttempts = 4,
                                scalingDuration = 1000,
                                excludedStatusCodes = [400]
                              }: RetryOptions = {}) => (errors: Observable<any>): Observable<any> => {
  return errors.pipe(
    mergeMap((error, i) => {
      const retryAttempt = i + 1;
      if (retryAttempt > maxRetryAttempts || excludedStatusCodes.find(e => e === error.status)) {
        // if maximum number of retries have been met
        // or response is a status code we don't wish to retry, throw error
        return throwError(error);
      }
      console.log(`Attempt ${retryAttempt}: retrying in ${retryAttempt * scalingDuration}ms`);
      // retry after 1s, 2s, etc...
      return timer(retryAttempt * scalingDuration);
    }),
    finalize(() => console.log('We are done!'))
  );
};
