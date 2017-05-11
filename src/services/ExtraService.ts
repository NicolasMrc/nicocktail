/**
 * Created by Nico on 04/05/2017.
 */


import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Extra} from "../entities/Extra";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ExtraService{
  url = '/api/extra';

  constructor (private http: Http) {}

  findAll(): Observable<Extra[]> {
    return this.http
      .get(this.url)
      .map(response => {
        return response.json() as Extra[]
      })
      .catch(this.handleError);
  }

  findOne (id : string): Observable<Extra> {
    return this.http.get(this.url + '/' + id)
      .map(res => res.json() as Extra)
      .catch(this.handleError);
  }

  update (extra: Extra): Observable<Extra> {
    return this.http
      .put(this.url, extra)
      .map(res => res.json() as Extra)
      .catch(this.handleError);
  }

  addExtra (extra: Extra): Observable<Extra> {
    return this.http
      .post(this.url, extra)
      .map(res => res.json() as Extra)
      .catch(this.handleError);
  }

  deleteExtra(id: number): Observable<void> {
    return this.http
      .delete(this.url + '/' + id)
      .map(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
