import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Bundle} from "../../entities/Bundle";
import {BundleService} from "../services/BundleService";
import {DialogService} from "../services/DialogService";
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-admin-bundle',
  templateUrl: './admin-bundle.component.html',
  styleUrls: ['./admin-bundle.component.css']
})
export class AdminBundleComponent implements OnInit {

  bundles : Bundle[];

  newBundle : Bundle = new Bundle();

  constructor(private bundleService : BundleService, private dialogService : DialogService, private snack : MdSnackBar,
              private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.getBundles()
  }

  getBundles(): void {
    this.bundleService
      .findAll()
      .subscribe(bundles => {
        return this.bundles = bundles
      });
  }

  update(bundle : Bundle){
    this.bundleService.update(bundle).subscribe(updatedAlcohol => {
      bundle = updatedAlcohol;
      this.snack.open(bundle.name + " updated !", null, {duration: 2000});
    });
  }

  add(){
    if(this.newBundle.name != "" && this.newBundle.description != null){
      this.bundleService.addBundle(this.newBundle)
        .subscribe(alcohol => {
          this.bundles.push(alcohol);
          this.newBundle = new Bundle();
          this.snack.open(alcohol.name + " added to catalog !", null, {duration: 2000})
        });
    }
  }

  deleteBundle(bundle : Bundle){
    this.dialogService.confirm("Delete ?", "Are you sure to delete this bundle ?", this.viewContainerRef).subscribe(
      res => {
        if(res){
          this.bundleService.deleteBundle(bundle.id).subscribe(res => {
            var index = this.bundles.indexOf(bundle);
            this.snack.open(bundle.name + " deleted !", null, {duration: 2000});
            this.bundles.splice(index, 1);
          });
        }
      });
  }

}
