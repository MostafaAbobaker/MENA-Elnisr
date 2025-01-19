import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsManagementComponent } from './Components/products-management/products-management.component';
import { GovernoratesComponent } from './Components/governorates/governorates.component';
import { CategoryComponent } from './Components/category/category.component';

const routes: Routes = [
  {path: '', redirectTo:'products-management', pathMatch:'full' },
  {path: 'products-management', component:ProductsManagementComponent},
  {path: 'governorates', component:GovernoratesComponent},
  {path: 'category', component:CategoryComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsManagementRoutingModule { }
