import { MdDialogRef } from '@angular/material';
import {Component, OnInit} from '@angular/core';
import {Alcohol} from "../../../entities/Alcohol";


@Component({
  selector: 'app-dialog-edit-bundle',
  templateUrl: './dialog-edit-bundle.component.html',
  styleUrls: ['./dialog-edit-bundle.component.css']
})
export class DialogEditBundleComponent implements OnInit {

  ngOnInit() {
  }

  public alcohol : Alcohol = new Alcohol;

  constructor(public dialogRef: MdDialogRef<DialogEditBundleComponent>) {
  }
}
