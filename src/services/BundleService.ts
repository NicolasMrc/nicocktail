/**
 * Created by Nico on 04/05/2017.
 */


import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Bundle} from "../entities/Bundle";

@Injectable()
export class BundleService{


  url : string = 'http://193.70.115.127:8888/api.php/bundle/';

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor (private http: Http) {}

  getBundles (): Promise<Bundle[]> {
    return this.http.get('http://193.70.115.127:8888/api.php/bundle?transform=1')
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
      .put(this.url, JSON.stringify(bundle), {headers: this.headers})
      .toPromise()
      .then(() => bundle)
      .catch(this.handleError);
  }

  addBundle (bundle: Bundle): Promise<Bundle> {
    console.log(JSON.stringify(bundle));
    return this.http
      .post(this.url, JSON.stringify(bundle), {headers: this.headers})
      .toPromise()
      .then(() => bundle)
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
