import {Inject, Injectable, isDevMode} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Sweetalert2Service} from './sweetalert2.service';
import {ChromeExtensionService} from './chrome-extension.service';
import {TranslateService} from '@ngx-translate/core';
import {EnvironmentConfig} from '../interfaces/environment-config';
import {ToolService} from './tool.service';

@Injectable({
  providedIn: 'root',
})
export class BrowserService {

  constructor(
    @Inject('CORE_ENVIRONMENT') private _viewConfig: EnvironmentConfig,
    private _http: HttpClient,
    private _sweetAlert: Sweetalert2Service,
    private _translateService: TranslateService,
    private _chromeExtension: ChromeExtensionService,
    private _toolService: ToolService,
  ) {
  }


  /**
   *
   * @param app
   * @param link Link dell'estensione allo store
   */
  public getAppVersion(app: string, link?: string) {
    if (!isDevMode()) {
      let currentVersion = null;
      if (localStorage.getItem('mvl')) {
        currentVersion = JSON.parse(localStorage.getItem('mvl')).version;
      }
      console.log('current version:', currentVersion);
      this._http.get('config.xml',
        {
          headers: new HttpHeaders()
            .set('Content-Type', 'text/xml')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method'),
          responseType: 'text',
        },
      ).subscribe(config => {
        const search = `id="io.ionic.${app}" `;
        const version = config.substring(config.indexOf(search) + search.length, config.length).replace('version="', '').split('"')[0];
        console.log(version);
        if (currentVersion !== version) {
          const alertCheckVersion = this._sweetAlert.info(this._translateService.instant(`Una nuova versione dell'app è disponibile!`, {app: app.replace('-', ' ').toUpperCase()}), this._translateService.instant('Nuova versione!'), this._translateService.instant('Aggiorna'));
          alertCheckVersion.then(async (_) => {
            const hasExtension = await this._chromeExtension.hasExtension(this._viewConfig.environment.CHROME_EXTENSION_ID);
            console.log('estensione', hasExtension);
            // @ts-ignore
            if (this._toolService.isDesktop() && !!window.chrome) {
              if (hasExtension) {
                await this._chromeExtension.clearCache(this._viewConfig.environment.CHROME_EXTENSION_ID);
              } else {
                if (!!link) {
                  this._sweetAlert.confirm(this._translateService.instant('Migliora la tua esperienza utilizzando la nostra estensione'), this._translateService.instant('Nuova estensione disponibile'), this._translateService.instant('Scarica ora'), this._translateService.instant('Più tardi')).then(res => {
                    if (res.isConfirmed) {
                      this._toolService.linkNavigateTo(link, '_blank');
                    }
                  });
                }
              }
            } else {
              this._sweetAlert.info(this._translateService.instant('Migliora la tua esperienza utilizzando Google Chrome'), this._translateService.instant('Loonar ti consiglia')).then();
            }
          });
        }
        localStorage.setItem('mvl', JSON.stringify({app, version}));
      }, error => {
        console.error(`error while checking ${app} version`, error);
      });
    } else {
      localStorage.setItem('mvl', JSON.stringify({app, version: 'dev'}));
    }
  }

}
