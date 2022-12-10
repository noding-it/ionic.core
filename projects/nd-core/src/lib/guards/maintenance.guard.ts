import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {GlobalService} from "../services/global.service";
import {ToolService} from "../services/tool.service";
import {Sweetalert2Service} from "../services/sweetalert2.service";
import {EnvironmentConfig} from "../interfaces/environment-config";

@Injectable({
  providedIn: 'root',
})
export class MaintenanceGuard implements CanActivate {

  constructor(
    @Inject('CORE_ENVIRONMENT') private _viewConfig: EnvironmentConfig,
    private _globalService: GlobalService,
    private _toolService: ToolService,
    private _router: Router,
    private _sweetAlert: Sweetalert2Service,
  ) {
  }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

    return await new Promise((resolve, reject) => {
      this._globalService.callMicroservice(`/public/maintenance/${window.location.host}`).subscribe({
        next: data => {
          if (data.hasOwnProperty('error') || data.status === 400) {
            this._sweetAlert.error(data.error || data.message || 'Error')
            reject(false);
          }
          if (data.maintenance) {
            this._toolService.linkNavigateTo(`${this._viewConfig.environment.maintenanceUrl}/?url=${window.location.host}`, '_top');
            reject(false);
          } else {
            resolve(true);
          }
        },
        error: error => this._sweetAlert.error(error)
      });
    });
  }
}
