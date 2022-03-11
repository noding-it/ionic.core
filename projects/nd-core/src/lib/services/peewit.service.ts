import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {EnvironmentConfig} from "../interfaces/environment-config";

@Injectable({
  providedIn: 'root'
})
export class PeewitService {

  constructor(
    @Inject('CORE_ENVIRONMENT') private _viewConfig: EnvironmentConfig,
    private _httpClient: HttpClient,
  ) {
  }

  generate(link: string): Observable<any> {
    if (link && link.length > 0) {
      return this._httpClient.post<any>(
        `https://peew.it/v1/generate`,
        {
          link
        },
        {
          headers: new HttpHeaders().set('content-type', 'application/json').set('Authorization', `Bearer ${this._viewConfig.environment.SHORTLINK_TOKEN}`)
        }
      );
    } else {
      return of(null);
    }
  }

  edit(id: number, link: string, short_link: string): Observable<any> {
    if (link && link.length > 0) {
      return this._httpClient.put<any>(
        `https://peew.it/v1/edit/${id}`,
        {link, short_link},
        {
          headers: new HttpHeaders().set('content-type', 'application/json').set('Authorization', `Bearer ${this._viewConfig.environment.SHORTLINK_TOKEN}`)
        }
      );
    } else {
      return of(null);
    }
  }

  list(): Observable<any> {
    return this._httpClient.get<any>(
      `https://peew.it/v1/list`,
      {
        headers: new HttpHeaders().set('content-type', 'application/json').set('Authorization', `Bearer ${this._viewConfig.environment.SHORTLINK_TOKEN}`)
      }
    );
  }

  delete(id: number): Observable<any> {
    return this._httpClient.delete<any>(
      `https://peew.it/v1/delete/${id}`,
      {
        headers: new HttpHeaders().set('content-type', 'application/json').set('Authorization', `Bearer ${this._viewConfig.environment.SHORTLINK_TOKEN}`)
      }
    );
  }

  getStats(id: number, from_date: string = 'null', to_date: string = ''): Observable<any> {
    return this._httpClient.get<any>(
      `https://peew.it/v1/stats/${id}?from_date=${from_date}&to_date=${to_date}`,
      {
        headers: new HttpHeaders().set('content-type', 'application/json').set('Authorization', `Bearer ${this._viewConfig.environment.SHORTLINK_TOKEN}`)
      }
    );
  }

}
