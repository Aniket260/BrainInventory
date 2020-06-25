import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';


const routes: Routes = [
  { path: '', component: HomeComponent,
  children: [
    { path: '', redirectTo: 'product', pathMatch: 'prefix' },
    { path: 'product', component: ProductListComponent},
    { path: 'productform', component: ProductFormComponent }
  ]
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
