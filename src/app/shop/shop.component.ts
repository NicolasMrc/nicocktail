import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Bundle} from "../../entities/Bundle";
import {BundleService} from "../services/BundleService";
import {AuthService} from "../services/auth/auth.service";
import {UserService} from "../services/UserService";
import {MdSnackBar} from "@angular/material";
import {DialogService} from "app/services/DialogService";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {Soft} from "entities/Soft";
import {SoftService} from "app/services/SoftService";
import {AlcoholService} from "../services/AlcoholService";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  public bundles : Bundle[];

  constructor(private bundleService : BundleService, private authService : AuthService, private userService : UserService, private snack : MdSnackBar,
  private dialogService : DialogService, private viewContainerRef : ViewContainerRef, private softService : SoftService, private alcoholService : AlcoholService) { }


  myControl = new FormControl();
  options = [];

  search = [];

  filteredOptions: Observable<any>;

  filter(name: string): any[] {
    return this.options.filter(option => new RegExp(`^${name}`, 'gi').test(option.name));
  }

  displayFn(ingredient: any): string {
    return ingredient ? ingredient.name : ingredient;
  }

  ngOnInit() {

    this.softService.findAll().subscribe(res => {
      this.options = this.options.concat(res);
    });

    this.alcoholService.findAll().subscribe(res => {
      this.options = this.options.concat(res);
    });

    this.filteredOptions = this.myControl.valueChanges
      .startWith(null)
      .map(soft => soft && typeof soft === 'object' ? soft.name : soft)
      .map(name => name ? this.filter(name) : this.options.slice());

    this.bundleService.findAll().subscribe(bundles => {
      this.bundles = bundles;
      if(this.authService.isLoggedIn){
        for(let bundle of this.bundles){
          var isWished = false;
          for(let wish of this.authService.currentUser.wishlist){
            if (bundle.name == wish.name){
              isWished = true;
              break;
            }
          }
          if(isWished){
            bundle.isWished = true;
          }
        }
      }
    });


  }

  addToWishlist(bundle : Bundle){
    if(this.authService.isLoggedIn){
      let user = this.authService.currentUser;

      var exist = false;

      for(let wish of user.wishlist){
        if (bundle.name == wish.name){
          exist = true;
        }
      }

      if(exist){
        let index = user.wishlist.indexOf(bundle);
        user.wishlist.splice(index, 1);
        this.userService.updateUser(user).subscribe(user => {
          bundle.isWished = false;
          this.authService.currentUser = user;
          this.snack.open(bundle.name + ' removed from your wishlist !', null, {duration : 2000})
        });
      } else {
        user.wishlist.push(bundle);
        this.userService.updateUser(user).subscribe(user => {
          this.authService.currentUser = user;
          bundle.isWished = true;
          this.snack.open(bundle.name + ' added to your wishlist !', null, {duration : 2000})
        });
      }


    } else {
      this.dialogService.signinRequest(this.viewContainerRef).subscribe();
    }
  }

  dialogToCart(bundle : Bundle){
    if(this.authService.isLoggedIn){
      this.dialogService.addToCart(this.viewContainerRef, bundle).subscribe(res => {
          let user = this.authService.currentUser;
          for(var i = 0; i < res; i++){
            user.cart.push(bundle);
          }
          this.userService.updateUser(user).subscribe(user => {
            this.authService.currentUser = user;
            this.snack.open(bundle.name + ' added to your cart !', null, {duration : 2000})
          });
      })
    } else {
      this.dialogService.signinRequest(this.viewContainerRef).subscribe();
    }
  }

  addChip(event : any){
    if(event.keyCode == 13) {
      if(typeof this.myControl.value === 'object' && this.search.indexOf(this.myControl.value) < 0){
        this.search.push(this.myControl.value);
        this.myControl.setValue([]);
        this.filterBundles();
      }
    }

  }

  removeChip(ingredient : any){
    this.search = this.search.filter(item => item.name !== ingredient.name);
    if(this.search.length == 0){
      this.bundleService.findAll().subscribe(res => {
        this.bundles = res;
      });
    } else{
      this.filterBundles();
    }
  }

  filterBundles(){
    var bundles = [];

    this.bundleService.findAll().subscribe(res => {
      for(let bundle of res){
        var contain = true;
        console.log(this.search);
        if(this.search.length == 0){
          bundles = res;
        } else {
          for(let ingredient of this.search){
            console.log('searching' + ingredient.name);
            var containIngredient = false;
            for(let alcohol of bundle.alcohols){
              if(alcohol.name == ingredient.name){
                containIngredient = true;
                break;
              }
            }
            for(let soft of bundle.softs){
              if(soft.name == ingredient.name){
                containIngredient = true;
                break;
              }
            }
            if(!containIngredient){
              contain = false;
            }
          }
        }
        if(contain){
          bundles.push(bundle);
        }
      }
      this.bundles = bundles;
    });
  }
}
