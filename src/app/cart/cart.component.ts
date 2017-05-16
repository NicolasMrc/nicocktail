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
  billingAddress : Address = new Address();
  shippingAddress : Address = new Address();

  constructor(private authService : AuthService, private userService : UserService, private snack : MdSnackBar, private dialogService : DialogService, private viewContainerRef : ViewContainerRef, private router : Router, private orderService : OrderService) { }

  ngOnInit() {
    if (this.authService.currentUser.email){
      this.user = this.authService.currentUser;
      this.billingAddress = this.authService.currentUser.address;
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

  checkOut(){
    this.isCheckingOut = true;
  }

  proceedPayment(){
    this.dialogService.payment(this.viewContainerRef).subscribe(() => {
      let order = new Order();
      order.billing_address = this.billingAddress;
      order.shipping_address = this.shippingAddress;
      order.bundles = this.user.cart;
      order.user_id = this.user.id;

      if(this.user.orders == null){
        this.user.orders = [];
      }
      this.user.orders.push(order);
      this.user.cart = [];
      this.userService.updateUser(this.user).subscribe(user => {
        this.snack.open('Order sent !', null, { duration : 2000 });
        this.bundles = user.cart;
        this.isCheckingOut = false;
        //this.router.navigate(['/orders']);
      })
    });
  }

}
