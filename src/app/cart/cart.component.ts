import { Component, OnInit } from '@angular/core';
import {Bundle} from "../../entities/Bundle";
import {AuthService} from "../services/auth/auth.service";
import {User} from "../../entities/User";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  bundles : Bundle[] = [];
  user : User = new User();

  constructor(private authService : AuthService) { }

  ngOnInitAfterView() {
    if (this.authService.currentUser.email){
      this.bundles = this.authService.currentUser.cart;
    } else {
      //this.
    }
  }

}
