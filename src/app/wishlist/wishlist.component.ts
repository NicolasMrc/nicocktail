import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Bundle} from "../../entities/Bundle";
import {User} from "../../entities/User";
import {MdSnackBar} from "@angular/material";
import {UserService} from "../services/UserService";
import {AuthService} from "../services/auth/auth.service";
import {DialogService} from "../services/DialogService";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  bundles : Bundle[] = [];
  user : User = new User();

  constructor(private authService : AuthService, private userService : UserService, private snack : MdSnackBar, private dialogService : DialogService, private viewContainerRef : ViewContainerRef) { }

  ngOnInit() {
    if (this.authService.currentUser.email){
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

  dialogToCart(bundle : Bundle){
    if(this.authService.isLoggedIn){
      this.dialogService.addToCart(this.viewContainerRef, bundle).subscribe(res => {
        let user = this.authService.currentUser;
        for(var i = 0; i < res; i++){
          user.cart.push(bundle);
        }
        this.userService.updateUser(user).subscribe(user => {
          this.authService.currentUser = user;
          this.snack.open(bundle.name + ' added to your cart !', null, {duration : 2000})
        });
      })
    } else {
      this.dialogService.signinRequest(this.viewContainerRef).subscribe();
    }

  }

}
