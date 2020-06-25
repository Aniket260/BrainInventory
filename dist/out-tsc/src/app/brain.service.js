import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
var BrainService = /** @class */ (function () {
    function BrainService(http, toastrService) {
        this.http = http;
        this.toastrService = toastrService;
        this.baseUrl = environment.URL;
    }
    BrainService.prototype.signUp = function (post) {
        return this.http.post(this.baseUrl + "/v0.1/signup", post);
    };
    BrainService.prototype.login = function (post) {
        return this.http.post(this.baseUrl + "/v0.1/login", post);
    };
    BrainService.prototype.getAllUser = function () {
        return this.http.get(this.baseUrl + "/v0.1/getAllUser");
    };
    BrainService.prototype.getToken = function () {
        return localStorage.getItem('token');
    };
    BrainService.prototype.loggedIn = function () {
        if (localStorage.getItem('token') == 'undefined' || localStorage.getItem('token') === '') {
            return !!localStorage.getItem('0');
        }
        return !!localStorage.getItem('token');
    };
    // tostr notifications
    BrainService.prototype.successMessage = function (message) {
        this.toastrService.success(message);
    };
    BrainService.prototype.ErrorMessage = function (message) {
        this.toastrService.error(message);
    };
    BrainService.prototype.infoMessage = function (message) {
        this.toastrService.info(message);
    };
    BrainService.prototype.warningMessage = function (message) {
        this.toastrService.warning(message);
    };
    BrainService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], BrainService);
    return BrainService;
}());
export { BrainService };
//# sourceMappingURL=brain.service.js.map