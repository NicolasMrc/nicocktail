import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Soft} from "../../entities/Soft";
import {SoftService} from "../services/SoftService";
import {DialogService} from "../services/DialogService";
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-admin-soft',
  templateUrl: './admin-soft.component.html',
  styleUrls: ['./admin-soft.component.css']
})
export class AdminSoftComponent implements OnInit {

  softs : Soft[] = [];

  newSoft : Soft = new Soft();

  seeDisabled : boolean = false;

  constructor(private softService : SoftService, private dialogService : DialogService, private snack : MdSnackBar,
              private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.softService.findAllEnabled().subscribe(softs => {
      this.softs = softs;
    });
  }

  update(soft : Soft){
    this.softService.update(soft).subscribe(updatedSoft => {
      soft = updatedSoft;
      this.snack.open(soft.name + " updated !", null, {duration: 2000});
    });
  }

  add(){
    if(this.newSoft.name != ""){
      this.softService.addSoft(this.newSoft)
        .subscribe(soft => {
          this.softs.push(soft);
          this.newSoft = new Soft();
          this.snack.open(soft.name + " added to catalog !", null, {duration: 2000})
        });
    }
  }

  deleteSoft(soft : Soft){
    let modalTitle : string;
    let modalText : string;
    let snackText : string;

    if (soft.enabled){
      modalTitle = "Disable " + soft.name;
      modalText = "Are you sure to disable this soft ?";
      snackText = soft.name + " disabled !";
    } else {
      modalTitle ="Enable " + soft.name;
      modalText ="Are you sure to enable this soft ?";
      snackText = soft.name + " enabled !";
    }

    this.dialogService.confirm(modalTitle, modalText, this.viewContainerRef).subscribe(
      res => {
        if(res){
          this.softService.deleteSoft(soft.id).subscribe(res => {
            this.snack.open(snackText, null, {duration: 2000});
            soft.enabled = !soft.enabled;
          });
        }
      });
  }

  switchEnabledMode(){
    this.softs = [];
    this.seeDisabled = !this.seeDisabled;

    if(this.seeDisabled) {
      this.softService.findAll().subscribe(softs => {
        this.softs = softs;
      });
    } else {
      this.softService.findAllEnabled().subscribe(softs => {
        this.softs = softs;
      });
    }
  }



}
