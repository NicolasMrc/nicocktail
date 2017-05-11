import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Alcohol} from "../../entities/Alcohol";
import {AlcoholService} from "../../services/AlcoholService";
import {DialogService} from "../../services/DialogService";
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-admin-alcohol',
  templateUrl: './admin-alcohol.component.html',
  styleUrls: ['./admin-alcohol.component.css']
})
export class AdminAlcoholComponent implements OnInit {

  alcohols : Alcohol[];

  newAlcohol : Alcohol = new Alcohol();

  constructor(private alcoholService : AlcoholService, private dialogService : DialogService, private snack : MdSnackBar,
              private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.getDrinks()
  }

  getDrinks(): void {
    this.alcoholService
      .findAll()
      .subscribe(alcohols => this.alcohols = alcohols);
  }

  update(alcohol : Alcohol){
    this.alcoholService.update(alcohol).subscribe(updatedAlcohol => {
      alcohol = updatedAlcohol;
      this.snack.open(alcohol.name + " updated !", null, {duration: 2000});
    });
  }

  add(){
    if(this.newAlcohol.name != "" && this.newAlcohol.degree != null){
      this.alcoholService.addAlcohol(this.newAlcohol)
        .subscribe(alcohol => {
          this.alcohols.push(alcohol);
          this.newAlcohol = new Alcohol();
          this.snack.open(alcohol.name + " added to catalog !", null, {duration: 2000})
        });
    }
  }

  deleteAlcohol(alcohol : Alcohol){
    this.dialogService.confirm("Delete ?", "Are you sure to delete this alcohol ?", this.viewContainerRef).subscribe(
      res => {
        if(res){
          this.alcoholService.deleteAlcohol(alcohol.id).subscribe(res => {
            var index = this.alcohols.indexOf(alcohol);
            this.snack.open(alcohol.name + " deleted !", null, {duration: 2000});
            this.alcohols.splice(index, 1);
          });
        }
      });
  }
}
