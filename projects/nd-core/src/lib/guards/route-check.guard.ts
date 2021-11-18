import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {GlobalService} from '../services/global.service';

@Injectable({
    providedIn: 'root'
})
export class RouteCheckGuard implements CanActivate {

    constructor(
        private _gs: GlobalService,
        private _router: Router
    ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        // console.log('route richiesta', next.routeConfig.path);
        return this._gs?.App?.ruotes?.filter(r => r.path === next.routeConfig.path)?.length > 0;

    }
}
