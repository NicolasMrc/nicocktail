import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from "@angular/material";
import {Bundle} from "../../../entities/Bundle";

@Component({
  selector: 'app-dialog-add-to-cart',
  templateUrl: './dialog-add-to-cart.component.html',
  styleUrls: ['./dialog-add-to-cart.component.css']
})
export class DialogAddToCartComponent implements OnInit {

  bundle : Bundle;

  sliderMax = 100;
  sliderMin = 10;
  sliderStep = 10;
  sliderThumbLabel = true;
  sliderTick = false;

  cupQuantity = 473;
  alcoholQuantity = 0;
  softQuantity = 0;

  sliderValue = 10;
  bundlePrice;
  dialogTitle;

  constructor(public dialogRef: MdDialogRef<DialogAddToCartComponent>) { }

  ngOnInit() {
    this.alcoholQuantity = Math.round(this.cupQuantity * 10 / this.bundle.alcohols.length);
    this.softQuantity= Math.round(this.cupQuantity * 10 / this.bundle.softs.length);
    this.dialogTitle = this.bundle.name + ' - 10 Cup Bundle';
    this.bundlePrice = this.bundle.price;
  }

  onChange(event : any){
    this.alcoholQuantity = Math.round(this.cupQuantity * event.value / this.bundle.alcohols.length);
    this.softQuantity= Math.round(this.cupQuantity * event.value / this.bundle.softs.length);
    this.dialogTitle = this.bundle.name + ' - ' + event.value + ' Cup Bundle';
    this.bundlePrice = event.value / 10 * this.bundle.price;
  }

  add(){
    this.dialogRef.close(this.sliderValue/10);
  }

}
