import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {UserService} from "../services/UserService";
import {User} from "../../entities/User";
import {MdSnackBar} from "@angular/material";
import {DialogService} from "../services/DialogService";

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {

  constructor(public authService : AuthService, private userService : UserService, private snack : MdSnackBar, private dialogService : DialogService, private viewContainerRef : ViewContainerRef) { }

  currentUser : User;
  boxSelected = 0;

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
  }

  onSubscribe(box : number){
    this.authService.currentUser.is_subscriber = box;

    this.userService.updateUser(this.authService.currentUser).subscribe(user => {
      this.authService.currentUser = user;
      this.currentUser = user;
    })
  }

  onUnsubscribe(){
    this.authService.currentUser.is_subscriber = null;

    this.userService.updateUser(this.authService.currentUser).subscribe(user => {
      this.authService.currentUser = user;
      this.currentUser = user;
      this.snack.open("Your subscription to the drinkBox has been ended !", null, {duration : 2000});
    })
  }

  signIn(){
    this.dialogService.signinRequest(this.viewContainerRef, 'subscribe').subscribe();
  }

  openCheckout(boxNumber :number) {
    this.boxSelected = boxNumber;
    var price = 0;
    if(boxNumber == 10){
      price = 2500;
    } else if(boxNumber == 30){
      price = 6000;
    } else if (boxNumber == 50){
      price = 8000;
    }


    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_oi0sKPJYLGjdvOXOM8tE8cMa',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
      }
    });

    handler.open({
      name: 'Nicocktail',
      description: boxNumber + ' Cup bundle subscription',
      amount: price,
      email : this.authService.currentUser.email,
      allowRememberMe: false,
      currency : "cad",
      image: 'assets/images/stripe_image.png',
    });

    this.onSubscribe(boxNumber);
  }

}
