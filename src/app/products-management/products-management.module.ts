import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsManagementRoutingModule } from './products-management-routing.module';
import { AddProductsComponent } from './Components/add-products/add-products.component';
import { ProductsManagementComponent } from './Components/products-management/products-management.component';
import { CategoryComponent } from './Components/category/category.component';
import { GovernoratesComponent } from './Components/governorates/governorates.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { FilterPipe } from './Pipes/filter.pipe';
import { ViewListProductsComponent } from './Components/view-list-products/view-list-products.component';
import { TableModule } from 'primeng/table';
import { LoginComponent } from './Components/login/login.component';

@NgModule({
  declarations: [
    AddProductsComponent,
    ProductsManagementComponent,
    CategoryComponent,
    GovernoratesComponent,
    FilterPipe,
    ViewListProductsComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ProductsManagementRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastModule,
    TableModule
  ]
})
export class ProductsManagementModule { }
