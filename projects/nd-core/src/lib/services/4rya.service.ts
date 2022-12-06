import {Inject, Injectable} from '@angular/core';
import {GlobalService} from './global.service';
import {Observable} from 'rxjs';
import {EnvironmentConfig} from '../interfaces/environment-config';
import {ToolService} from './tool.service';
import {Sweetalert2Service} from './sweetalert2.service';

export enum AryaActions {
  LOGIN = 'login',
  TRANSACTION = 'transaction'
}

@Injectable({
  providedIn: 'root',
})
export class AryaService {

  constructor(
    @Inject('CORE_ENVIRONMENT') private _viewConfig: EnvironmentConfig,
    private _gs: GlobalService,
    private _toolService: ToolService,
    private _sweetAlert: Sweetalert2Service,
  ) {
  }

  /**
   *
   * @param aryaID
   * @param gatewayUrl = usato al posto di environment.apiGateway
   */
  public update4ryaID(aryaID: string): Observable<any> {
    /*return this._gs.callGateway('Worx1sPzYhyh/h+S02GPikq6p3ev7Aq6zvfd4FRt38stWy0tSVYtWy2PKRmY1Mk/nnZIT0MAKvy29PNTPQ7XjJVefIrKOIkiXw@@', `'${localStorage.getItem('token')}','${aryaID}'`, false);*/
    return this._gs.callMicroservice(`/trinci/arya/user/${aryaID}`, localStorage.getItem('token'), false, 'PUT');
  }

  public open4ryaModal(aryaKey: string, lang: string, application: string, action: string, token: string): void {
    const {protocol, host, pathname} = window.location;
    this._toolService.linkNavigateTo(`${this._viewConfig.environment.aryaUrl}?${btoa(JSON.stringify({
      token,
      apikey: aryaKey,
      label: 'Crea la tua identità digitale',
      fields: 'email,name,surname,phone',
      language: lang,
      application: application,
      env: this._viewConfig.environment.production && !this._toolService.isTestMode() ? 'prod' : 'staging',
      mode: this._viewConfig.environment.production && !this._toolService.isTestMode() ? 'prod' : 'staging',
      redirect_url: `${protocol}//${host}${pathname}`,
      action,
    }))}`, '_top');
  }

  public login(accountID: string): Observable<any> {
    return this._gs.login4rya(accountID);
  }

}
