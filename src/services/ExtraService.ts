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


  url = '/extra';

  private headers = new Headers(
    {
      'Content-Type' : 'multipart/form-data',
      'cache-control' : 'no-cache',
    });

  constructor (private http: Http) {}

  getExtras(): Observable<Extra[]> {
    return this.http
      .get('/extras')
      .map(response => {
        return response.json() as Extra[]
      })
      .catch(this.handleError);
  }

  getExtra (id : string): Observable<Extra> {
    return this.http.get(this.url + '/' + id)
      .map(res => res.json())
      .catch(this.handleError);
  }

  update (extra: Extra): Observable<Extra> {

    let data = new FormData();
    data.append("name", extra.name);
    data.append("price", extra.price);

    return this.http
      .post(this.url + '/' + extra.id, data)
      .map(res => res.json() as Extra)
      .catch(this.handleError);
  }

  addExtra (extra: Extra): Observable<Extra> {

    let data = new FormData();
    data.append("name", extra.name);
    data.append("price", extra.price);

    return this.http
      .post(this.url, data)
      .map(res => res.json() as Extra)
      .catch(this.handleError);

  }

  deleteExtra(id: number): Observable<void> {
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
