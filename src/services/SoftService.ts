/**
 * Created by Nico on 04/05/2017.
 */


import {Injectable} from "@angular/core";
import {Http, Headers, Jsonp} from "@angular/http";
import {Soft} from "../entities/Soft";
import {Observable} from "rxjs/Observable";

@Injectable()
export class SoftService{


  url = '/soft';

  private headers = new Headers(
    {
      'Content-Type' : 'multipart/form-data',
      'cache-control' : 'no-cache',
    });

  constructor (private http: Http) {}

  getSofts(): Observable<Soft[]> {
    return this.http
      .get('/softs')
      .map(response => {
        return response.json() as Soft[]
      })
      .catch(this.handleError);
  }

  getSoft (id : string): Observable<Soft> {
    return this.http.get(this.url + '/' + id)
      .map(res => res.json())
      .catch(this.handleError);
  }

  update (soft: Soft): Observable<Soft> {

    let data = new FormData();
    data.append("name", soft.name);
    data.append("type", soft.type);

    return this.http
      .post(this.url + '/' + soft.id, data)
      .map(res => res.json() as Soft)
      .catch(this.handleError);
  }

  addSoft (soft: Soft): Observable<Soft> {

    let data = new FormData();
    data.append("name", soft.name);
    data.append("type", soft.type);

    return this.http
      .post(this.url, data)
      .map(res => res.json() as Soft)
      .catch(this.handleError);

  }

  deleteSoft(id: number): Observable<void> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .map(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
