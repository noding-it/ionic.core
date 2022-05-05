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

    const param = this._route.snapshot.paramMap.get('ref');
    console.log(param);
    return this._gs.callMicroservice(`/public/validator/validator_existing_referral/${param}`, null, false, 'GET');
  }
}
