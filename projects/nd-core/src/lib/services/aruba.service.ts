import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GlobalService} from './global.service';
import { ArubaService as CoreArubaService} from "@myvirtualab.angular/core";




@Injectable({
    providedIn: 'root'
})
export class ArubaService extends CoreArubaService{

    constructor(
         _http: HttpClient,
         _globalService: GlobalService,
    ) {
      super(_http,_globalService)
    }





}
