import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {GlobalService} from '../services/global.service';

@Injectable({
  providedIn: 'root'
})
export class SignUpReferralCheckGuard implements CanActivate {

  constructor(
    private _gs: GlobalService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const param = localStorage.getItem('signup-referral');
    if (!param) {
      this._router.navigate(['/login']).then();
      return true;
    } else {
      this._gs.callMicroservice(`/public/validator/validator_existing_referral/${param}`, null, false, 'GET').subscribe(data => {
        if (data.invalid) {
          this._router.navigate(['/login']).then();
        }
        return true;
      });
    }
  }
}
