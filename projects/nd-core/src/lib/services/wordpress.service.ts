import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {GlobalService} from './global.service';
import {EnvironmentConfig} from "../interfaces/environment-config";

@Injectable({
  providedIn: 'root'
})
export class WordpressService {

  constructor(
    @Inject('CORE_ENVIRONMENT') private _viewConfig: EnvironmentConfig,
    private _http: HttpClient,
    private _gs: GlobalService,
  ) {
  }

  private _customEndpoint = '';

  public setCustomEndpoint(endpoint: string): void {
    this._customEndpoint = endpoint + (endpoint !== '' ? '/' : '');
  }

  public login(): Observable<any> {
    return this._http.post(
      this._viewConfig.environment.apiWpAuth,
      {},
      {
        headers: new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded')
      }
    ).pipe(
      catchError(this._gs.errorHandler)
    );
  }

  // funzione vecchia
  /*public getUserOrders(): Observable<any> {
      return this._http.post(
          `${environment.apiUrl}Wordpress/FD_WP_Orders.php`,
          { },
          {
              headers: new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded')
          }
      ).pipe(
          catchError(this._gs.errorHandler)
      );
  }*/

  public getUserOrders(): Observable<any> {
    return this._http.get(
      `${this._viewConfig.environment.apiGateway}/woocommerce/${this._customEndpoint}orders/get-by-user`,
      {
        headers: new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded').set('Authorization', `AEI ${localStorage.getItem('token')}`).set('Woocommerce', `${this._viewConfig.environment.WOOCOMMERCE_TOKEN}`)
      }
    ).pipe(
      catchError(this._gs.errorHandler)
    );
  }

  public createUser(params: object): Observable<any> {
    return this._http.post(
      `${this._viewConfig.environment.apiGateway}/woocommerce/${this._customEndpoint}user/create`,
      {params},
      {
        headers: new HttpHeaders().set('content-type', 'application/json').set('Authorization', `AEI ${localStorage.getItem('token')}`).set('Woocommerce', `${this._viewConfig.environment.WOOCOMMERCE_TOKEN}`),
      }
    ).pipe(
      catchError(this._gs.errorHandler)
    );
  }

  public modifyUser(id: number, params: boolean): Observable<any> {
    return this._http.put(
      `${this._viewConfig.environment.apiGateway}/woocommerce/${this._customEndpoint}user/update/${id}`,
      {params},
      // action},
      {
        headers: new HttpHeaders().set('content-type', 'application/json').set('Authorization', `AEI ${localStorage.getItem('token')}`).set('Woocommerce', `${this._viewConfig.environment.WOOCOMMERCE_TOKEN}`),
      }
    ).pipe(
      catchError(this._gs.errorHandler)
    );
  }

  public deleteUser(codiceUtente: number): Observable<any> {
    return this._http.delete(
      `${this._viewConfig.environment.apiGateway}/woocommerce/${this._customEndpoint}user/delete/${codiceUtente}`,
      {
        headers: new HttpHeaders().set('content-type', 'application/json').set('Authorization', `AEI ${localStorage.getItem('token')}`).set('Woocommerce', `${this._viewConfig.environment.WOOCOMMERCE_TOKEN}`),
      }
    ).pipe(
      catchError(this._gs.errorHandler)
    );
  }

  public createProduct(params: object): Observable<any> {
    return this._http.post(
      `${this._viewConfig.environment.apiGateway}/woocommerce/${this._customEndpoint}product/create`,
      {
        params,
      },
      {
        headers: new HttpHeaders().set('content-type', 'application/json').set('Authorization', `AEI ${localStorage.getItem('token')}`).set('Woocommerce', `${this._viewConfig.environment.WOOCOMMERCE_TOKEN}`),
      }
    ).pipe(
      catchError(this._gs.errorHandler)
    );
  }

  public updateProduct(params: object, codiceWordpress: number): Observable<any> {
    return this._http.put(
      `${this._viewConfig.environment.apiGateway}/woocommerce/${this._customEndpoint}product/update/${codiceWordpress}`,
      {
        params,
        codiceWordpress
      },
      {
        headers: new HttpHeaders().set('content-type', 'application/json').set('Authorization', `AEI ${localStorage.getItem('token')}`).set('Woocommerce', `${this._viewConfig.environment.WOOCOMMERCE_TOKEN}`),
      }
    ).pipe(
      catchError(this._gs.errorHandler)
    );
  }

  public getProdotti(): Observable<any> {
    return this._http.get(
      `${this._viewConfig.environment.apiGateway}/woocommerce/${this._customEndpoint}products/get`,
      {
        headers: new HttpHeaders().set('content-type', 'application/json').set('Authorization', `AEI ${localStorage.getItem('token')}`).set('Woocommerce', `${this._viewConfig.environment.WOOCOMMERCE_TOKEN}`),
      }
    ).pipe(
      catchError(this._gs.errorHandler)
    );
  }

  public getProdotto(codiceWordpress: number): Observable<any> {
    return this._http.get(
      `${this._viewConfig.environment.apiGateway}/woocommerce/${this._customEndpoint}product/get/${codiceWordpress}`,
      {
        headers: new HttpHeaders().set('content-type', 'application/json').set('Authorization', `AEI ${localStorage.getItem('token')}`).set('Woocommerce', `${this._viewConfig.environment.WOOCOMMERCE_TOKEN}`),
      }
    ).pipe(
      catchError(this._gs.errorHandler)
    );
  }

  public deleteProdotto(codiceWordpress: number): Observable<any> {
    return this._http.delete(
      `${this._viewConfig.environment.apiGateway}/woocommerce/${this._customEndpoint}product/delete/${codiceWordpress}`,
      {
        headers: new HttpHeaders().set('content-type', 'application/json').set('Authorization', `AEI ${localStorage.getItem('token')}`).set('Woocommerce', `${this._viewConfig.environment.WOOCOMMERCE_TOKEN}`),
      }
    ).pipe(
      catchError(this._gs.errorHandler)
    );
  }

  public createOrder(params: object): Observable<any> {
    return this._http.post(
      `${this._viewConfig.environment.apiGateway}/woocommerce/${this._customEndpoint}order/create`,
      {
        params,
      },
      {
        headers: new HttpHeaders().set('content-type', 'application/json').set('Authorization', `AEI ${localStorage.getItem('token')}`).set('Woocommerce', `${this._viewConfig.environment.WOOCOMMERCE_TOKEN}`),
      }
    ).pipe(
      catchError(this._gs.errorHandler)
    );
  }

  public deleteOrdine(codiceOrdine: number): Observable<any> {
    return this._http.delete(
      `${this._viewConfig.environment.apiGateway}/woocommerce/${this._customEndpoint}orders/delete/${codiceOrdine}`,
      {
        headers: new HttpHeaders().set('content-type', 'application/json').set('Authorization', `AEI ${localStorage.getItem('token')}`).set('Woocommerce', `${this._viewConfig.environment.WOOCOMMERCE_TOKEN}`),
      }
    ).pipe(
      catchError(this._gs.errorHandler)
    );
  }
}


