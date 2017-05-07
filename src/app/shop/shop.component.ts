import { Component, OnInit } from '@angular/core';
import {Drink} from "../../entities/Drink";
import {DrinkService} from "../../services/DrinkService";
import {AlcoholService} from "../../services/AlcoholService";
import {Alcohol} from "../../entities/Alcohol";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  alcohols : Alcohol[];
  newAlcohol : Alcohol = new Alcohol();

  constructor(private alcoholService : AlcoholService) { }

  ngOnInit() {
    this.newAlcohol.name = "";
    this.newAlcohol.degree = null;

    //this.getDrinks();
  }

  /*getDrinks(): void {
    this.alcoholService
      .getAlcohols()
      .subscribe(alcohols => this.alcohols = alcohols);
  }

  saveNewDrink(){
    if(this.newAlcohol.name != "" && this.newAlcohol.degree != null){
      this.alcoholService.addAlcohol(this.newAlcohol)
        .then(alcohol => {
          this.alcohols.push(alcohol);
          this.newAlcohol = new Alcohol();
        });
    }
  }*/
}
