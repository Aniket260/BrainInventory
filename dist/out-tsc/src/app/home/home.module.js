import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { UserComponent } from './user/user.component';
import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home.component';
var HomeModule = /** @class */ (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        NgModule({
            declarations: [UserComponent, ChatComponent, HomeComponent],
            imports: [
                CommonModule,
                HomeRoutingModule
            ]
        })
    ], HomeModule);
    return HomeModule;
}());
export { HomeModule };
//# sourceMappingURL=home.module.js.map