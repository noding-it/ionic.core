import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        /*let localUser: Utente = {} as Utente;
        this._utenteService.getFreshUser().subscribe(data => localUser = {...data.recordset[0]});

        console.log('route richiesta', next.routeConfig.path);
        return localUser?.tipo !== UtenteTipoEnum.USER;*/

        return true;

    }
}
