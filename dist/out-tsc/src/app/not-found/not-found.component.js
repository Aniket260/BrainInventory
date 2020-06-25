import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
var NotFoundComponent = /** @class */ (function () {
    function NotFoundComponent(_router, roleService) {
        var _this = this;
        this._router = _router;
        this.roleService = roleService;
        this.ViewCompaignboolean = false;
        this.AllCompaign = [];
        this.showLoadingindicator = true;
        this._router.events.subscribe(function (routerEvent) {
            if (routerEvent instanceof NavigationStart) {
                _this.showLoadingindicator = true;
            }
            if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel || routerEvent instanceof NavigationError) {
                _this.showLoadingindicator = false;
            }
        });
    }
    NotFoundComponent.prototype.ngOnInit = function () { };
    NotFoundComponent.prototype.goToHomePage = function () {
        var route = this.roleService.checkRoutes();
        this._router.navigate([route]);
    };
    NotFoundComponent = __decorate([
        Component({
            selector: 'app-not-found',
            templateUrl: './not-found.component.html',
            styleUrls: ['./not-found.component.css']
        })
    ], NotFoundComponent);
    return NotFoundComponent;
}());
export { NotFoundComponent };
//# sourceMappingURL=not-found.component.js.map