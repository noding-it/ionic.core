import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute, CanActivate} from '@angular/router';
import {Observable} from 'rxjs';
import {GlobalService} from '@myvirtualab.angular/core';

@Injectable({
  providedIn: 'root',
})
export class SignUpReferralCheckGuard implements CanActivate {

  constructor(
    private _gs: GlobalService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> | boolean {

    const param = localStorage.getItem('signup-referral');
    if (param) {
      this._gs.callMicroservice(`/public/validator/validator_existing_referral/${param}/0`, null, false, 'GET').subscribe(data => {
        if (data.hasOwnProperty('error')) {
          console.error(data.error);
          return false;
        }
        if (data.invalid) {
          localStorage.removeItem('signup-referral');
          window.location.reload();
        }
      });
    }
    return true;
  }
}
