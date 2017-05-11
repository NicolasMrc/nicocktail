/**
 * Created by Nico on 04/05/2017.
 */


import {Injectable} from "@angular/core";
import {Http, Headers, Jsonp, RequestOptions} from "@angular/http";
import {Soft} from "../entities/Soft";
import {Observable} from "rxjs/Observable";
import {AuthService} from "./auth/auth.service";

@Injectable()
export class SoftService{


  url = '/api/soft';

  constructor (private http: Http, private authService : AuthService) {}

  findAll(): Observable<Soft[]> {
    return this.http
      .get(this.url)
      .map(response => {
        return response.json() as Soft[]
      })
      .catch(this.handleError);
  }

  findOne (id : string): Observable<Soft> {
    return this.http.get(this.url + '/' + id)
      .map(res => res.json() as Soft)
      .catch(this.handleError);
  }

  update (soft: Soft): Observable<Soft> {
    let headers = new Headers();
    headers.append('api_token', this.authService.currentUser.api_token);
    let options = new RequestOptions ({ headers: headers});

    return this.http
      .put(this.url, soft, options)
      .map(res => res.json() as Soft)
      .catch(this.handleError);
  }

  addSoft (soft: Soft): Observable<Soft> {
    let headers = new Headers();
    headers.append('api_token', this.authService.currentUser.api_token);
    let options = new RequestOptions ({ headers: headers});

    return this.http
      .post(this.url, soft, options)
      .map(res => res.json() as Soft)
      .catch(this.handleError);
  }

  deleteSoft(id: number): Observable<void> {
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
