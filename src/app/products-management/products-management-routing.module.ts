import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsManagementComponent } from './Components/products-management/products-management.component';
import { GovernoratesComponent } from './Components/governorates/governorates.component';
import { CategoryComponent } from './Components/category/category.component';
import { ViewListProductsComponent } from './Components/view-list-products/view-list-products.component';
import { AddProductsComponent } from './Components/add-products/add-products.component';
import { authGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo:'products-management', pathMatch:'full' },
  {path: 'products-management',canActivate:[authGuard], component:ProductsManagementComponent},
  {path: 'governorates',canActivate:[authGuard], component:GovernoratesComponent},
  {path: 'category',canActivate:[authGuard], component:CategoryComponent},
  {path: 'view-products',canActivate:[authGuard], component:ViewListProductsComponent},
  {path: 'add-products',canActivate:[authGuard], component:AddProductsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsManagementRoutingModule { }
