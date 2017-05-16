import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  nbItemsInCart : number = 0;

  constructor(public authService : AuthService) { }

  ngOnInit() {
    if(this.authService.isLoggedIn){
      this.nbItemsInCart = this.authService.currentUser.cart.length;
    }
  }

}
