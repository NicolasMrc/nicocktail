import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ShopComponent } from './shop/shop.component';
import { BuilderComponent } from './builder/builder.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { BoxComponent } from './box/box.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { RegistrationComponent } from './registration/registration.component';
import { SigninComponent } from './signin/signin.component';


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

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
