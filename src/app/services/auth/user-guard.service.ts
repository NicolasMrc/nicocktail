import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserGuardService {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    var email = sessionStorage.getItem('email');
    var password = sessionStorage.getItem('pswd');

    if(this.authService.isLoggedIn){
      return true;
    } else {
      if(email != null && password != null){
        return this.authService.login(email, password, true).map(loggedIn => {
            this.router.navigate([state]);
            return Observable.of(true);
        }).catch(() => {
          return Observable.of(true);
        });
      } else {
        this.router.navigate(['/home']);
        return false;
      }
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }

}
