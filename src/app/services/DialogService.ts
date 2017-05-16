/**
 * Created by Nico on 07/05/2017.
 */
/**
 * Created by Nico on 31/01/2017.
 */

import { Observable } from 'rxjs/Rx';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable, ViewContainerRef } from '@angular/core';
import {DialogConfirmationComponent} from "../dialog/dialog-confirmation/dialog-confirmation.component";
import {Alcohol} from "../../entities/Alcohol";
import {DialogEditBundleComponent} from "../dialog/dialog-edit-bundle/dialog-edit-bundle.component";
import {DialogAddToBundleComponent} from "../dialog/dialog-add-to-bundle/dialog-add-to-bundle.component";
import {DialogSigninComponent} from "../dialog/dialog-signin/dialog-signin.component";
import {DialogPaymentComponent} from "../dialog/dialog-payment/dialog-payment.component";

@Injectable()
export class DialogService {

  constructor(private dialog: MdDialog) { }

  public confirm(title: string, message: string, viewContainerRef: ViewContainerRef): Observable<boolean> {

    let dialogRef: MdDialogRef<DialogConfirmationComponent>;
    let config = new MdDialogConfig();
    config.viewContainerRef = viewContainerRef;

    dialogRef = this.dialog.open(DialogConfirmationComponent, config);

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }

  public editAlcohol(alcohol : Alcohol, viewContainerRef: ViewContainerRef): Observable<Alcohol> {

    let dialogRef: MdDialogRef<DialogEditBundleComponent>;
    let config = new MdDialogConfig();
    config.viewContainerRef = viewContainerRef;

    dialogRef = this.dialog.open(DialogEditBundleComponent, config);
    dialogRef.componentInstance.alcohol = alcohol;

    return dialogRef.afterClosed();
  }

  public addToBundle(type : string, viewContainerRef: ViewContainerRef): Observable<any> {

    let dialogRef: MdDialogRef<DialogAddToBundleComponent>;
    let config = new MdDialogConfig();
    config.viewContainerRef = viewContainerRef;

    dialogRef = this.dialog.open(DialogAddToBundleComponent, config);
    dialogRef.componentInstance.initList(type);

    dialogRef.afterClosed().subscribe(res=>console.log(res));

    return dialogRef.afterClosed();
  }

  public signinRequest(viewContainerRef: ViewContainerRef): Observable<any> {

    let dialogRef: MdDialogRef<DialogSigninComponent>;
    let config = new MdDialogConfig();
    config.viewContainerRef = viewContainerRef;

    dialogRef = this.dialog.open(DialogSigninComponent, config);

    return dialogRef.afterClosed();
  }

  public payment(viewContainerRef: ViewContainerRef) : Observable<any>{
    let dialogRef: MdDialogRef<DialogPaymentComponent>;
    let config = new MdDialogConfig();
    config.viewContainerRef = viewContainerRef;

    dialogRef = this.dialog.open(DialogPaymentComponent, config);

    return dialogRef.afterClosed();
  }



}
