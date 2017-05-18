import { Component } from '@angular/core';
import {AlcoholService} from "../../services/AlcoholService";
import {SoftService} from "../../services/SoftService";
import {ExtraService} from "../../services/ExtraService";
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'app-dialog-add-to-bundle',
  templateUrl: './dialog-add-to-bundle.component.html',
  styleUrls: ['./dialog-add-to-bundle.component.css']
})

export class DialogAddToBundleComponent {

  public list;
  public title : string;
  public type : string;
  public result;

  constructor(public dialogRef: MdDialogRef<DialogAddToBundleComponent>, private alcoholService : AlcoholService, private  softService : SoftService, private extraService : ExtraService) {

  }

  initList(type : string){
    this.type = type;
    switch (type){
      case 'alcohol':
        this.alcoholService.findAll().subscribe(alcohols => this.list = alcohols);
        this.title = 'Select the Alcohol you want to choose';
        break;
      case 'soft' :
        this.softService.findAll().subscribe(alcohols => this.list = alcohols);
        this.title = 'Select the soft drink you want to choose';
        this.type = 'soft drink';
        break;
      case 'extra' :
        this.extraService.findAll().subscribe(alcohols => this.list = alcohols);
        this.title = 'Select the extra you want to choose';
        break;
    }
  }



}

