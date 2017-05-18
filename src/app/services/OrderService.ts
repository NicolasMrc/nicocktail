/**
 * Created by Nico on 04/05/2017.
 */


import {Injectable} from "@angular/core";
import {Http, Headers, Jsonp, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {AuthService} from "./auth/auth.service";
import {Order} from "../../entities/Order";
import {AppSettings} from "../app-settings";

@Injectable()
export class OrderService{


  private url = AppSettings.api_endpoint + 'order';

  constructor (private http: Http, private authService : AuthService) {}

  findAll(): Observable<Order[]> {
    return this.http
      .get(this.url)
      .map(response => {
        return response.json() as Order[]
      })
      .catch(this.handleError);
  }

  findOne (id : string): Observable<Order> {
    return this.http.get(this.url + '/' + id)
      .map(res => res.json() as Order)
      .catch(this.handleError);
  }

  update (order: Order): Observable<Order> {
    return this.http
      .put(this.url, order)
      .map(res => res.json() as Order)
      .catch(this.handleError);
  }

  create (order: Order): Observable<Order> {
    console.log(order);
    return this.http
      .post(this.url, order)
      .map(res => res.json() as Order)
      .catch(this.handleError);
  }

  deleteOrder(id: number): Observable<void> {
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
