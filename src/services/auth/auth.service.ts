/**
 * Created by Nico on 24/10/2016.
 */
import { Injectable } from '@angular/core';

import {UserService} from "../UserService";
import {User} from "../../entities/User";
import {Observable} from 'rxjs/Rx';
import {Hasher} from "./hasher.service";
import {MdSnackBar} from "@angular/material";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;
  currentUser : User = new User();

  constructor(public userService : UserService, private hasher : Hasher, private snack : MdSnackBar, private router : Router){}

  login(email, password, rememberMe): Observable<boolean> {
    let userExist : boolean = false;
    let hashedPassword = this.hasher.hash(password);
    this.userService.login(email, hashedPassword).subscribe(data => {
      if(data != null){
        if(rememberMe){
          sessionStorage.setItem('pswd', password);
          sessionStorage.setItem('email', email);
        } else {
          sessionStorage.removeItem('pswd');
          sessionStorage.removeItem('email');
        }
        this.currentUser = data;
        userExist = true;
      }
    });
    return Observable.of(userExist).delay(1000).do(val => this.isLoggedIn = userExist);
  }

  logout(){
    this.currentUser = new User;
    this.isLoggedIn = false;
    sessionStorage.removeItem('pswd');
    sessionStorage.removeItem('email');
    this.router.navigate(['/home']);
  }

  checkLogin(){
    var email = sessionStorage.getItem('email');
    var password = sessionStorage.getItem('pswd');

    if(password != null && email != null){
      this.login(email, password, true).subscribe(data => {
        if(data != null) {
          this.snack.open('Welcome ' + this.currentUser.firstname, null, {duration: 2000})
        }
      });
    }
  }

  isAdmin(){
    return this.currentUser.role == 'admin';
  }

}
