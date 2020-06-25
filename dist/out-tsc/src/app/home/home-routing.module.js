import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ChatComponent } from './chat/chat.component';
import { UserComponent } from './user/user.component';
var routes = [
    { path: '', component: HomeComponent,
        children: [
            { path: '', redirectTo: 'user', pathMatch: 'prefix' },
            { path: 'user', component: UserComponent },
            { path: 'chat', component: ChatComponent }
        ]
    },
];
var HomeRoutingModule = /** @class */ (function () {
    function HomeRoutingModule() {
    }
    HomeRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], HomeRoutingModule);
    return HomeRoutingModule;
}());
export { HomeRoutingModule };
//# sourceMappingURL=home-routing.module.js.map