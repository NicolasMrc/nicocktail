/**
 * Created by Nico on 04/05/2017.
 */


import {Injectable} from "@angular/core";
import {User} from "../entities/User";
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs/Observable";
import {Hasher} from "./auth/hasher.service";
import {MdSnackBar} from "@angular/material";

@Injectable()
export class UserService{

  url : string = '/api/user';

  constructor (private http: Http, private hasher : Hasher, private snack : MdSnackBar) {}

  getUsers (): Observable<User[]> {
    return this.http.get("/api/users")
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

    return this.http.post('/api/login', data)
      .map(
        res => {
          if(res.status == 204 || res.status < 200 || res.status >= 300) {
            this.snack.open("Login failed !", null,{duration : 2000});
          } else {
            return res.json() as User
          }
      })
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
    user.password = this.hasher.hash(user.password);

    let user_form = new FormData();

    user_form.append("firstname", user.firstname);
    user_form.append("lastname", user.lastname);
    user_form.append("password", user.password);
    user_form.append("email", user.email);
    user_form.append("role", user.role);
    user_form.append("is_subscriber", 0);

    return this.http
      .post(this.url, user_form)
      .map(res => {
        if(res.status == 204) {
          this.snack.open('Email already registered', null, {duration : 2000})
        } else{
          return res.json() as User
        }
      })
      .catch(this.handleError);
  }

  delete(id: number): Observable<void> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url)
      .map(() => null)
      .catch(this.handleError);
  }

  private handleError (error: Response) {
    return Observable.throw(error.json());
  }
}
