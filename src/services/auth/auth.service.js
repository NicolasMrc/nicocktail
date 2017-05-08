"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by Nico on 24/10/2016.
 */
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
var AuthService = (function () {
    function AuthService(userService, cookieService, sectionService, displayService) {
        this.userService = userService;
        this.cookieService = cookieService;
        this.sectionService = sectionService;
        this.displayService = displayService;
        this.isLoggedIn = false;
    }
    //TODO remettre a zero les service et display sur le preview
    AuthService.prototype.login = function (email, password, rememberMe) {
        var _this = this;
        var userExist = false;
        this.userService.login(email, password).subscribe(function (data) {
            if (data != null) {
                _this.currentUser = data;
                userExist = true;
                if (rememberMe) {
                    _this.cookieService.remove('userEmail');
                    _this.cookieService.remove('userPassword');
                    _this.cookieService.put('userEmail', _this.currentUser.email);
                    _this.cookieService.put('userPassword', password);
                }
            }
        });
        return Observable_1.Observable.of(userExist).delay(1000).do(function (val) { return _this.isLoggedIn = userExist; });
    };
    AuthService.prototype.logout = function () {
        this.cookieService.remove('userEmail');
        this.cookieService.remove('userPassword');
        this.currentUser = null;
        this.isLoggedIn = false;
        this.displayService.displayPreview = true;
        this.sectionService.section = null;
    };
    AuthService.prototype.checkCoockies = function () {
        var emailTmp = this.cookieService.get('userEmail');
        var passwordTmp = this.cookieService.get('userPassword');
        if (emailTmp != null && passwordTmp != null) {
            this.login(emailTmp, passwordTmp, true).subscribe(function () {
                return true;
            });
        }
        else {
            return false;
        }
    };
    AuthService = __decorate([
        core_1.Injectable()
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map