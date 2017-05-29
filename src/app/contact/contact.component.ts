import { Component, OnInit } from '@angular/core';
import {MdSnackBar} from "@angular/material";
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  email : string = "";
  message : string = "";

  constructor(private snack : MdSnackBar, private authService : AuthService) {
    if (this.authService.isLoggedIn){
      this.email = this.authService.currentUser.email;
    }
  }

  ngOnInit() {
  }

  sendMessage(){
    this.snack.open('Your message has been send !', null, {duration : 2000});
    this.email = "";
    this.message = "";
  }

}
