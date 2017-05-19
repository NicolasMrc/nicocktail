import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {Bundle} from "../../entities/Bundle";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService : AuthService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  computeLenght(bundles : Bundle[]){
    if(bundles != null){
      var bundles = this.authService.currentUser.cart;

      var newArr = [];

      for(let bundle of bundles) {
        var exists = false;
        for(let newItem of newArr) {
          if(bundle.id == newItem.id) {
            exists = true;
            newItem.quantity++;
          }
        }
        if(!exists && bundle.id != null) {
          newArr.push(bundle);
        }
      }

      return newArr.length;
    }
  }

}
