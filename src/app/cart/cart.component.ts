import {User} from "../../entities/User";
import {Bundle} from "../../entities/Bundle";
import {MdSnackBar} from "@angular/material";
import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {UserService} from "../services/UserService";
import {AuthService} from "../services/auth/auth.service";
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
  bundlesForOrder : Bundle[] = [];
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
      this.bundlesForOrder = this.authService.currentUser.cart;

      var newArr = [];

      for(let bundle of this.bundles) {
        var exists = false;
        for(let newItem of newArr) {
          if(bundle.id == newItem.id) {
            exists = true;
            newItem.quantity++;
          }
        }
        if(!exists && bundle.id != null) {
          bundle.quantity = 1;
          newArr.push(bundle);
        }
      }
      this.bundles = newArr;

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

    this.user.cart = this.user.cart.filter(item => item.name !== bundle.name);

    this.userService.updateUser(user).subscribe(user => {
      this.authService.currentUser = user;
      this.snack.open(bundle.name + ' removed from your cart !', null, {duration : 2000})
      let index = this.bundles.indexOf(bundle);
      this.bundles.splice(index, 1);
      this.computeTotal();
    });
  }

  computeTotal(){
    this.total = 0;
    for(let bundle of this.bundles){
      this.total += bundle.price*bundle.quantity;
    }
    this.taxes = 0.15 * this.total;
    this.total += this.taxes + 3;
  }

  checkOut(){
    if(this.authService.currentUser.is_verified){
      this.isCheckingOut = true;
    } else {
      this.snack.open('You need to verify your account in order to proceed payment !', null , {duration : 2000})
    }
  }

  proceedPayment(){
    this.dialogService.payment(this.viewContainerRef).subscribe(res => {

      console.log(res);

      if(res){
        if(this.user.orders == null){
          this.user.orders = [];
        }

        this.user.cart = [];
        this.order.user_id = this.authService.currentUser.id;

        this.order.bundles = [];

        this.order.bundles = this.bundlesForOrder;

        this.orderService.create(this.order).subscribe(order => {
          this.bundles = [];
          this.user.orders.push(order);
          this.snack.open('Order sent !', null, { duration : 2000 });
          this.isCheckingOut = false;
          this.authService.currentUser.cart = [];
          this.userService.updateUser(this.authService.currentUser).subscribe();
        })
      }
    });
  }

  copyInfo(){
    this.order.shipping_lastname = this.order.billing_lastname;
    this.order.shipping_firstname = this.order.billing_firstname;
    this.order.shipping_city = this.order.billing_city;
    this.order.shipping_country = this.order.billing_country;
    this.order.shipping_zipcode = this.order.billing_zipcode;
    this.order.shipping_road = this.order.billing_road;
    this.order.shipping_province = this.order.billing_province;
  }

}
