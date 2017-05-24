import { Component, OnInit } from '@angular/core';
import {MdSnackBar} from "@angular/material";
import {AuthService} from "../services/auth/auth.service";
import {Hasher} from "../services/auth/hasher.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  email : string = "";
  password : string = "";
  rememberMe : boolean = false;
  isLoggingIn = false;

  constructor(private snack : MdSnackBar, private authService : AuthService, private hasher : Hasher, private router : Router) { }

  ngOnInit() {
  }

  signIn(){
    if(this.email == "" || this.password == ""){
      this.snack.open('You must fill up password and email in order to log in !', 'Login Failed');
    } else {
      this.isLoggingIn = true;
      this.authService.login(this.email, this.password, this.rememberMe).subscribe(res => {
        if (this.authService.isLoggedIn) {
          let redirect = '';
          if(this.authService.currentUser.role == 'admin'){
            redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin';
          } else {
            redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/home';
          }
          this.snack.open('Welcome ' + this.authService.currentUser.firstname, null , {duration: 2000});
          this.router.navigate([redirect]);
        } else {
          this.isLoggingIn = false;
          this.password = "";
        }
      }
      );
    }
  }

}
