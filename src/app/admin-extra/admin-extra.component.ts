import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Extra} from "../../entities/Extra";
import {ExtraService} from "../../services/ExtraService";
import {DialogService} from "../../services/DialogService";
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-admin-extra',
  templateUrl: './admin-extra.component.html',
  styleUrls: ['./admin-extra.component.css']
})
export class AdminExtraComponent implements OnInit {
  extras : Extra[];

  newExtra : Extra = new Extra();

  constructor(private extraService : ExtraService, private dialogService : DialogService, private snack : MdSnackBar,
              private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.getExtras()
  }

  getExtras(): void {
    this.extraService
      .findAll()
      .subscribe(extras => this.extras = extras);
  }

  update(extra : Extra){
    this.extraService.update(extra).subscribe(updatedAlcohol => {
      extra = updatedAlcohol;
      this.snack.open(extra.name + " updated !", null, {duration: 2000});
    });
  }

  add(){
    if(this.newExtra.name != "" && this.newExtra.price != null){
      this.extraService.addExtra(this.newExtra)
        .subscribe(alcohol => {
          this.extras.push(alcohol);
          this.newExtra = new Extra();
          this.snack.open(alcohol.name + " added to catalog !", null, {duration: 2000})
        });
    }
  }

  deleteExtra(extra : Extra){
    this.dialogService.confirm("Delete ?", "Are you sure to delete this extra ?", this.viewContainerRef).subscribe(
      res => {
        if(res){
          this.extraService.deleteExtra(extra.id).subscribe(res => {
            var index = this.extras.indexOf(extra);
            this.snack.open(extra.name + " deleted !", null, {duration: 2000});
            this.extras.splice(index, 1);
          });
        }
      });
  }
}
