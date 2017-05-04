import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';


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
  showSignInForm = false;
  showRegistrationForm = false;

  @ViewChild('dynamic-favicon') el:ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit(){
    let favicons = [
      "favicon-1.gif",
      "favicon-2.gif",
      "favicon-3.gif",
      "favicon-4.gif",
    ];

    let randomFav = Math.floor(Math.random() * favicons.length);

    let path = "assets/favicon/"+favicons[randomFav];

    //create new link favicon
    let link = document.createElement("link");
    link.id = 'dynamic-favicon';
    link.rel = 'shortcut icon';
    link.setAttribute("href", path);

    //remove old one
    document.getElementsByTagName('head')[0].removeChild(document.getElementById("dynamic-favicon"));

    //append new link
    document.getElementsByTagName('head')[0].appendChild(link);

  }

  displayHome(){
    this.showHome = true;

    this.showBox = false;
    this.showShop = false;
    this.showCart = false;
    this.showBuilder = false;
    this.showWishlist = false;
    this.showSignInForm = false;
    this.showRegistrationForm = false;
  }

  displayShop(){
    this.showShop = true;

    this.showBox = false;
    this.showHome = false;
    this.showCart = false;
    this.showBuilder = false;
    this.showWishlist = false;
    this.showSignInForm = false;
    this.showRegistrationForm = false;
  }

  displayBuilder(){
    this.showBuilder = true;

    this.showBox = false;
    this.showHome = false;
    this.showShop = false;
    this.showCart = false;
    this.showWishlist = false;
    this.showSignInForm = false;
    this.showRegistrationForm = false;
  }

  displayCart(){
    this.showCart = true;

    this.showBox = false;
    this.showHome = false;
    this.showShop = false;
    this.showBuilder = false;
    this.showWishlist = false;
    this.showSignInForm = false;
    this.showRegistrationForm = false;
  }

  displayBox(){
    this.showBox = true;

    this.showHome = false;
    this.showShop = false;
    this.showCart = false;
    this.showBuilder = false;
    this.showWishlist = false;
    this.showSignInForm = false;
    this.showRegistrationForm = false;
  }

  displayWishlist(){
    this.showWishlist = true;

    this.showBox = false;
    this.showHome = false;
    this.showShop = false;
    this.showCart = false;
    this.showBuilder = false;
    this.showSignInForm = false;
    this.showRegistrationForm = false;
  }

  displaySignInForm(){
    this.showSignInForm = true;

    this.showBox = false;
    this.showHome = false;
    this.showShop = false;
    this.showCart = false;
    this.showBuilder = false;
    this.showWishlist = false;
    this.showRegistrationForm = false;
  }

  displayRegistrationForm(){
    this.showRegistrationForm = true;

    this.showBox = false;
    this.showHome = false;
    this.showShop = false;
    this.showCart = false;
    this.showBuilder = false;
    this.showWishlist = false;
    this.showSignInForm = false;
  }
}
