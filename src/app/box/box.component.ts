import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {UserService} from "../services/UserService";
import {User} from "../../entities/User";
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {

  constructor(private authService : AuthService, private userService : UserService, private snack : MdSnackBar) { }

  currentUser : User;

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
  }

  onSubscribe(box : number){
    this.authService.currentUser.is_subscriber = box;

    this.userService.updateUser(this.authService.currentUser).subscribe(user => {
      this.authService.currentUser = user;
      this.currentUser = user;
      this.snack.open("Subscription saved !", null, {duration : 2000});
    })
  }

  onUnsubscribe(){
    this.authService.currentUser.is_subscriber = null;

    this.userService.updateUser(this.authService.currentUser).subscribe(user => {
      this.authService.currentUser = user;
      this.currentUser = user;
      this.snack.open("Your subscription to the drinkBox has been ended !", null, {duration : 2000});
    })
  }

}
