/**
 * Created by Nico on 04/05/2017.
 */


import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {AuthService} from "./auth/auth.service";
import {Observable} from "rxjs/Observable";
import {AppSettings} from "../app-settings";
import {Bundle} from "../../entities/Bundle";

@Injectable()
export class BundleService{

  private url = AppSettings.api_endpoint + 'bundle';

  constructor (private http: Http, private authService : AuthService) {}

  findAll(): Observable<Bundle[]> {
    return this.http
      .get(this.url)
      .map(response => {
        return response.json() as Bundle[]
      })
      .catch(this.handleError);
  }

  findOne (id : string): Observable<Bundle> {
    return this.http.get(this.url + '/' + id)
      .map(res => res.json() as Bundle)
      .catch(this.handleError);
  }

  update (bundle: Bundle): Observable<Bundle> {
    let headers = new Headers();
    headers.append('api_token', this.authService.currentUser.api_token);
    let options = new RequestOptions ({ headers: headers});

    return this.http
      .put(this.url, bundle, options)
      .map(res => res.json() as Bundle)
      .catch(this.handleError);
  }

  addBundle (bundle: Bundle): Observable<Bundle> {
    let headers = new Headers();
    headers.append('api_token', this.authService.currentUser.api_token);
    let options = new RequestOptions ({ headers: headers});

    return this.http
      .post(this.url, bundle, options)
      .map(res => res.json() as Bundle)
      .catch(this.handleError);
  }

  deleteBundle(id: number): Observable<void> {
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
