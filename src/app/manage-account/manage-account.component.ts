import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {UserService} from "../services/UserService";
import {MdSnackBar} from "@angular/material";
import {Address} from "../../entities/Address";
import {User} from "../../entities/User";

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {


  user : User;

  constructor(public authService : AuthService, private userService : UserService, private snack : MdSnackBar) {}

  ngOnInit() {
    this.user = new User();
    if (this.authService.currentUser.email) {
      this.user = this.authService.currentUser;
      if (this.user.address == null) {
        this.user.address = new Address();
      }
    } else {
      var email = sessionStorage.getItem('email');
      var password = sessionStorage.getItem('pswd');

      if(password != null && email != null){
        this.authService.login(email, password, true).subscribe(data => {
          this.user = this.authService.currentUser;
          if (this.user.address == null) {
            this.user.address = new Address();
          }
        });
      }
    }
  }

  onSubmit(){
    let isValid = this.validate();

    if(isValid){
      this.userService.updateUser(this.user).subscribe(user=>{
        if(user != null){
          this.authService.currentUser = user;
          this.snack.open("Modification saved !", null, {duration : 2000});
        }
      })
    }
  }

  private validate() {
    if(this.user.firstname.trim() == ''){
      this.snack.open("Firstname is required", null, {duration : 2000});
      return false;
    }
    if(this.user.lastname.trim() == ''){
      this.snack.open("Lastname is required", null, {duration : 2000});
      return false;
    }
    if(this.user.email.trim() == ''){
      this.snack.open("Email is required", null, {duration : 2000});
      return false;
    }
    if(!(this.user.email.indexOf('@') >= 0)){
      this.snack.open("Email must contain symbol '@'", null, {duration : 2000});
      return false;
    }
    if((this.user.email.indexOf('@') >= 0) && (!(this.user.email.split('@')[1].indexOf('.') >= 0))){
      this.snack.open("Email must contain an extension", null, {duration : 2000});
      return false;
    }
    return true;
  }

}
