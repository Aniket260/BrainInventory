import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found.component';
var routes = [
    {
        path: '',
        component: NotFoundComponent
    }
];
var NotFoundRoutingModule = /** @class */ (function () {
    function NotFoundRoutingModule() {
    }
    NotFoundRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], NotFoundRoutingModule);
    return NotFoundRoutingModule;
}());
export { NotFoundRoutingModule };
//# sourceMappingURL=not-found-routing.module.js.map