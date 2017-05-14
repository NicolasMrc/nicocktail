import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Bundle} from "../../entities/Bundle";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {BundleService} from "../../services/BundleService";
import {DialogService} from "../../services/DialogService";
import {ExtraService} from "../../services/ExtraService";
import {AlcoholService} from "../../services/AlcoholService";
import {SoftService} from "../../services/SoftService";
import {MdSnackBar} from "@angular/material";
import {Extra} from "../../entities/Extra";
import {Soft} from "../../entities/Soft";
import {Alcohol} from "../../entities/Alcohol";

@Component({
  selector: 'app-admin-bundle-new',
  templateUrl: './admin-bundle-new.component.html',
  styleUrls: ['./admin-bundle-new.component.css']
})
export class AdminBundleNewComponent implements OnInit {

  public bundle : Bundle = new Bundle();

  constructor(private bundleService : BundleService, private dialogService : DialogService, private viewContainerRef : ViewContainerRef, private router : Router,
              private softService : SoftService, private alcoholService : AlcoholService, private extraService : ExtraService, private snack : MdSnackBar) { }

  ngOnInit() {
    this.bundle.extras = [];
    this.bundle.softs = [];
    this.bundle.alcohols = [];
  }

  addAlcohol(){
    this.dialogService.addToBundle('alcohol', this.viewContainerRef).subscribe(res => {
      if(res != null){
        this.alcoholService.findOne(res).subscribe(alcohol => {
          this.bundle.alcohols.push(alcohol);
          this.snack.open(alcohol.name + " added !", null, {duration: 2000});
        })
      }
    })
  }

  addSoft(){
    this.dialogService.addToBundle('soft', this.viewContainerRef).subscribe(res => {
      if(res != null) {
        this.softService.findOne(res).subscribe(soft => {
          this.bundle.softs.push(soft);
          this.snack.open(soft.name + " added !", null, {duration: 2000});
        })
      }
    })
  }

  addExtra(){
    this.dialogService.addToBundle('extra', this.viewContainerRef).subscribe(res => {
      if(res != null) {
        this.extraService.findOne(res).subscribe(extra => {
          this.bundle.extras.push(extra);
          this.snack.open(extra.name + " added !", null, {duration: 2000});
        })
      }
    })
  }

  deleteExtra(extra : Extra){
    var index = this.bundle.extras.indexOf(extra);
    this.snack.open(extra.name + " deleted !", null, {duration: 2000});
    this.bundle.extras.splice(index, 1);
  }

  deleteSoft(soft : Soft){
    var index = this.bundle.softs.indexOf(soft);
    this.snack.open(soft.name + " deleted !", null, {duration: 2000});
    this.bundle.softs.splice(index, 1);
  }

  deleteAlcohol(alcohol : Alcohol){
    var index = this.bundle.alcohols.indexOf(alcohol);
    this.snack.open(alcohol.name + " deleted !", null, {duration: 2000});
    this.bundle.alcohols.splice(index, 1);
  }

  save(){
    this.bundleService.addBundle(this.bundle).subscribe(()=>{
      this.snack.open(this.bundle.name + ' created !', null, {duration : 2000});
      this.router.navigate(['/admin/bundle'])
    });
  }
}
