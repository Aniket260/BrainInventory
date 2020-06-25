import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
var LoaderService = /** @class */ (function () {
    function LoaderService() {
        this.isLoading = new Subject();
    }
    LoaderService.prototype.show = function () {
        this.isLoading.next(true);
    };
    LoaderService.prototype.hide = function () {
        this.isLoading.next(false);
    };
    LoaderService = __decorate([
        Injectable()
    ], LoaderService);
    return LoaderService;
}());
export { LoaderService };
//# sourceMappingURL=loader.service.js.map