import { HttpRequest } from '@angular/common/http';
import { EventEmitter, Injectable } from "@angular/core";

@Injectable()
export class LoadingService {
    loadingChanged: EventEmitter<boolean> = new EventEmitter<boolean>()

    // store concurrent requests
    private requests: HttpRequest<any>[] = []

    //Add a request and notify observers
    onStart(req: HttpRequest<any>): void{
        const reqShowLoader = req.headers.get('showLoader')
        if(reqShowLoader === 'true'){
            this.requests.push(req)
            this.notify()
        }
    }

    // remove request and notify observers
    onFinish(req: HttpRequest<any>): void{
        const index = this.requests.indexOf(req)
        if( index !== -1){
            this.requests.splice(index, 1)
        }
        this.notify()
    }


    // notify observers about running requests
    private notify():void{
        this.loadingChanged.emit(this.requests.length !== 0)
    }
}
