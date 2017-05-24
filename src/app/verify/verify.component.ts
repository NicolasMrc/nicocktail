import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UserService} from "../services/UserService";
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  constructor(private route : ActivatedRoute, private userService : UserService, private snack : MdSnackBar, private router : Router) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.userService.verify(params['id'], params['token']))
      .subscribe( res => {
        this.snack.open('Account verified !', null, {duration : 2000})
        this.router.navigate(['/sign-in']);
      });
  }

}
