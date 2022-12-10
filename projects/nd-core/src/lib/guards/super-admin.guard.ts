import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {GlobalService} from "../services/global.service";
import {UtenteTipoEnum} from "../enum/utente-tipo.enum";

@Injectable({
  providedIn: 'root',
})
export class SuperAdminGuard implements CanActivate {

  constructor(
    private _gs: GlobalService,
    private _router: Router,
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (this._gs.App.user.tipo > UtenteTipoEnum.ADMIN) {
      this._router.navigate(['/dashboard']);
      return false;
    } else {
      return true;
    }
  }
}
