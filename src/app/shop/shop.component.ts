import {Component, OnInit} from '@angular/core';
import {Bundle} from "../../entities/Bundle";
import {BundleService} from "../../services/BundleService";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  public bundles : Bundle[];

  constructor(private bundleService : BundleService) { }

  ngOnInit() {
    this.bundleService.findAll().subscribe(bundles => {
      this.bundles = bundles;
    })
  }
}
