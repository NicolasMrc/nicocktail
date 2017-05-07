import { Component, OnInit } from '@angular/core';
import {User} from "../../entities/User";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user : User = User;

  constructor() { }

  ngOnInit() {
  }

  signIn(){
    if(this.user.email != "" && this.user.password != ""){

    }
  }

}
