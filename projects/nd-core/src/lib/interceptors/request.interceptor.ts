import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {tap} from 'rxjs/operators';
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
        }

        return next.handle(req)
            .pipe(
                tap(
                    (event: HttpEvent<any>) => {
                        if (event instanceof HttpResponse) {
                            this._loadingService.dismiss();
                        }
                    },
                    (err: any) => {
                        this._loadingService.dismiss();
                    })
            );
    }
}
