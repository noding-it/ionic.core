import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {catchError, map} from 'rxjs/operators';
import {LoadingService} from '../services/loading.service';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class RequestInterceptor implements HttpInterceptor {

  constructor(
    private _loadingService: LoadingService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.headers.get('showLoader') !== 'false') {
      this._loadingService.present();
      // this._loadingService.setLoading(true, req.url);
    }

    return next.handle(req)
      .pipe(
        catchError((err) => {
          // this._loadingService.setLoading(false, req.url);
          this._loadingService.dismiss();
          return err;
        }),
        map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
          if (evt instanceof HttpResponse) {
              this._loadingService.dismiss();
          }
          /*if (evt instanceof HttpResponse && req.headers.get('showLoader') !== 'false') {
            this._loadingService.setLoading(false, req.url);
          }*/
          return evt;
        })
      );
  }
}
