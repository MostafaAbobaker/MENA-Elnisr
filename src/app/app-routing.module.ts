import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { ProductsComponent } from './Components/products/products.component';
import { NotFound404Component } from './shared/Components/not-found404/not-found404.component';

const routes: Routes = [
  { path: '',redirectTo:'home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  { path: 'Products', component:ProductsComponent},
  { path: 'Product/:id', component:ProductDetailsComponent},
  { path: '**', component:NotFound404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
