import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from 'src/app/Services/products.service';
import { IProduct } from '../../Interfaces/iproduct';

@Component({
  selector: 'app-more-products',
  templateUrl: './more-products.component.html',
  styleUrls: ['./more-products.component.scss']
})
export class MoreProductsComponent implements OnInit {
  products!:IProduct  []
  constructor(private _productsService:ProductsService) { }
  ngOnInit(): void {
    this._productsService.getProducts().subscribe({
      next: (response) => {
        this.products = response.data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  customOptions: OwlOptions = {
    rtl: true,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    margin: 15,

    navText: ['<i class="fa-solid fa-angle-right"></i>', ' <i class="fa-solid fa-angle-left"></i>'],

    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    nav: true
  }
}
