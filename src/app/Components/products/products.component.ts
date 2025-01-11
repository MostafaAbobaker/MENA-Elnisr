import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/Interfaces/iproduct';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

productsItems?:IProduct[]

constructor(public _ProductsService: ProductsService) { }


ngOnInit(): void {
  this._ProductsService.getProducts().subscribe({
    next:(response)=>{
      this.productsItems = response.data;
      console.log( this.productsItems);
    },
    error:(err)=>{ console.log(err);
    },
  });

  }
}
