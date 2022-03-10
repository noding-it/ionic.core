import {Injectable} from '@angular/core';
import {GlobalService} from './global.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AryaService {

  constructor(
    private _gs: GlobalService,
  ) {
  }

  public update4ryaID(aryaID: string): Observable<any> {
    return this._gs.callGateway('Worx1sPzYhyh/h+S02GPikq6p3ev7Aq6zvfd4FRt38stWy0tSVYtWy2PKRmY1Mk/nnZIT0MAKvy29PNTPQ7XjJVefIrKOIkiXw@@', `'${localStorage.getItem('token')}','${aryaID}'`, false);
  }

}
