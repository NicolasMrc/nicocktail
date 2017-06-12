import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Alcohol} from "../../entities/Alcohol";
import {Soft} from "../../entities/Soft";
import {Extra} from "../../entities/Extra";
import {AlcoholService} from "../services/AlcoholService";
import {SoftService} from "../services/SoftService";
import {ExtraService} from "../services/ExtraService";
import {MdSnackBar} from "@angular/material";
import {DialogService} from "../services/DialogService";

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent implements OnInit {

  sliderValue = 80;
  sliderMax = 100;
  sliderMin = 10;
  sliderStep = 10;
  sliderThumbLabel = true;
  sliderTick = false;

  alcohols : Alcohol[] = [];
  softs : Soft[] = [];
  extras : Extra[] = [];

  color : string = "";
  bulleSize : number;

  constructor(private alcoholService : AlcoholService, private softService : SoftService,
              private extraService : ExtraService, private viewContainerRef : ViewContainerRef, private snack : MdSnackBar,
              private dialogService : DialogService) { }

  ngOnInit() {
    this.bulleSize = Math.random() * 20;
  }

  addAlcohol(){
    this.dialogService.addToBundle('alcohol', this.viewContainerRef).subscribe(res => {
      if(res != null){
        this.alcoholService.findOne(res).subscribe(alcohol => {
          this.alcohols.push(alcohol);
          this.snack.open(alcohol.name + " added !", null, {duration: 2000});
        })
      }
    })
  }

  addSoft(){
    this.dialogService.addToBundle('soft', this.viewContainerRef).subscribe(res => {
      if(res != null) {
        this.softService.findOne(res).subscribe(soft => {
          this.softs.push(soft);
          this.color = '#b40500';
          this.snack.open(soft.name + " added !", null, {duration: 2000});
        })
      }
    })
  }

  addExtra(){
    this.dialogService.addToBundle('extra', this.viewContainerRef).subscribe(res => {
      if(res != null) {
        this.extraService.findOne(res).subscribe(extra => {
          this.extras.push(extra);
          this.snack.open(extra.name + " added !", null, {duration: 2000});
        })
      }
    })
  }

  randomDuration(){
    return (Math.random() * 3)
  }

}
