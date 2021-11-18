import {Injectable, isDevMode} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GlobalService} from './global.service';
import {Observable} from 'rxjs';

const AUTH_URL = isDevMode() ? 'https://demoauth.fatturazioneelettronica.aruba.it/' : 'https://auth.fatturazioneelettronica.aruba.it/';
const API_URL = isDevMode() ? 'https://demows.fatturazioneelettronica.aruba.it/' : 'https://ws.fatturazioneelettronica.aruba.it/';
const ARUBA_CODE = 'KRRH6B9';

@Injectable({
    providedIn: 'root'
})
export class ArubaService {

    constructor(
        private _http: HttpClient,
        private _globalService: GlobalService,
    ) {
    }

    public accessToken = '';
    public refreshToken = '';

    login(): void {
        this._http.post<any>(
            `${AUTH_URL}auth/signin`,
            {
                username: null,
                password: null,
                grant_type: null,
            },
            {
                headers: new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
            }
        ).subscribe(access => {
            console.log(access);
            this.accessToken = access.access_token;
            this.refreshToken = access.refresh_token;
        }, error => console.error(error.message));
    }

    asd(): Observable<any> {
        return this._http.post<any>(
            `${API_URL}auth/signin`,
            {
                username: null,
                password: null,
                grant_type: null,
            },
            {
                headers: new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8').set('Authorization', `Bearer ${this.accessToken}`)
            }
        );
    }

}
