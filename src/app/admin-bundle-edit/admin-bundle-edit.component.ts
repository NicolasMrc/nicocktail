import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {BundleService} from "../services/BundleService";
import {Bundle} from "../../entities/Bundle";
import {DialogService} from "../services/DialogService";
import {MdSnackBar} from "@angular/material";
import {SoftService} from "../services/SoftService";
import {AlcoholService} from "../services/AlcoholService";
import {ExtraService} from "../services/ExtraService";
import {Extra} from "../../entities/Extra";
import {Soft} from "../../entities/Soft";
import {Alcohol} from "../../entities/Alcohol";

@Component({
  selector: 'app-admin-bundle-edit',
  templateUrl: './admin-bundle-edit.component.html',
  styleUrls: ['./admin-bundle-edit.component.css']
})
export class AdminBundleEditComponent implements OnInit {

  public bundle : Bundle = new Bundle();

  constructor(private route : ActivatedRoute, private bundleService : BundleService, private dialogService : DialogService, private viewContainerRef : ViewContainerRef,
              private softService : SoftService, private alcoholService : AlcoholService, private extraService : ExtraService, private snack : MdSnackBar) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.bundleService.findOne(params['id']))
      .subscribe(bundle => this.bundle = bundle);
  }

  addAlcohol(){
    this.dialogService.addToBundle('alcohol', this.viewContainerRef).subscribe(res => {
      if(res != null){
        this.alcoholService.findOne(res).subscribe(alcohol => {
          this.bundle.alcohols.push(alcohol);
          this.bundleService.update(this.bundle).subscribe(() => this.snack.open(alcohol.name + " added !", null, {duration: 2000}));
        })
      }
    })
  }

  addSoft(){
    this.dialogService.addToBundle('soft', this.viewContainerRef).subscribe(res => {
      if(res != null) {
        this.softService.findOne(res).subscribe(soft => {

          this.bundle.softs.push(soft);
          this.bundleService.update(this.bundle).subscribe(() => this.snack.open(soft.name + " added !", null, {duration: 2000}));
        })
      }
    })
  }

  addExtra(){
    this.dialogService.addToBundle('extra', this.viewContainerRef).subscribe(res => {
      if(res != null) {
        this.extraService.findOne(res).subscribe(extra => {
          this.bundle.extras.push(extra);
          this.bundleService.update(this.bundle).subscribe(() => this.snack.open(extra.name + " added !", null, {duration: 2000}));
        })
      }
    })
  }

  deleteExtra(extra : Extra){
    var index = this.bundle.extras.indexOf(extra);
    this.snack.open(extra.name + " deleted !", null, {duration: 2000});
    this.bundle.extras.splice(index, 1);

    this.bundleService.update(this.bundle).subscribe();
  }

  deleteSoft(soft : Soft){
    var index = this.bundle.softs.indexOf(soft);
    this.snack.open(soft.name + " deleted !", null, {duration: 2000});
    this.bundle.softs.splice(index, 1);

    this.bundleService.update(this.bundle).subscribe();
  }

  deleteAlcohol(alcohol : Alcohol){
    var index = this.bundle.alcohols.indexOf(alcohol);
    this.snack.open(alcohol.name + " deleted !", null, {duration: 2000});
    this.bundle.alcohols.splice(index, 1);

    this.bundleService.update(this.bundle).subscribe();
  }

}
