import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Bundle} from "../../entities/Bundle";
import {BundleService} from "../services/BundleService";
import {AuthService} from "../services/auth/auth.service";
import {UserService} from "../services/UserService";
import {MdSnackBar} from "@angular/material";
import {DialogService} from "app/services/DialogService";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  public bundles : Bundle[];

  constructor(private bundleService : BundleService, private authService : AuthService, private userService : UserService, private snack : MdSnackBar,
  private dialogService : DialogService, private viewContainerRef : ViewContainerRef) { }

  ngOnInit() {
    this.bundleService.findAll().subscribe(bundles => {
      this.bundles = bundles;
      if(this.authService.isLoggedIn){
        for(let bundle of this.bundles){
          var isWished = false;
          for(let wish of this.authService.currentUser.wishlist){
            if (bundle.name == wish.name){
              isWished = true;
              break;
            }
          }
          if(isWished){
            bundle.isWished = true;
          }
        }
      }
    })
  }

  addToCart(bundle : Bundle){
    if(this.authService.isLoggedIn){
      let user = this.authService.currentUser;
      user.cart.push(bundle);
      this.userService.updateUser(user).subscribe(user => {
        this.authService.currentUser = user;
        this.snack.open(bundle.name + ' added to your cart !', null, {duration : 2000})
      });
    } else {
      this.dialogService.signinRequest(this.viewContainerRef).subscribe();
    }
  }

  addToWishlist(bundle : Bundle){
    if(this.authService.isLoggedIn){
      let user = this.authService.currentUser;

      var exist = false;

      for(let wish of user.wishlist){
        if (bundle.name == wish.name){
          exist = true;
        }
      }

      if(exist){
        let index = user.wishlist.indexOf(bundle);
        user.wishlist.splice(index, 1);
        this.userService.updateUser(user).subscribe(user => {
          bundle.isWished = false;
          this.authService.currentUser = user;
          this.snack.open(bundle.name + ' removed from your wishlist !', null, {duration : 2000})
        });
      } else {
        user.wishlist.push(bundle);
        this.userService.updateUser(user).subscribe(user => {
          this.authService.currentUser = user;
          bundle.isWished = true;
          this.snack.open(bundle.name + ' added to your wishlist !', null, {duration : 2000})
        });
      }


    } else {
      this.dialogService.signinRequest(this.viewContainerRef).subscribe();
    }
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
