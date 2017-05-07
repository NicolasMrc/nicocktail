/**
 * Created by Nico on 04/05/2017.
 */


import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Extra} from "../entities/Extra";

@Injectable()
export class ExtraService{


  url : string = 'http://193.70.115.127:8888/api.php/extra/';

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor (private http: Http) {}

  getExtras (): Promise<Extra[]> {
    return this.http.get('http://193.70.115.127:8888/api.php/extra?transform=1')
      .toPromise()
      .then(response => response.json().extra as Extra[])
      .catch(this.handleError);
  }

  getExtra (id : string): Promise<Extra> {
    return this.http.get(this.url + id)
      .toPromise()
      .then(res => res.json().data as Extra)
      .catch(this.handleError);
  }

  updateExtra (extra: Extra): Promise<Extra> {
    return this.http
      .put(this.url, JSON.stringify(extra), {headers: this.headers})
      .toPromise()
      .then(() => extra)
      .catch(this.handleError);
  }

  addExtra (extra: Extra): Promise<Extra> {
    console.log(JSON.stringify(extra));
    return this.http
      .post(this.url, JSON.stringify(extra), {headers: this.headers})
      .toPromise()
      .then(() => extra)
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
