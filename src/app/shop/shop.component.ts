import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {AlcoholService} from "../../services/AlcoholService";
import {Alcohol} from "../../entities/Alcohol";
import {MdDialog, MdSnackBar} from "@angular/material";
import {DialogEditBundleComponent} from "../dialog/dialog-edit-bundle/dialog-edit-bundle.component";
import {DialogService} from "../../services/DialogService";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  alcohols : Alcohol[];
  newAlcohol : Alcohol = new Alcohol();

  constructor(private alcoholService : AlcoholService, public dialog: MdDialog, public dialogService : DialogService,
              private viewContainerRef: ViewContainerRef, public snackBar: MdSnackBar) { }

  ngOnInit() {
    this.newAlcohol.name = "";
    this.newAlcohol.degree = null;

    this.getDrinks();
  }

  getDrinks(): void {
    this.alcoholService
      .getAlcohols()
      .subscribe(alcohols => this.alcohols = alcohols);
  }
}
