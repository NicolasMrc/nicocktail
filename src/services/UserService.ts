/**
 * Created by Nico on 04/05/2017.
 */


import {Injectable} from "@angular/core";
import {User} from "../entities/User";
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserService{

  url : string = '/user';

  constructor (private http: Http) {}

  getUsers (): Observable<User[]> {
    return this.http.get("/users")
      .map(response => response.json().user as User[])
      .catch(this.handleError);
  }

  getUser (id : string): Observable<User> {
    return this.http.get(this.url + id)
      .map(res => res.json().data as User)
      .catch(this.handleError);
  }

  login(email : string, password : string): Observable<User>{
    let data = new FormData();

    data.append("password", password);
    data.append("email", email);

    return this.http.post('/login', data)
      .map(res => res.json() as User)
      .catch(this.handleError);
  }

  updateUser (user: User): Observable<User> {
    let user_form = new FormData();

    for ( let key in user) {
      user_form.append(key, user[key]);
    }

    return this.http
      .put(this.url, user_form)
      .map(() => user)
      .catch(this.handleError);
  }

  addUser (user: User): Observable<User> {
    let user_form = new FormData();

    user_form.append("firstname", user.firstname);
    user_form.append("lastname", user.lastname);
    user_form.append("birtdate", user.birthdate);
    user_form.append("civility", user.civility);
    user_form.append("password", user.password);
    user_form.append("email", user.email);
    user_form.append("role", user.role);
    user_form.append("is_subscriber", user.isSubscriber);

    return this.http
      .post(this.url, user_form)
      .map(res => res.json() as User)
      .catch(this.handleError);
  }

  delete(id: number): Observable<void> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url)
      .map(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
