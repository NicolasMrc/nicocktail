import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'app-dialog-signin',
  templateUrl: './dialog-signin.component.html',
  styleUrls: ['./dialog-signin.component.css']
})
export class DialogSigninComponent {

  action : string = "";

  constructor(public dialogRef: MdDialogRef<DialogSigninComponent>) {

  }

}
