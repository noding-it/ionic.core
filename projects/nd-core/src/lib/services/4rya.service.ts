import {Inject, Injectable} from '@angular/core';
import {GlobalService} from './global.service';
import {Observable} from 'rxjs';
import {EnvironmentConfig} from "../interfaces/environment-config";
import {ToolService} from "./tool.service";

@Injectable({
  providedIn: 'root',
})
export class AryaService {

  constructor(
    @Inject('CORE_ENVIRONMENT') private _viewConfig: EnvironmentConfig,
    private _gs: GlobalService,
    private _toolService: ToolService,
  ) {
  }

  public update4ryaID(aryaID: string): Observable<any> {
    return this._gs.callGateway('Worx1sPzYhyh/h+S02GPikq6p3ev7Aq6zvfd4FRt38stWy0tSVYtWy2PKRmY1Mk/nnZIT0MAKvy29PNTPQ7XjJVefIrKOIkiXw@@', `'${localStorage.getItem('token')}','${aryaID}'`, false);
  }

  public open4ryaModal(aryaKey: string, lang: string, application: string): void {
    const {protocol, host, pathname} = window.location;
    this._toolService.linkNavigateTo(`${this._viewConfig.environment.aryaUrl}?${btoa(JSON.stringify({
      token: localStorage.getItem('token'),
      apikey: aryaKey,
      label: 'Crea la tua identità digitale',
      fields: 'email,name,surname,phone',
      language: lang,
      application: application,
      env: this._viewConfig.environment.production && !this._toolService.isTestMode() ? 'prod' : 'staging',
      mode: this._viewConfig.environment.production && !this._toolService.isTestMode() ? 'prod' : 'staging',
      redirect_url: `${protocol}//${host}${pathname}`,
      action: 'login'
    }))}`, '_top');
  }

}
