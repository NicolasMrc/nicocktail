/**
 * Created by Nico on 07/05/2017.
 */
/**
 * Created by Nico on 31/01/2017.
 */

import { Observable } from 'rxjs/Rx';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable, ViewContainerRef } from '@angular/core';
import {DialogEditBundleComponent} from "../app/dialog/dialog-edit-bundle/dialog-edit-bundle.component";
import {Alcohol} from "../entities/Alcohol";
import {DialogConfirmationComponent} from "../app/dialog/dialog-confirmation/dialog-confirmation.component";

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

}
