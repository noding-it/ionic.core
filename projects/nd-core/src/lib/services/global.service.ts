import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

import {Router} from '@angular/router';
import {EnvironmentConfig} from '../interfaces/environment-config';
import {GlobalService as GlobalCoreService} from "@myvirtualab.angular/core";
import {Sweetalert2Service} from "./sweetalert2.service";
import {GatewayResponse} from "@myvirtualab.angular/core/lib/interfaces/gateway-response";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class GlobalService extends GlobalCoreService {

  constructor(
     @Inject('CORE_ENVIRONMENT') _viewConfig: EnvironmentConfig,
     _http: HttpClient,
     _sweetAlert: Sweetalert2Service,
     _router: Router,
  ) {
    super(_viewConfig,_http,_sweetAlert,_router)

  }

  App = super.App
  logout(): boolean {
    return super.logout();
  }
  isLogged(): boolean {
    return super.isLogged();
  }
  callMyVirtuaLabStandaloneService(service: string, uri: string, token?: string, loader?: boolean, method?: "GET" | "POST" | "PUT" | "DELETE", params?: any, requestOptions?: any, gatewayUrl?: string): Observable<any> {
    return super.callMyVirtuaLabStandaloneService(service, uri, token, loader, method, params, requestOptions, gatewayUrl);
  }
  callGateway(process: string, params: string, loader?: boolean, gtw?: string, loaderDuration?: number): Observable<GatewayResponse> {
    return super.callGateway(process, params, loader, gtw, loaderDuration);
  }
  callMicroservice(uri: string, token?: string, loader?: boolean, method?: "GET" | "POST" | "PUT" | "DELETE", params?: any, requestOptions?: any, gatewayUrl?: string): Observable<any> {
    return super.callMicroservice(uri, token, loader, method, params, requestOptions, gatewayUrl);
  }


}
