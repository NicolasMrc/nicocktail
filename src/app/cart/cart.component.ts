import {User} from "../../entities/User";
import {Bundle} from "../../entities/Bundle";
import {MdSnackBar} from "@angular/material";
import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {UserService} from "../services/UserService";
import {AuthService} from "../services/auth/auth.service";
import {Address} from "../../entities/Address";
import {DialogService} from "../services/DialogService";
import {Router} from "@angular/router";
import {Order} from "../../entities/Order";
import {OrderService} from "../services/OrderService";

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
  isCheckingOut : boolean = false;
  order = new Order();

  constructor(private authService : AuthService, private userService : UserService, private snack : MdSnackBar, private dialogService : DialogService, private viewContainerRef : ViewContainerRef, private router : Router, private orderService : OrderService) { }

  ngOnInit() {
    if (this.authService.currentUser.email){
      this.user = this.authService.currentUser;
      this.bundles = this.authService.currentUser.cart;
      this.computeTotal();
    } else {
      //this.
    }

    this.order.billing_firstname = this.authService.currentUser.firstname;
    this.order.billing_lastname = this.authService.currentUser.lastname;

    if(this.authService.currentUser.address != null){
      this.order.billing_road = this.authService.currentUser.address.road;
      this.order.billing_country = this.authService.currentUser.address.country;
      this.order.billing_city = this.authService.currentUser.address.city;
      this.order.billing_zipcode = this.authService.currentUser.address.zipcode;
      this.order.billing_province = this.authService.currentUser.address.province;
    }
  }

  removeFromCart(bundle){
    let user = this.authService.currentUser;
    let index = user.cart.indexOf(bundle);
    user.cart.splice(index, 1);
    this.userService.updateUser(user).subscribe(user => {
      this.authService.currentUser = user;
      this.snack.open(bundle.name + ' removed from your cart !', null, {duration : 2000})
      this.computeTotal();
    });
  }

  computeTotal(){
    this.total = 0;
    for(let bundle of this.bundles){
      this.total += bundle.price;
    }
    this.taxes = 0.15 * this.total;
    this.total += this.taxes + 3;
  }

  checkOut(){
    this.isCheckingOut = true;
  }

  proceedPayment(){
    this.dialogService.payment(this.viewContainerRef).subscribe(() => {

      if(this.user.orders == null){
        this.user.orders = [];
      }

      this.user.cart = [];
      this.order.user_id = this.authService.currentUser.id;
      this.order.bundles = this.bundles;

      this.orderService.create(this.order).subscribe(order => {
        this.bundles = [];
        this.user.orders.push(order);
        this.snack.open('Order sent !', null, { duration : 2000 });
        this.isCheckingOut = false;
        this.authService.currentUser.cart = [];
        this.userService.updateUser(this.authService.currentUser).subscribe();
      })
    });
  }

}
