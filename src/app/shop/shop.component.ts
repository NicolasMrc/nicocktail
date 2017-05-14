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
    })
  }

  addToCart(bundle : Bundle){
    if(this.authService.isLoggedIn){
      let user = this.authService.currentUser;
      this.userService.updateUser(user).subscribe(user => {
        user.cart.push(bundle);
        this.authService.currentUser = user;
        this.snack.open(bundle.name + ' added to your cart !', null, {duration : 2000})
      });
    } else {
      this.dialogService.signinRequest(this.viewContainerRef).subscribe();
    }
  }

  addToWishlist(bundle : Bundle){

  }
}
