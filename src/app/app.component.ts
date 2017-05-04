import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Drinks comming soon !';

  showHome = true;
  showShop = false;
  showBuilder = false;
  showCart = false;
  showBox = false;
  showWishlist = false;

  displayHome(){
    this.showHome = true;
    this.showShop = false;
    this.showCart = false;
    this.showBuilder = false;
    this.showBox = false;
    this.showWishlist = false;
  }

  displayShop(){
    this.showHome = false;
    this.showShop = true;
    this.showCart = false;
    this.showBuilder = false;
    this.showBox = false;
    this.showWishlist = false;
  }

  displayBuilder(){
    this.showHome = false;
    this.showShop = false;
    this.showCart = false;
    this.showBuilder = true;
    this.showBox = false;
    this.showWishlist = false;
  }

  displayCart(){
    this.showHome = false;
    this.showShop = false;
    this.showCart = true;
    this.showBuilder = false;
    this.showBox = false;
    this.showWishlist = false;
  }

  displayBox(){
    this.showHome = false;
    this.showShop = false;
    this.showCart = false;
    this.showBuilder = false;
    this.showBox = true;
    this.showWishlist = false;
  }

  displayWishlist(){
    this.showHome = false;
    this.showShop = false;
    this.showCart = false;
    this.showBuilder = false;
    this.showBox = false;
    this.showWishlist = true;
  }
}
