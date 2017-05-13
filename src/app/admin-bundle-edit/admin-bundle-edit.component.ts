import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {BundleService} from "../../services/BundleService";
import {Bundle} from "../../entities/Bundle";

@Component({
  selector: 'app-admin-bundle-edit',
  templateUrl: './admin-bundle-edit.component.html',
  styleUrls: ['./admin-bundle-edit.component.css']
})
export class AdminBundleEditComponent implements OnInit {

  public bundle : Bundle;

  constructor(private route : ActivatedRoute, private bundleService : BundleService) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.bundleService.findOne(params['id']))
      .subscribe(bundle => this.bundle = bundle);
  }

}
