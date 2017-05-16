import { Component, OnInit } from '@angular/core';
import {Order} from "../../entities/Order";
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders : Order[] = [];

  constructor(private authService : AuthService) { }

  ngOnInit() {
    if (this.authService.currentUser.email){
      this.orders = this.authService.currentUser.orders;
    }
  }

}
