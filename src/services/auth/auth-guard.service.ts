import { Injectable } from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router';
import { AuthService } from './auth.service';
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    var email = sessionStorage.getItem('email');
    var password = sessionStorage.getItem('pswd');

    if(this.authService.isLoggedIn){
      return true;
    } else {
      if(email != null && password != null){
        return this.authService.login(email, password, true).map(loggedIn => {

          if (this.authService.isLoggedIn && this.authService.currentUser.role == 'admin') {
            this.router.navigate([state]);
            return true;
          }
        }).catch(() => {
          //this.router.navigate(['/sign-in']);
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
