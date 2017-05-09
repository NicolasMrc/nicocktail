import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Soft} from "../../entities/Soft";
import {SoftService} from "../../services/SoftService";
import {DialogService} from "../../services/DialogService";
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-admin-soft',
  templateUrl: './admin-soft.component.html',
  styleUrls: ['./admin-soft.component.css']
})
export class AdminSoftComponent implements OnInit {

  softs : Soft[];

  newSoft : Soft = new Soft();

  constructor(private softService : SoftService, private dialogService : DialogService, private snack : MdSnackBar,
              private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.getSofts()
  }

  getSofts(): void {
    this.softService
      .getSofts()
      .subscribe(softs => this.softs = softs);
  }

  update(soft : Soft){
    this.softService.update(soft).subscribe(updatedAlcohol => {
      soft = updatedAlcohol;
      this.snack.open(soft.name + " updated !", null, {duration: 2000});
    });
  }

  add(){
    if(this.newSoft.name != "" && this.newSoft.type != null){
      this.softService.addSoft(this.newSoft)
        .subscribe(alcohol => {
          this.softs.push(alcohol);
          this.newSoft = new Soft();
          this.snack.open(alcohol.name + " added to catalog !", null, {duration: 2000})
        });
    }
  }

  deleteSoft(soft : Soft){
    this.dialogService.confirm("Delete ?", "Are you sure to delete this soft drink ?", this.viewContainerRef).subscribe(
      res => {
        if(res){
          this.softService.deleteSoft(soft.id).subscribe(res => {
            var index = this.softs.indexOf(soft);
            this.snack.open(soft.name + " deleted !", null, {duration: 2000});
            this.softs.splice(index, 1);
          });
        }
      });
  }

}
