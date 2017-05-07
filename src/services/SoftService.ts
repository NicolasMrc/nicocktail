/**
 * Created by Nico on 04/05/2017.
 */


import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Soft} from "../entities/Soft";

@Injectable()
export class SoftService{


  url : string = 'http://193.70.115.127:8888/api.php/soft/';

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor (private http: Http) {}

  getSofts (): Promise<Soft[]> {
    return this.http.get('http://193.70.115.127:8888/api.php/soft?transform=1')
      .toPromise()
      .then(response => response.json().soft as Soft[])
      .catch(this.handleError);
  }

  getSoft (id : string): Promise<Soft> {
    return this.http.get(this.url + id)
      .toPromise()
      .then(res => res.json().data as Soft)
      .catch(this.handleError);
  }

  updateSoft (soft: Soft): Promise<Soft> {
    return this.http
      .put(this.url, JSON.stringify(soft), {headers: this.headers})
      .toPromise()
      .then(() => soft)
      .catch(this.handleError);
  }

  addSoft (soft: Soft): Promise<Soft> {
    console.log(JSON.stringify(soft));
    return this.http
      .post(this.url, JSON.stringify(soft), {headers: this.headers})
      .toPromise()
      .then(() => soft)
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
