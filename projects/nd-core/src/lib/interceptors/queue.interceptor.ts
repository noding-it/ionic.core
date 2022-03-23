import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpResponse} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class QueueInterceptor implements HttpInterceptor {
  private processed: boolean = false; // to indicate Special header data recieved
  private request = new Subject<any>(); // Subject stream to indicate custom responses
  private requests: HttpRequest<any>[] = []; // to store http requests

  constructor() {
  }

  requestSetter(response: any) {
    this.request.next(response)
  } // set subject stream data
  requestGetter(): Observable<any> {
    return this.request.asObservable()
  } // listen to Stream changes and return steeam data

  // remove previous requests from queue/ Array
  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
  }

  // Default Interceptor FUnctionality
  public intercept(req: HttpRequest<any>, delegate: HttpHandler): Observable<any> {
    return new Observable<any>(observer => {
      if (req.headers.has('access-granting-header')) {
        const subscription = delegate.handle(req).subscribe(event => {
            if (event instanceof HttpResponse) {
              this.processed = true;
              this.requestSetter({key: this.processed});
              this.removeRequest(req);
              observer.next(event);
            }
          },
          err => {
            this.removeRequest(req);
            observer.error(err);
          },
          () => {
            this.removeRequest(req);
            observer.complete();
          });
        // remove request from queue when cancelled
        return () => {
          this.removeRequest(req);
          subscription.unsubscribe();
        };
      } else {
        this.requests.push(req);

        this.requestGetter().subscribe(res => {
          const i = this.requests.indexOf(req);
          if (i >= 0) {
            this.requests.splice(i, 1);
            req = req.clone({setHeaders: {'special-http-header': 'X'}});
            const subscription = delegate.handle(req).subscribe(event => {
                if (event instanceof HttpResponse) {
                  this.processed = true;
                  this.request.next(true);
                  this.removeRequest(req);
                  observer.next(event);
                }
              },
              err => {
                this.removeRequest(req);
                observer.error(err);
              },
              () => {
                this.removeRequest(req);
                observer.complete();
              });
            // remove request from queue when cancelled
            return () => {
              this.removeRequest(req);
              subscription.unsubscribe();
              this.request.unsubscribe();
            };
          }
        });

        /**
         * to process calls after the subject stream is unsubscribed
         */
        if (this.processed === true) {
          const i = this.requests.indexOf(req);
          if (i >= 0) {
            this.requests.splice(i, 1);
            req = req.clone({setHeaders: {'special-http-header': 'X'}});
            const subscription = delegate.handle(req).subscribe(event => {
                if (event instanceof HttpResponse) {
                  this.removeRequest(req);
                  observer.next(event);
                }
              },
              err => {
                this.removeRequest(req);
                observer.error(err);
              },
              () => {
                this.removeRequest(req);
                observer.complete();
              });
            // remove request from queue when cancelled
            return () => {
              this.removeRequest(req);
              subscription.unsubscribe();
            };
          }
        }
      }
    });
  }
}
