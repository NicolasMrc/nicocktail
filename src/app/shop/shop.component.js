"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Drink_1 = require("../../entities/Drink");
var ShopComponent = (function () {
    function ShopComponent() {
        this.drinks = [
            new Drink_1.Drink(0, "Mojito", "Some descirption"),
            new Drink_1.Drink(0, "Blue Lagoon", "Some descirption"),
            new Drink_1.Drink(0, "Caipirihna", "Some descirption"),
            new Drink_1.Drink(0, "Cosmopolitan", "Some descirption"),
        ];
    }
    ShopComponent.prototype.ngOnInit = function () {
    };
    ShopComponent = __decorate([
        core_1.Component({
            selector: 'app-shop',
            templateUrl: './shop.component.html',
            styleUrls: ['./shop.component.css']
        })
    ], ShopComponent);
    return ShopComponent;
}());
exports.ShopComponent = ShopComponent;
//# sourceMappingURL=shop.component.js.map