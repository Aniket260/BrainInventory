import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BrainService } from './brain.service';
var TokenInterceptorService = /** @class */ (function () {
    function TokenInterceptorService(injector) {
        this.injector = injector;
    }
    TokenInterceptorService.prototype.intercept = function (req, next) {
        var serviceFarm = this.injector.get(BrainService);
        var tokenizedReq = req.clone({
            setHeaders: {
                Authorization: "" + serviceFarm.getToken() // Read token
            }
        });
        return next.handle(tokenizedReq);
    };
    TokenInterceptorService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], TokenInterceptorService);
    return TokenInterceptorService;
}());
export { TokenInterceptorService };
// complete
//# sourceMappingURL=token-interceptor.service.js.map