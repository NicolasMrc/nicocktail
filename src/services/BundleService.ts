/**
 * Created by Nico on 04/05/2017.
 */


import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Bundle} from "../entities/Bundle";
import {AppSettings} from "../app/app-settings";
import {AuthService} from "./auth/auth.service";

@Injectable()
export class BundleService{


  private url = AppSettings.api_endpoint + 'bundle';

  constructor (private http: Http, private authService : AuthService) {}

  getBundles (): Promise<Bundle[]> {
    return this.http.get('bundles')
      .toPromise()
      .then(response => response.json().bundle as Bundle[])
      .catch(this.handleError);
  }

  getBundle (id : string): Promise<Bundle> {
    return this.http.get(this.url + id)
      .toPromise()
      .then(res => res.json().data as Bundle)
      .catch(this.handleError);
  }

  updateBundle (bundle: Bundle): Promise<Bundle> {
    return this.http
      .put(this.url, JSON.stringify(bundle), this.authService.currentUser.api_token)
      .toPromise()
      .then(() => bundle)
      .catch(this.handleError);
  }

  addBundle (bundle: Bundle): Promise<Bundle> {
    return this.http
      .post(this.url, JSON.stringify(bundle), this.authService.currentUser.api_token)
      .toPromise()
      .then(() => bundle)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    return this.http.delete(this.url, this.authService.currentUser.api_token)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
