/**
 * Created by Nico on 04/05/2017.
 */


import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Extra} from "../entities/Extra";
import {Observable} from "rxjs/Observable";
import {AppSettings} from "../app/app-settings";
import {AuthService} from "./auth/auth.service";

@Injectable()
export class ExtraService{

  private url = AppSettings.api_endpoint + 'extra';

  constructor (private http: Http, private authService : AuthService) {}

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
      .put(this.url, extra, this.authService.currentUser.api_token)
      .map(res => res.json() as Extra)
      .catch(this.handleError);
  }

  addExtra (extra: Extra): Observable<Extra> {
    return this.http
      .post(this.url, extra, this.authService.currentUser.api_token)
      .map(res => res.json() as Extra)
      .catch(this.handleError);
  }

  deleteExtra(id: number): Observable<void> {
    return this.http
      .delete(this.url + '/' + id, this.authService.currentUser.api_token)
      .map(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
