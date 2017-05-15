import { Component, OnInit } from '@angular/core';
import {Bundle} from "../../entities/Bundle";
import {User} from "../../entities/User";
import {MdSnackBar} from "@angular/material";
import {UserService} from "../services/UserService";
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  bundles : Bundle[] = [];
  user : User = new User();

  constructor(private authService : AuthService, private userService : UserService, private snack : MdSnackBar) { }

  ngOnInit() {
    if (this.authService.currentUser.email){
      console.log(this.authService.currentUser);
      this.bundles = this.authService.currentUser.wishlist;
    } else {
      //this.
    }
  }

  removeFromWishlist(bundle){
    let user = this.authService.currentUser;
    let index = user.wishlist.indexOf(bundle);
    user.wishlist.splice(index, 1);
    this.userService.updateUser(user).subscribe(user => {
      this.authService.currentUser = user;
      this.snack.open(bundle.name + ' removed from your wishlist !', null, {duration : 2000})
    });
  }

  addToCart(bundle : Bundle){
    let user = this.authService.currentUser;
    user.cart.push(bundle);
    this.userService.updateUser(user).subscribe(user => {
      this.authService.currentUser = user;
      this.snack.open(bundle.name + ' added to your cart !', null, {duration : 2000})
    });
  }

}
