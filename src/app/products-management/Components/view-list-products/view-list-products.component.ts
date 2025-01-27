import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { IProduct } from '../../Interfaces/iproduct';

@Component({
  selector: 'app-view-list-products',
  templateUrl: './view-list-products.component.html',
  styleUrls: ['./view-list-products.component.scss']
})
export class ViewListProductsComponent implements OnInit {
  textSearch:string =''
  productsList:IProduct[] = [];
  constructor(private _productService:ProductService) {}
  ngOnInit(): void {
    this.showProduct();
  }
  showProduct() {
    debugger
    this._productService.getProducts().subscribe({
      next:(response)=>{
        this.productsList = response.data;
        console.log( this.productsList);
      },
      error:(err)=>{ console.log(err);
      },
    });
  }
  editProduct(product:IProduct){
    console.log(product);
  }
  deleteProduct(id:string){
    console.log(id);
  }
}
