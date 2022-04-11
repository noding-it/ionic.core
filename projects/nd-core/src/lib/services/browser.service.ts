import {Inject, Injectable, isDevMode} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Sweetalert2Service} from './sweetalert2.service';
import {ChromeExtensionService} from './chrome-extension.service';
import {TranslateService} from '@ngx-translate/core';
import {EnvironmentConfig} from '../interfaces/environment-config';
import {ShimReferenceTagger} from '@angular/compiler-cli/src/ngtsc/shims';
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
          const alertCheckVersion = this._sweetAlert.confirm(this._translateService.instant(`Nuova versione app`, {app: app.toUpperCase()}), this._translateService.instant('Nuova versione!'), this._translateService.instant('Aggiorna'), this._translateService.instant('Più tardi'));
          alertCheckVersion.then(async (result) => {
            if (result.isConfirmed) {
              const hasExtension = await this._chromeExtension.hasExtension(this._viewConfig.environment.CHROME_EXTENSION_ID);
              console.log('estensione', hasExtension);
              if (hasExtension) {
                await this._chromeExtension.clearCache(this._viewConfig.environment.CHROME_EXTENSION_ID);
                window.location.reload();
              } else {
                this._sweetAlert.confirm('Migliora la tua esperienza utilizzando la nostra estensione', 'Nuova estensione disponibile', 'Scarica ora', 'Più tardi').then(res => {
                  if (res.isConfirmed && !!link) {
                    this._toolService.linkNavigateTo(link, '_blank');
                  }
                });
              }
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
