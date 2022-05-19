import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {throwError} from 'rxjs';
import {Observable} from 'rxjs/internal/Observable';
import {catchError, tap} from 'rxjs/operators';
import {Platform} from '@ionic/angular';
import {Device} from '@ionic-native/device/ngx';
import {IGatewayResponse} from '../interfaces/gateway-response';
import {AppConfig} from '../interfaces/app';
import {NetworkService} from './network.service';
import {Sweetalert2Service} from './sweetalert2.service';
import {Router} from '@angular/router';
import {EnvironmentConfig} from '../interfaces/environment-config';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {

  constructor(
    @Inject('CORE_ENVIRONMENT') private _viewConfig: EnvironmentConfig,
    private _http: HttpClient,
    public platform: Platform,
    public device: Device,
    public networkService: NetworkService,
    private _sweetAlert: Sweetalert2Service,
    private _router: Router,
  ) {
  }

  private _isMenuOpen: boolean;

  public App: AppConfig = {
    user: undefined,
    logged: true,
    settings: [],
    ruotes: [],
    appPages: [],
  };

  //////////////////////// GLOBAL FUNCTION /////////////////////////

  public callGateway(process, params, loader = false, gtw = 'apiDBox', loaderDuration = 1000): Observable<IGatewayResponse> {
    return this._http.post<IGatewayResponse>(
      this._viewConfig.environment[gtw] + '?gest=2',
      {
        type: 1,
        process,
        params,
        token: localStorage.getItem('token'),
      },
      {
        headers: new HttpHeaders().set('content-type', 'application/json').set('authorization', this._viewConfig.environment.TOKEN).set('showLoader', (loader ? '' : 'false')),
      },
    ).pipe(
      catchError(this.errorHandler),
      tap(resp => {
        if (resp.error === 'Invalid token 4 !') {
          delete resp.error;
          if (this.logout()) {
            window.location.reload();
          }
        } else if (resp.error === 'Invalid token 2 !') {
          delete resp.error;
        }
      }),
    );
  }

  /**
   *
   * @param uri = uri del microservizio => ${urlServizio}${uri}
   * @param token = Bearer ${token} usato nell'headers come Authorization; se null => environment.TOKEN
   * @param loader = 'showLoader'
   * @param method = 'GET' | 'POST'; default 'GET'
   * @param params = params per chiamate 'POST'
   * @param url = usato al posto di environment.apiGateway
   */
  public callMicroservice(uri: string, token?: string, loader = false, method: 'GET' | 'POST' = 'GET', params: any = null, url?: string): Observable<any> {
    if (method === 'GET') {
      return this._http.get<any>(
        `${(!this._viewConfig.environment.production && url) ? url : this._viewConfig.environment.apiGateway}${uri}`,
        {
          headers: new HttpHeaders().set('content-type', 'application/json').set('Authorization', (token ? `Bearer ${token}` : this._viewConfig.environment.TOKEN)).set('showLoader', (loader ? '' : 'false')),
        },
      ).pipe(
        catchError(this.errorHandler),
      );
    } else {
      return this._http.post<any>(
        `${(!this._viewConfig.environment.production && url) ? url : this._viewConfig.environment.apiGateway}${uri}`,
        params,
        {
          headers: new HttpHeaders().set('content-type', 'application/json').set('Authorization', (token ? `Bearer ${token}` : this._viewConfig.environment.TOKEN)).set('showLoader', (loader ? '' : 'false')),
        },
      ).pipe(
        catchError(this.errorHandler),
      );
    }
  }

  public checkUser(moduleFilterFunction: Function): boolean {
    if (localStorage.getItem('token') === undefined || localStorage.getItem('token') === null) {
      this.App.logged = false;
      if (window.location.pathname.indexOf('/public/') === -1) {
        this._router.navigate(['/login']);
      }
    } else {
      this.App.logged = true; // per evitare che la guard mi mandi al login in modo forzato
      this.App.user = JSON.parse(localStorage.getItem('user'));
      this.init(moduleFilterFunction);
    }
    return (this.App.logged);
  }

  // potrei allocare direttamente qui il token che mi ritorna il server
  // e rendere solo un booleano
  public login(username, password): Observable<any> {
    if (!this.networkService.isOnline()) {
      this._sweetAlert.warning('Il tuo dispositivo risulta essere OFFLINE !');
    }
    return this._http.post(
      this._viewConfig.environment.apiAuth + '?gest=2',
      {
        type: 1,
        username,
        password,
        token: this._viewConfig.environment.TOKEN,
      },
      {
        headers: new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded'),
      },
    ).pipe(
      catchError(this.errorHandler),
    );
  }

  public login4rya(accountID: string): Observable<any> {
    if (!this.networkService.isOnline()) {
      this._sweetAlert.warning('Il tuo dispositivo risulta essere OFFLINE !');
    }
    return this._http.post(
      this._viewConfig.environment.apiAuth + '&arya=1',
      {
        type: 1,
        accountid: accountID,
        token: this._viewConfig.environment.TOKEN,
      },
      {
        headers: new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded'),
      },
    ).pipe(
      catchError(this.errorHandler),
    );
  }

  public getImpostazione(impostazioneID: number): string | undefined {
    if (this.App.settings.length > 0) {
      return this.App.settings.filter(imp => imp.id === impostazioneID)[0]?.valore;
    }
    return undefined;
  }

  public routeCheck(url: string): boolean {
    return this.App?.ruotes?.filter(r => r.path === url)?.length > 0;
  }

  public logout(): boolean {
    try {
      this.App.user = undefined;
      this.App.logged = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.setMenu(false);
      return true;
    } catch (e) {
      return false;
    }
  }

  public isLogged(): boolean {
    return this.App.logged;
  }

  public setMenu(_value: boolean): void {
    this._isMenuOpen = _value;
  }

  public isMenuOpen(): boolean {
    return this._isMenuOpen;
  }

  //////////////////////// INIT /////////////////////////

  public init(moduleFilterFunction: Function) {
    // this.checkUser();
    this.getModulesRoutes(moduleFilterFunction);
    this.setMenu(this.isLogged());
  }

  public getModulesRoutes(moduleFilterFunction: Function) {
    this.callGateway('Ur9E1ZEg7pcZ2Knpya2qCtWUz4EDdQyZLU909XFq/uQtWy0tSVYtWy2UuaFblv0rtkC72Uoiab9ZApYbrZZzrgYumJa8iDIruA@@',
      `'${localStorage.getItem('token')}'`).subscribe(modules => {
      if (modules.recordset) {
        // console.table(modules.recordset);
        this.App.ruotes = [...modules.recordset];
        this.App.appPages = [
          ...modules.recordset
            .filter(moduleFilterFunction) // m => m.menu === 1)
            .map(m => {
              return {
                id: m.id,
                title: m.title,
                url: `/${m.path_menu}`,
                icon: m.ionic_icon,
                color: m.color,
                mobile: m.mobile,
                open: false
              };
            }),
        ];

        if (this.App.appPages.length > 0 && modules.recordset[0].hasOwnProperty('id_parent')) {
          for (let i = 0; i < this.App.appPages.length; i++) {
            this.App.appPages[i].subMenu = [];
            this.App.appPages[i].subMenu = [
              ...modules.recordset
                .filter(m => m.menu === 1 && m.id_parent === this.App.appPages[i].id)
                .map(m => {
                  return {
                    id: m.id,
                    title: m.title,
                    url: `/${m.path_menu}`,
                    icon: m.ionic_icon,
                    color: m.color,
                    mobile: m.mobile,
                    open: false
                  };
                }),
            ];
          }
        }
      }
    });
  }

  //////////////////////// ERROR ENDLER /////////////////////////

  public errorHandler(error: HttpErrorResponse) {
    if (error?.error?.error?.text) {
      return throwError(JSON.parse(error?.error?.error?.text));
    }
    return throwError(error?.error?.error || error?.message || 'Errore Generico');
  }

  ///////////////////////////////////////////////////////////////

}
