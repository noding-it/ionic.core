import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {EnvironmentConfig} from '../interfaces/environment-config';

@Injectable({
  providedIn: 'root',
})
export class PeewitService {

  private _url: string = '';
  private _ext_id: string | number = 0;
  private _ext_table: string = '';

  constructor(
    @Inject('CORE_ENVIRONMENT') private _viewConfig: EnvironmentConfig,
    private _httpClient: HttpClient,
  ) {
  }

  set url(url: string) {
    this._url = url;
  }

  set ext_id(ext_id: string | number) {
    this._ext_id = ext_id;
  }

  set ext_table(ext_table: string) {
    this._ext_table = ext_table;
  }

  generate(link: string, note: string = ''): Observable<any> {
    if (link && link.length > 0) {
      return this._httpClient.post<any>(
        `${this._url || 'https://peew.it'}/links/v1/generate`,
        {
          link,
          note
        },
        {
          headers: new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Authorization', `Bearer ${this._viewConfig.environment.SHORTLINK_TOKEN}`)
            .set('X-AUTH-TOKEN', `Bearer ${this._ext_id}`)
            .set('Y-AUTH-TOKEN', `Bearer ${this._ext_table}`),
        },
      );
    } else {
      return of(null);
    }
  }

  edit(id: number, link: string, short_link: string, note: string): Observable<any> {
    if (link && link.length > 0) {
      return this._httpClient.put<any>(
        `${this._url || 'https://peew.it'}/links/v1/edit/${id}`, 
        {link, short_link, note},
        {
          headers: new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Authorization', `Bearer ${this._viewConfig.environment.SHORTLINK_TOKEN}`)
            .set('X-AUTH-TOKEN', `Bearer ${this._ext_id}`)
            .set('Y-AUTH-TOKEN', `Bearer ${this._ext_table}`),
        },
      );
    } else {
      return of(null);
    }
  }

  list(): Observable<any> {
    return this._httpClient.get<any>(
      `${this._url || 'https://peew.it'}/links/v1/list`,
      {
        headers: new HttpHeaders()
          .set('content-type', 'application/json')
          .set('Authorization', `Bearer ${this._viewConfig.environment.SHORTLINK_TOKEN}`)
          .set('X-AUTH-TOKEN', `Bearer ${this._ext_id}`)
          .set('Y-AUTH-TOKEN', `Bearer ${this._ext_table}`),
      },
    );
  }

  delete(id: number): Observable<any> {
    return this._httpClient.delete<any>(
      `${this._url || 'https://peew.it'}/links/v1/delete/${id}`,
      {
        headers: new HttpHeaders()
          .set('content-type', 'application/json')
          .set('Authorization', `Bearer ${this._viewConfig.environment.SHORTLINK_TOKEN}`)
          .set('X-AUTH-TOKEN', `Bearer ${this._ext_id}`)
          .set('Y-AUTH-TOKEN', `Bearer ${this._ext_table}`),
      },
    );
  }

  getStats(id: number, from_date: string = 'null', to_date: string = ''): Observable<any> {
    return this._httpClient.get<any>(
      `${this._url || 'https://peew.it'}/links/v1/stats/${id}?from_date=${from_date}&to_date=${to_date}`,
      {
        headers: new HttpHeaders()
          .set('content-type', 'application/json')
          .set('Authorization', `Bearer ${this._viewConfig.environment.SHORTLINK_TOKEN}`)
          .set('X-AUTH-TOKEN', `Bearer ${this._ext_id}`)
          .set('Y-AUTH-TOKEN', `Bearer ${this._ext_table}`),
      },
    );
  }

}
