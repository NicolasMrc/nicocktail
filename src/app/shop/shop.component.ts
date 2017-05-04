import { Component, OnInit } from '@angular/core';
import {Drink} from "../../entities/Drink";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  drinks = [
    new Drink(0, "Mojito", "Some descirption"),
    new Drink(0, "Blue Lagoon", "Some descirption"),
    new Drink(0, "Caipirihna", "Some descirption"),
    new Drink(0, "Cosmopolitan", "Some descirption"),
  ];

  constructor() { }

  ngOnInit() {
  }

}
