import { finalize } from 'rxjs/operators';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';


@Injectable()
export class LoadingInterceptor implements HttpInterceptor{

    constructor (private loadingService: LoadingService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loadingService.onStart(req)
       
        return next
        .handle(req)
        .pipe(
            finalize(
                () =>{
                    this.loadingService.onFinish(req)
                }
            )
        )
    }
}