import { Component } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { IProduct } from 'src/app/Interfaces/iproduct';

@Component({
  selector: 'app-view-list-products',
  templateUrl: './view-list-products.component.html',
  styleUrls: ['./view-list-products.component.scss']
})
export class ViewListProductsComponent {
  textSearch:string =''
  productsList:IProduct[] =[]
  constructor(private _productService:ProductService) {}
  showProduct() {
    this._productService.getProducts().subscribe({
      next: (products) => {
        console.log(products);
        this.productsList = products;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
