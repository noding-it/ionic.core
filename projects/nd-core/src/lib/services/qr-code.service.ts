import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {QrCodeRequest} from '../interfaces/qr-code';
import {EnvironmentConfig} from "../interfaces/environment-config";

// https://www.qr-code-generator.com/qr-code-api/
@Injectable({
  providedIn: 'root'
})
export class QrCodeService {

  constructor(
    @Inject('CORE_ENVIRONMENT') private _viewConfig : EnvironmentConfig,
    private _http: HttpClient,
  ) {
  }

  create(options: QrCodeRequest): Observable<any> {
    return this._http.post(
      `${this._viewConfig.environment.apiGateway}/qrcode`,
      {...options},
      {
        headers: new HttpHeaders().set('content-type', 'application/json').set('authorization', this._viewConfig.environment.TOKEN).set('showLoader', 'false'),
        observe: 'body',
        responseType: 'text',
      }
    );
  }
}
