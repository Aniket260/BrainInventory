import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundComponent } from './not-found.component';
import { MaterialModule } from '../material/material';
// import { SidebarComponent } from './components/sidebar/sidebar.component';
// import { HeaderComponent } from './components/header/header.component';
var NotFoundModule = /** @class */ (function () {
    function NotFoundModule() {
    }
    NotFoundModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                NotFoundRoutingModule,
                MaterialModule,
                FormsModule
            ],
            declarations: [NotFoundComponent]
        })
    ], NotFoundModule);
    return NotFoundModule;
}());
export { NotFoundModule };
//# sourceMappingURL=not-found.module.js.map