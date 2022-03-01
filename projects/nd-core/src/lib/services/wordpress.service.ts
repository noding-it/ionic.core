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
      `${this._viewConfig.environment.apiGateway}/woocommerce/anenglishisland/orders/get-by-user`,
      {
        headers: new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded').set('Authorization', `AEI ${localStorage.getItem('token')}`).set('Woocommerce', `${this._viewConfig.environment.WOOCOMMERCE_TOKEN}`)
      }
    ).pipe(
      catchError(this._gs.errorHandler)
    );
  }

  public createUser(params: object): Observable<any> {
    return this._http.post(
      `${this._viewConfig.environment.apiGateway}/woocommerce/user/create`,
      {params},
      {
        headers: new HttpHeaders().set('content-type', 'application/json').set('Authorization', `AEI ${localStorage.getItem('token')}`).set('Woocommerce', `${this._viewConfig.environment.WOOCOMMERCE_TOKEN}`),
      }
    ).pipe(
      catchError(this._gs.errorHandler)
    );
  }

  public modifyUser(id: number, params: boolean): Observable<any> {
    console.log(id);
    return this._http.put(
      `${this._viewConfig.environment.apiGateway}/woocommerce/user/update/${id}`,
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
      `${this._viewConfig.environment.apiGateway}/woocommerce/user/delete/${codiceUtente}`,
      {
        headers: new HttpHeaders().set('content-type', 'application/json').set('Authorization', `AEI ${localStorage.getItem('token')}`).set('Woocommerce', `${this._viewConfig.environment.WOOCOMMERCE_TOKEN}`),
      }
    ).pipe(
      catchError(this._gs.errorHandler)
    );
  }

  public createProduct(params: object): Observable<any> {
    return this._http.post(
      `${this._viewConfig.environment.apiGateway}/woocommerce/product/create`,
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
      `${this._viewConfig.environment.apiGateway}/woocommerce/product/update/${codiceWordpress}`,
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
      `${this._viewConfig.environment.apiGateway}/woocommerce/products/get`,
      {
        headers: new HttpHeaders().set('content-type', 'application/json').set('Authorization', `AEI ${localStorage.getItem('token')}`).set('Woocommerce', `${this._viewConfig.environment.WOOCOMMERCE_TOKEN}`),
      }
    ).pipe(
      catchError(this._gs.errorHandler)
    );
  }

  public getProdotto(codiceWordpress: number): Observable<any> {
    return this._http.get(
      `${this._viewConfig.environment.apiGateway}/woocommerce/product/get/${codiceWordpress}`,
      {
        headers: new HttpHeaders().set('content-type', 'application/json').set('Authorization', `AEI ${localStorage.getItem('token')}`).set('Woocommerce', `${this._viewConfig.environment.WOOCOMMERCE_TOKEN}`),
      }
    ).pipe(
      catchError(this._gs.errorHandler)
    );
  }

  public deleteProdotto(codiceWordpress: number): Observable<any> {
    return this._http.delete(
      `${this._viewConfig.environment.apiGateway}/woocommerce/product/delete/${codiceWordpress}`,
      {
        headers: new HttpHeaders().set('content-type', 'application/json').set('Authorization', `AEI ${localStorage.getItem('token')}`).set('Woocommerce', `${this._viewConfig.environment.WOOCOMMERCE_TOKEN}`),
      }
    ).pipe(
      catchError(this._gs.errorHandler)
    );
  }

  public createOrder(params: object): Observable<any> {
    return this._http.post(
      `${this._viewConfig.environment.apiGateway}/woocommerce/order/create`,
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
      `${this._viewConfig.environment.apiGateway}/woocommerce/orders/delete/${codiceOrdine}`,
      {
        headers: new HttpHeaders().set('content-type', 'application/json').set('Authorization', `AEI ${localStorage.getItem('token')}`).set('Woocommerce', `${this._viewConfig.environment.WOOCOMMERCE_TOKEN}`),
      }
    ).pipe(
      catchError(this._gs.errorHandler)
    );
  }
}


