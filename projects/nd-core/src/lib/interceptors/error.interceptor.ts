import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {GlobalService} from "../services/global.service";

@Injectable({providedIn: 'root'})
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private _globalService: GlobalService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req)
      .pipe(
        map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
          // 410 => session expired so force local logout
          if (evt instanceof HttpErrorResponse && evt.status === 410) {
            if (this._globalService.logout()) {
              window.location.reload();
            }
          }
          return evt;
        })
      );
  }
}
