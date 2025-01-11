import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/Interfaces/iproduct';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-shipping-details',
  templateUrl: './shipping-details.component.html',
  styleUrls: ['./shipping-details.component.scss']
})
export class ShippingDetailsComponent implements OnInit {
  productUrl:any;
  productDetails?: IProduct;
  errorMassage:string='';

  constructor(private _activatedRoute:ActivatedRoute , private _productsService: ProductsService) {}
  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params) => {
      this.productUrl = params.get('id');

      if (this.productUrl != null) {
        this._productsService.getProductDetails(this.productUrl).subscribe({
          next: (result) => {
            this.productDetails = result.data;
          },
          error: (err) => {
            this.errorMassage = err.error.message;
          },
        });
      }
    });
  }

  shippingDetails:FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required,Validators.pattern(/^01[0125][0-9]{8}/)]),
    phoneContact: new FormControl(null, [Validators.pattern(/^01[0125][0-9]{8}/)]),
    conservatism: new FormControl(null, [Validators.required]),
    address: new FormControl(null, [Validators.required]),
    comments: new FormControl(null ),

  });
  shippingForm() {
    console.log(this.shippingDetails);

  }
}
