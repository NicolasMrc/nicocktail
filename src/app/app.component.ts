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

  displayHome(){
    this.showHome = true;
    this.showShop = false;
    this.showCart = false;
    this.showBuilder = false;
  }

  displayShop(){
    this.showHome = false;
    this.showShop = true;
    this.showCart = false;
    this.showBuilder = false;
  }

  displayBuilder(){
    this.showHome = false;
    this.showShop = false;
    this.showCart = false;
    this.showBuilder = true;
  }

  displayCart(){
    this.showHome = false;
    this.showShop = false;
    this.showCart = true;
    this.showBuilder = false;
  }
}
