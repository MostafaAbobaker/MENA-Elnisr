import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/Interfaces/iproduct';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  productUrl:string |null  = null
  errorMassage!:string
  productDetails ?:IProduct
  inputQuantity: number = 1
  addFavorite: boolean = false

  constructor(private _productsService:ProductsService , private _activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params => {
      this.productUrl = params.get('id')
    });
    if(this.productUrl != null) {
      this._productsService.getProductDetails(this.productUrl).subscribe({
        next:(result) => {
          this.productDetails = result.data
          console.log(result)

        },
        error:(err) => {
          this.errorMassage = err.error.message

        }
      })
    }

  }
}
