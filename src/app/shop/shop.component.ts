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

  saveNewDrink(){
    if(this.newAlcohol.name != "" && this.newAlcohol.degree != null){
      this.alcoholService.addAlcohol(this.newAlcohol)
        .subscribe(alcohol => {
          this.alcohols.push(alcohol);
          this.newAlcohol = new Alcohol();
          this.snackBar.open("Alcohol added to catalog !", null, {duration: 2000})
        });
    }
  }

  onEdit(alcohol : Alcohol){
    this.dialogService
      .editAlcohol(alcohol, this.viewContainerRef)
      .subscribe(res => {
        if(res != null){
          /*this.alcoholService.updateAlcohol(alcohol)
            .subscribe(
              () => this.snackBar.open("Element saved !", null, {duration: 2000})
            );*/
        }
      });
  }

  onDelete(alcohol : Alcohol){
    this.dialogService.confirm("Delete ?", "Are you sure to delete this alcohol ?", this.viewContainerRef).subscribe(
      res => {
        if(res){
          this.alcoholService.delete(alcohol.id).then(res => {
            var index = this.alcohols.indexOf(alcohol);
            this.snackBar.open("Alcohol deleted !", null, {duration: 2000});
            this.alcohols.splice(index, 1);
          });
        }
      });
    }
}
