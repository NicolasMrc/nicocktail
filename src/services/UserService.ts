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

  findAll (): Observable<User[]> {
    return this.http.get(this.url)
      .map(response => response.json().user as User[])
      .catch(this.handleError);
  }

  findOne (id : string): Observable<User> {
    return this.http.get(this.url + '/' + id)
      .map(res => res.json().data as User)
      .catch(this.handleError);
  }

  login(email : string, password : string): Observable<User>{
    let user = new User();
    user.email = email;
    user.password = password;

    return this.http.post('/api/login', user)
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
    return this.http
      .put(this.url, user)
      .map(() => user)
      .catch(this.handleError);
  }

  addUser (user: User): Observable<User> {
    user.password = this.hasher.hash(user.password);

    return this.http
      .post(this.url, user)
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
    return this.http.delete(this.url + '/' + id)
      .map(() => null)
      .catch(this.handleError);
  }

  private handleError (error: Response) {
    return Observable.throw(error.json());
  }
}
