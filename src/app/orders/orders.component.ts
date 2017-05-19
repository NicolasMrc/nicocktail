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

      for(let order of this.orders){
        let bundles = order.bundles;

        var newArr = [];

        for(let bundle of bundles) {
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
        order.bundles = newArr;
      }
    }
  }
}
