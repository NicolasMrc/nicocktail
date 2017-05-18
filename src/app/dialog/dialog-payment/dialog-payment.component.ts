import { Component, OnInit } from '@angular/core';
import {MdDialogRef, MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-dialog-payment',
  templateUrl: './dialog-payment.component.html',
  styleUrls: ['./dialog-payment.component.css']
})
export class DialogPaymentComponent {

  isPaying : boolean = false;

  constructor(public dialogRef: MdDialogRef<DialogPaymentComponent>, private snack : MdSnackBar) {

  }

  pay(){
    this.isPaying = true;
    setTimeout(() => {
      this.dialogRef.close(true);
      this.snack.open('Payment Received !', null, {duration : 2000})
    }, 1500);
  }


}
