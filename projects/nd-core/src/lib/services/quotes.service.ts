import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const API_URL = 'https://quotes.rest/';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  constructor(
    private _http: HttpClient,
  ) {
  }

  getQuoteOfDay(): Observable<any> {
    return this._http.get<any>(
      `${API_URL}qod?language=en`,
      {
        headers: new HttpHeaders().set('content-type', 'application/json')
      }
    );
  }

}
