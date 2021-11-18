import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {GlobalService} from './global.service';

@Injectable({
  providedIn: 'root'
})
export class WordpressService {

  constructor(
    private _http: HttpClient,
    private _gs: GlobalService,
  ) {
  }

  private _apiUrl: string;
  private _apiAuthUrl: string;
  private _woocommerceToken: string;

  public setEnvironment(apiUrl: string, apiAuthUrl: string, woocommerceToken: string) {
    this._apiUrl = apiUrl;
    this._apiAuthUrl = apiAuthUrl;
    this._woocommerceToken = woocommerceToken;
  }

  public login(): Observable<any> {
    return this._http.post(
      this._apiAuthUrl,
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
      `${this._apiUrl}/woocommerce/anenglishisland/orders/get-by-user`,
      {
        headers: new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded').set('Authorization', `AEI ${localStorage.getItem('token')}`).set('Woocommerce', `${this._woocommerceToken}`)
      }
    ).pipe(
      catchError(this._gs.errorHandler)
    );
  }

  public createUser(params: string): Observable<any> {
    return this._http.post(
      `${this._apiUrl}/woocommerce/user/create`,
      {params},
      {
        headers: new HttpHeaders().set('content-type', 'application/json').set('Authorization', `AEI ${localStorage.getItem('token')}`).set('Woocommerce', `${this._woocommerceToken}`),
      }
    ).pipe(
      catchError(this._gs.errorHandler)
    );
  }

  public modifyUser(id: number, params: boolean): Observable<any> {
    console.log(id);
    return this._http.put(
      `${this._apiUrl}/woocommerce/user/update/${id}`,
      {params},
      // action},
      {
        headers: new HttpHeaders().set('content-type', 'application/json').set('Authorization', `AEI ${localStorage.getItem('token')}`).set('Woocommerce', `${this._woocommerceToken}`),
      }
    ).pipe(
      catchError(this._gs.errorHandler)
    );
  }

  public createProduct(params: string): Observable<any> {
    return this._http.post(
      `${this._apiUrl}/woocommerce/product/create`,
      {
        params,
      },
      {
        headers: new HttpHeaders().set('content-type', 'application/json').set('Authorization', `AEI ${localStorage.getItem('token')}`).set('Woocommerce', `${this._woocommerceToken}`),
      }
    ).pipe(
      catchError(this._gs.errorHandler)
    );
  }

  public updateProduct(params: string, codiceWordpress: number): Observable<any> {
    return this._http.put(
      `${this._apiUrl}/woocommerce/product/update/${codiceWordpress}`,
      {
        params,
        codiceWordpress
      },
      {
        headers: new HttpHeaders().set('content-type', 'application/json').set('Authorization', `AEI ${localStorage.getItem('token')}`).set('Woocommerce', `${this._woocommerceToken}`),
      }
    ).pipe(
      catchError(this._gs.errorHandler)
    );
  }

  public getProdotti(): Observable<any> {
    return this._http.get(
      `${this._apiUrl}/woocommerce/products/get`,
      {
        headers: new HttpHeaders().set('content-type', 'application/json').set('Authorization', `AEI ${localStorage.getItem('token')}`).set('Woocommerce', `${this._woocommerceToken}`),
      }
    ).pipe(
      catchError(this._gs.errorHandler)
    );
  }

  public getProdotto(codiceWordpress: number): Observable<any> {
    return this._http.get(
      `${this._apiUrl}/woocommerce/product/get/${codiceWordpress}`,
      {
        headers: new HttpHeaders().set('content-type', 'application/json').set('Authorization', `AEI ${localStorage.getItem('token')}`).set('Woocommerce', `${this._woocommerceToken}`),
      }
    ).pipe(
      catchError(this._gs.errorHandler)
    );
  }

  public deleteProdotto(codiceWordpress: number): Observable<any> {
    return this._http.delete(
      `${this._apiUrl}/woocommerce/product/delete/${codiceWordpress}`,
      {
        headers: new HttpHeaders().set('content-type', 'application/json').set('Authorization', `AEI ${localStorage.getItem('token')}`).set('Woocommerce', `${this._woocommerceToken}`),
      }
    ).pipe(
      catchError(this._gs.errorHandler)
    );
  }

  public createOrder(params: string): Observable<any> {
    return this._http.post(
      `${this._apiUrl}/woocommerce/order/create`,
      {
        params,
      },
      {
        headers: new HttpHeaders().set('content-type', 'application/json').set('Authorization', `AEI ${localStorage.getItem('token')}`).set('Woocommerce', `${this._woocommerceToken}`),
      }
    ).pipe(
      catchError(this._gs.errorHandler)
    );
  }
}


