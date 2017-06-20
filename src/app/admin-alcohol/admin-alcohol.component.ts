import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Alcohol} from "../../entities/Alcohol";
import {MdSnackBar} from "@angular/material";
import {AlcoholService} from "../services/AlcoholService";
import {DialogService} from "../services/DialogService";

@Component({
  selector: 'app-admin-alcohol',
  templateUrl: './admin-alcohol.component.html',
  styleUrls: ['./admin-alcohol.component.css']
})
export class AdminAlcoholComponent implements OnInit {

  alcohols : Alcohol[] = [];

  newAlcohol : Alcohol = new Alcohol();

  seeDisabled : boolean = false;

  constructor(private alcoholService : AlcoholService, private dialogService : DialogService, private snack : MdSnackBar,
              private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.alcoholService.findAllEnabled().subscribe(alcohols => {
      this.alcohols = alcohols;
    });
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
    let modalTitle : string;
    let modalText : string;
    let snackText : string;

    if (alcohol.enabled){
      modalTitle = "Disable " + alcohol.name;
      modalText = "Are you sure to disable this alcohol ?";
      snackText = alcohol.name + " disabled !";
    } else {
      modalTitle ="Enable " + alcohol.name;
      modalText ="Are you sure to enable this alcohol ?";
      snackText = alcohol.name + " enabled !";
    }

    this.dialogService.confirm(modalTitle, modalText, this.viewContainerRef).subscribe(
      res => {
        if(res){
          this.alcoholService.deleteAlcohol(alcohol.id).subscribe(res => {
            this.snack.open(snackText, null, {duration: 2000});
            alcohol.enabled = !alcohol.enabled;
          });
        }
      });
  }

  switchEnabledMode(){
    this.alcohols = [];
    this.seeDisabled = !this.seeDisabled;

    if(this.seeDisabled) {
      this.alcoholService.findAll().subscribe(alcohols => {
        this.alcohols = alcohols;
      });
    } else {
      this.alcoholService.findAllEnabled().subscribe(alcohols => {
        this.alcohols = alcohols;
      });
    }
  }
}
