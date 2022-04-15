import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {LoadingService} from '../services/loading.service';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class RequestInterceptor implements HttpInterceptor {

  constructor(
    private _loadingService: LoadingService,
  ) {
  }

  // pool of requests
  private _requests: HttpRequest<any>[] = [];

  /**
   * Remove request from queue
   * @param req
   * @private
   */
  private _removeRequest(req: HttpRequest<any>) {
    const i = this._requests.indexOf(req);
    if (i >= 0) {
      this._requests.splice(i, 1);
    }
    if (this._requests.length === 0) {
      this._loadingService.isLoading.next(false);
    }
  }

  /**
   * HTTP Interceptor for manager loader
   * @param req
   * @param next
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.headers.get('showLoader') !== 'false') {
      /*this._requests.push(req);
      if (this._requests.length === 1) {
        this._loadingService.isLoading.next(true);
      }*/
    }

    return new Observable<HttpEvent<any>>(observer => {
      const subscription = next.handle(req)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this._removeRequest(req);
              observer.next(event);
            }
          },
          err => {
            this._removeRequest(req);
            observer.error(err);
          },
          () => {
            this._removeRequest(req);
            observer.complete();
          });
      // remove request from queue when cancelled
      return () => {
        this._removeRequest(req);
        subscription.unsubscribe();
      };
    });

  }
}
