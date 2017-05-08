/**
 * Created by Nico on 04/05/2017.
 */


import {Injectable} from "@angular/core";
import {Http, Headers, Response, RequestOptions, Jsonp} from "@angular/http";
import {Alcohol} from "../entities/Alcohol";
import {Observable} from "rxjs/Observable";

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AlcoholService{

  url = '/alcohol';

  private headers = new Headers(
    {
    'Content-Type' : 'multipart/form-data',
    'cache-control' : 'no-cache',
    });

  constructor (private http: Http, jsonp :Jsonp) {}

  getAlcohols(): Observable<Alcohol[]> {
      return this.http
        .get(`/alcohols`)
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

  addAlcohol (alcohol: Alcohol): Observable<Alcohol> {

    var data = new FormData();
    data.append("name", alcohol.name);
    data.append("degree", alcohol.degree.toString());

    return this.http
      .post(this.url, data)
      .map(res => res.json() as Alcohol)
      .catch(this.handleError);

  }



  delete(id: number): Promise<void> {
    const url = `${this.url}/${id}`;
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
