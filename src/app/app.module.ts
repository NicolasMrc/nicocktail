import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { ShopComponent } from './shop/shop.component';
import { BuilderComponent } from './builder/builder.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { BoxComponent } from './box/box.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { RegistrationComponent } from './registration/registration.component';
import { SigninComponent } from './signin/signin.component';
import {DrinkService} from "../services/DrinkService";
import {UserService} from "../services/UserService";
import {AlcoholService} from "../services/AlcoholService";
import {SoftService} from "../services/SoftService";
import {ExtraService} from "../services/ExtraService";
import {BundleService} from "../services/BundleService";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {
  MdButtonModule, MdCheckboxModule, MdDialogModule, MdIconModule, MdInputModule,
  MdSnackBarModule
} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DialogEditBundleComponent} from "./dialog/dialog-edit-bundle/dialog-edit-bundle.component";
import {Alcohol} from "../entities/Alcohol";
import {DialogService} from "../services/DialogService";
import { DialogConfirmationComponent } from './dialog/dialog-confirmation/dialog-confirmation.component';


@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    BuilderComponent,
    CartComponent,
    HomeComponent,
    BoxComponent,
    WishlistComponent,
    RegistrationComponent,
    SigninComponent,
    DialogEditBundleComponent,
    DialogConfirmationComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    NgbModule.forRoot(),
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule,
    MdDialogModule,
    BrowserAnimationsModule,
    MdIconModule,
    MdSnackBarModule
  ],
  providers: [
    DrinkService,
    UserService,
    AlcoholService,
    SoftService,
    ExtraService,
    BundleService,
    DialogService
  ],
  entryComponents:[
    DialogEditBundleComponent,
    DialogConfirmationComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
