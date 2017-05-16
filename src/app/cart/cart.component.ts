import {User} from "../../entities/User";
import {Bundle} from "../../entities/Bundle";
import {MdSnackBar} from "@angular/material";
import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/UserService";
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  bundles : Bundle[] = [];
  user : User = new User();
  total :  number = 0;
  taxes : number = 0;

  constructor(private authService : AuthService, private userService : UserService, private snack : MdSnackBar) { }

  ngOnInit() {
    if (this.authService.currentUser.email){
      this.bundles = this.authService.currentUser.cart;
      for(let bundle of this.bundles){
        this.total += bundle.price;
      }
      this.taxes = 0.15 * this.total;
      this.total += this.taxes + 3;
    } else {
      //this.
    }
  }

  removeFromCart(bundle){
    let user = this.authService.currentUser;
    let index = user.cart.indexOf(bundle);
    user.cart.splice(index, 1);
    this.userService.updateUser(user).subscribe(user => {
      this.authService.currentUser = user;
      this.snack.open(bundle.name + ' removed from your cart !', null, {duration : 2000})
    });
  }

}
