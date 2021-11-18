import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {QrCodeRequest} from '../interfaces/qr-code';

// https://www.qr-code-generator.com/qr-code-api/
@Injectable({
  providedIn: 'root'
})
export class QrCodeService {

  constructor(
    private _http: HttpClient,
  ) {
  }

  private _apiUrl: string;
  private _token: string;

  public setEnvironment(apiUrl: string, token: string) {
    this._apiUrl = apiUrl;
    this._token = token;
  }

  create(options: QrCodeRequest): Observable<any> {
    return this._http.post(
      `${this._apiUrl}/qrcode`,
      {...options},
      {
        headers: new HttpHeaders().set('content-type', 'application/json').set('authorization', environment.TOKEN).set('showLoader', 'false'),
        observe: 'body',
        responseType: 'text',
      }
    );
  }
}
