import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
import { finalize } from "rxjs/operators";
var LoaderInterceptor = /** @class */ (function () {
    function LoaderInterceptor(loaderService) {
        this.loaderService = loaderService;
    }
    LoaderInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        this.loaderService.show();
        return next.handle(req).pipe(finalize(function () { return _this.loaderService.hide(); }));
    };
    LoaderInterceptor = __decorate([
        Injectable()
    ], LoaderInterceptor);
    return LoaderInterceptor;
}());
export { LoaderInterceptor };
//# sourceMappingURL=loader.interceptor.js.map