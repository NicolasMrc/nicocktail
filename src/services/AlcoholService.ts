/**
 * Created by Nico on 04/05/2017.
 */


import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {Alcohol} from "../entities/Alcohol";
import {Observable} from "rxjs/Observable";

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AlcoholService{

  url = 'http://localhost:8888/framework/public/alcohol';

  private headers = new Headers(
    {
    'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
    //'Content-Type': 'application/json', "Access-Control-Allow-Origin":" *",
    //"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization, If-Modified-Since, Cache-Control, Pragma"
    });

  constructor (private http: Http) {}

  getAlcohols(): Observable<Alcohol[]> {

      return this.http
        .get(`http://localhost:8888/framework/public/alcohols`)
        .map(response => {
          return response.json() as Alcohol[]
        })
        .catch(this.handleError);
  }

  getAlcohol (id : string): Observable<Alcohol> {
    return this.http.get(this.url + '/' + id)
      .map(res => res.json())
      .catch(this.handleError);
  }

  updateAlcohol (alcohol: Alcohol): Promise<Alcohol> {
    return this.http
      .put(this.url, JSON.stringify(alcohol), {headers: this.headers})
      .toPromise()
      .then(() => alcohol)
      .catch(this.handleError);
  }

  addAlcohol (alcohol: Alcohol): Promise<Alcohol> {
    return this.http
      .post(this.url, JSON.stringify(alcohol), {headers: this.headers})
      .toPromise()
      .then(() => alcohol)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.url}${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
