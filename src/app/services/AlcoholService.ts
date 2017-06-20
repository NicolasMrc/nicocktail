/**
 * Created by Nico on 04/05/2017.
 */


import {Injectable} from "@angular/core";
import {Http, Headers, Response, RequestOptions, Jsonp} from "@angular/http";
import {Observable} from "rxjs/Observable";

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {AuthService} from "./auth/auth.service";
import {AppSettings} from "../app-settings";
import {Alcohol} from "../../entities/Alcohol";

@Injectable()
export class AlcoholService{

  private url = AppSettings.api_endpoint + 'alcohol';

  constructor (private http: Http, private authService : AuthService) {}

  findAll(): Observable<Alcohol[]> {
    return this.http
      .get(this.url)
      .map(response => {
        return response.json() as Alcohol[]
      })
      .catch(this.handleError);
  }

  findAllEnabled(): Observable<Alcohol[]> {
    return this.http
      .get(this.url)
      .map(response => {
        var alcoholsEnabled = [];
        for (let alcohol of response.json() as Alcohol[]){
          if(alcohol.enabled){
            alcoholsEnabled.push(alcohol);
          }
        }
        return alcoholsEnabled;
      })
      .catch(this.handleError);
  }

  findOne (id : string): Observable<Alcohol> {
    return this.http.get(this.url + '/' + id)
      .map(res => res.json() as Alcohol)
      .catch(this.handleError);
  }

  update (alcohol: Alcohol): Observable<Alcohol> {
    let headers = new Headers();
    headers.append('api_token', this.authService.currentUser.api_token);
    let options = new RequestOptions ({ headers: headers});

    return this.http
      .put(this.url, alcohol, options)
      .map(res => res.json() as Alcohol)
      .catch(this.handleError);
  }

  addAlcohol (alcohol: Alcohol): Observable<Alcohol> {

    let headers = new Headers();
    headers.append('api_token', this.authService.currentUser.api_token);
    let options = new RequestOptions ({ headers: headers});

    return this.http
      .post(this.url, alcohol, options)
      .map(res => res.json() as Alcohol)
      .catch(this.handleError);
  }

  deleteAlcohol(id: number): Observable<void> {
    let headers = new Headers();
    headers.append('api_token', this.authService.currentUser.api_token);
    let options = new RequestOptions ({ headers: headers});

    return this.http
      .delete(this.url + '/' + id, options)
      .map(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
