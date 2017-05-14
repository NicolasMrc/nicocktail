import { Component, OnInit } from '@angular/core';
import {User} from "../../entities/User";
import {AuthService} from "../services/auth/auth.service";
import {UserService} from "../services/UserService";
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {

  constructor(public authService : AuthService, private userService : UserService, private snack : MdSnackBar) {}

  ngOnInit() {
  }

  onSubmit(){
    let isValid = this.validate();

    if(isValid){
      this.userService.updateUser(this.authService.currentUser).subscribe(user=>{
        if(user != null){
          this.snack.open("Modification saved !", null, {duration : 2000});
        }
      })
    }
  }

  private validate() {
    if(this.authService.currentUser.firstname.trim() == ''){
      this.snack.open("Firstname is required", null, {duration : 2000});
      return false;
    }
    if(this.authService.currentUser.lastname.trim() == ''){
      this.snack.open("Lastname is required", null, {duration : 2000});
      return false;
    }
    if(this.authService.currentUser.email.trim() == ''){
      this.snack.open("Email is required", null, {duration : 2000});
      return false;
    }
    if(!(this.authService.currentUser.email.indexOf('@') >= 0)){
      this.snack.open("Email must contain symbol '@'", null, {duration : 2000});
      return false;
    }
    if((this.authService.currentUser.email.indexOf('@') >= 0) && (!(this.authService.currentUser.email.split('@')[1].indexOf('.') >= 0))){
      this.snack.open("Email must contain an extension", null, {duration : 2000});
      return false;
    }
    return true;
  }

}
