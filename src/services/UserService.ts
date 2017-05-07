/**
 * Created by Nico on 04/05/2017.
 */


import {Injectable} from "@angular/core";
import {User} from "../entities/User";
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService{

  url : string = 'http://193.70.115.127:8888/api.php/user/';

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor (private http: Http) {}

  getUsers (): Promise<User[]> {
    return this.http.get('http://193.70.115.127:8888/api.php/user?transform=1')
      .toPromise()
      .then(response => response.json().user as User[])
      .catch(this.handleError);
  }

  getUser (id : string): Promise<User> {
    return this.http.get(this.url + id)
      .toPromise()
      .then(res => res.json().data as User)
      .catch(this.handleError);
  }

  login (user): Promise<User> {
    return this.http.get(this.url)
      .toPromise()
      .then(res => res.json().data as User)
      .catch(this.handleError);
  }

  updateUser (user: User): Promise<User> {
    return this.http
      .put(this.url, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(() => user)
      .catch(this.handleError);
  }

  addUser (user: User): Promise<User> {
    console.log(JSON.stringify(user));
    return this.http
      .post(this.url, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(() => user)
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
