import {Injectable} from "@angular/core";
import { Headers, Http } from '@angular/http';
import {Drink} from "../entities/Drink";

import 'rxjs/add/operator/toPromise';
/**
 * Created by Nico on 04/05/2017.
 */

@Injectable()
export class DrinkService{

  url : string = 'http://193.70.115.127:8888/api.php/drink/';

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor (private http: Http) {}

  getDrinks (): Promise<Drink[]> {
    return this.http.get('http://193.70.115.127:8888/api.php/drink?transform=1')
      .toPromise()
      .then(response => response.json().drink as Drink[])
      .catch(this.handleError);
  }

  getDrink (id : string): Promise<Drink> {
    return this.http.get(this.url + id)
      .toPromise()
      .then(res => res.json().data as Drink)
      .catch(this.handleError);
  }

  updateDrink (drink: Drink): Promise<Drink> {
    return this.http
      .put(this.url, JSON.stringify(drink), {headers: this.headers})
      .toPromise()
      .then(() => drink)
      .catch(this.handleError);
  }

  addDrink (drink: Drink): Promise<Drink> {
    console.log(JSON.stringify(drink));
    return this.http
      .post(this.url, JSON.stringify(drink), {headers: this.headers})
      .toPromise()
      .then(() => drink)
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
