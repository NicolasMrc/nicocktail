import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {UserService} from "./services/UserService";
import {AlcoholService} from "./services/AlcoholService";
import {SoftService} from "./services/SoftService";
import {ExtraService} from "./services/ExtraService";
import {BundleService} from "./services/BundleService";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {
  MdAutocompleteModule,
  MdButtonModule, MdCardModule, MdCheckboxModule, MdChipsModule, MdDialogModule, MdIconModule, MdInputModule,
  MdMenuModule, MdOption,
  MdOptionModule, MdProgressBarModule, MdProgressSpinnerModule,
  MdRadioButton,
  MdRadioModule, MdSelectModule,
  MdSidenavModule, MdSliderModule,
  MdSnackBarModule, MdTabsModule, MdTooltipModule
} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DialogEditBundleComponent} from "./dialog/dialog-edit-bundle/dialog-edit-bundle.component";
import {DialogService} from "./services/DialogService";
import { DialogConfirmationComponent } from './dialog/dialog-confirmation/dialog-confirmation.component';
import { HeaderComponent } from './header/header.component';
import {RouterModule, Routes} from "@angular/router";
import {AuthService} from "./services/auth/auth.service";
import {AuthGuardService} from "./services/auth/auth-guard.service";
import { AdminComponent } from './admin/admin.component';
import { AdminAlcoholComponent } from './admin-alcohol/admin-alcohol.component';
import { AdminSoftComponent } from './admin-soft/admin-soft.component';
import { AdminExtraComponent } from './admin-extra/admin-extra.component';
import { AdminBundleComponent } from './admin-bundle/admin-bundle.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ManageAccountComponent } from './manage-account/manage-account.component';
import { AdminBundleEditComponent } from './admin-bundle-edit/admin-bundle-edit.component';
import { DialogAddToBundleComponent } from './dialog/dialog-add-to-bundle/dialog-add-to-bundle.component';
import { AdminBundleNewComponent } from './admin-bundle-new/admin-bundle-new.component';
import {UserGuardService} from "./services/auth/user-guard.service";
import {Hasher} from "./services/auth/hasher.service";
import { DialogSigninComponent } from './dialog/dialog-signin/dialog-signin.component';
import { DialogPaymentComponent } from './dialog/dialog-payment/dialog-payment.component';
import { OrdersComponent } from './orders/orders.component';
import {OrderService} from "./services/OrderService";
import {FileUploadModule} from "ng2-file-upload";
import { DialogAddToCartComponent } from './dialog/dialog-add-to-cart/dialog-add-to-cart.component';
import { VerifyComponent } from './verify/verify.component';
import {RecaptchaModule} from "ng-recaptcha";
import {Ng2PageScrollModule} from "ng2-page-scroll";
import {ChartsModule} from "ng2-charts";
import { ContactComponent } from './contact/contact.component';

const appRoutes: Routes = [
  { path: 'shop', component: ShopComponent },
  { path: 'drink-box', component: BoxComponent },
  { path: 'builder', component: BuilderComponent, canActivate: [UserGuardService] },
  { path: 'home', component: HomeComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'cart', component: CartComponent, canActivate: [UserGuardService]},
  { path: 'wishlist', component: WishlistComponent, canActivate: [UserGuardService] },
  { path: 'sign-in', component: SigninComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'account', component: ManageAccountComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'verify/:id/:token', component: VerifyComponent },
  { path: 'orders', component: OrdersComponent, canActivate: [UserGuardService] },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuardService],
        children: [
          { path: 'alcohol', component: AdminAlcoholComponent },
          { path: 'soft', component: AdminSoftComponent },
          { path: 'extra', component: AdminExtraComponent },
          { path: 'bundle', component: AdminBundleComponent },
          { path: 'bundle/:id', component: AdminBundleEditComponent },
          { path: 'user', component: AdminUserComponent },
          { path: 'new-bundle', component: AdminBundleNewComponent },
          { path: '', component: AdminPanelComponent },
        ]
      }
    ]
  },

];


@NgModule({
  declarations: [
    BoxComponent,
    AppComponent,
    ShopComponent,
    CartComponent,
    HomeComponent,
    AdminComponent,
    HeaderComponent,
    VerifyComponent,
    OrdersComponent,
    SigninComponent,
    BuilderComponent,
    ContactComponent,
    WishlistComponent,
    AdminSoftComponent,
    AdminUserComponent,
    AdminPanelComponent,
    AdminExtraComponent,
    AdminBundleComponent,
    AdminAlcoholComponent,
    DialogSigninComponent,
    RegistrationComponent,
    ManageAccountComponent,
    DialogPaymentComponent,
    AdminBundleNewComponent,
    DialogAddToCartComponent,
    AdminBundleEditComponent,
    DialogEditBundleComponent,
    DialogAddToBundleComponent,
    DialogConfirmationComponent,

  ],
  imports: [
    HttpModule,
    FormsModule,
    JsonpModule,
    MdIconModule,
    MdCardModule,
    MdMenuModule,
    MdTabsModule,
    ChartsModule,
    MdInputModule,
    BrowserModule,
    MdChipsModule,
    MdRadioModule,
    MdButtonModule,
    MdSelectModule,
    MdOptionModule,
    MdDialogModule,
    MdSliderModule,
    MdTooltipModule,
    MdSidenavModule,
    MdSnackBarModule,
    FileUploadModule,
    MdCheckboxModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    MdProgressBarModule,
    MdAutocompleteModule,
    MdProgressSpinnerModule,
    BrowserAnimationsModule,
    RecaptchaModule.forRoot(),
    Ng2PageScrollModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    Hasher,
    UserService,
    SoftService,
    AuthService,
    ExtraService,
    OrderService,
    DialogService,
    BundleService,
    AlcoholService,
    UserGuardService,
    AuthGuardService,
  ],
  entryComponents:[
    DialogSigninComponent,
    DialogPaymentComponent,
    DialogAddToCartComponent,
    DialogEditBundleComponent,
    DialogAddToBundleComponent,
    DialogConfirmationComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
