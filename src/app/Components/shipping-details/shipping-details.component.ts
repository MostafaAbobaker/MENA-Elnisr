import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/Interfaces/iproduct';
import { GovernoratesService } from 'src/app/Services/governorates.service';
import { OrderService } from 'src/app/Services/order.service';
import { ProductsService } from 'src/app/Services/products.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-shipping-details',
  templateUrl: './shipping-details.component.html',
  styleUrls: ['./shipping-details.component.scss'],
  providers: [MessageService]
})
export class ShippingDetailsComponent implements OnInit {
  productUrl:any;
  productDetails?: IProduct;
  errorMassage:string='';
  governorates: any[] = [];
  selectGovernorates!: any

  totalOrderPriceForm = this.productDetails?.price + this.selectGovernorates?.deliverdFees;
  constructor(
    private _activatedRoute:ActivatedRoute ,
     private _productsService: ProductsService,
      private _governoratesService:GovernoratesService,
    private _orderService:OrderService,
    private messageService: MessageService
  ) {}
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
    this.showGovernorates();
  }

  shippingDetails:FormGroup = new FormGroup({
    clientName: new FormControl(null, [Validators.required]),
    address: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required,Validators.pattern(/^01[0125][0-9]{8}/)]),
    whatsApp: new FormControl(null, [Validators.required,Validators.pattern(/^01[0125][0-9]{8}/)]),
    productId: new FormControl(null),
    governorateId: new FormControl(null, [Validators.required]),
    orderStatus: new FormControl(2, [Validators.required]),
    totalOrderPrice: new FormControl(null),
    notes: new FormControl(null),
  });
  shippingForm() {
    this.shippingDetails.patchValue({
      productId: this.productDetails?._id,
      totalOrderPrice: this.productDetails?.price + this.selectGovernorates.deliverdFees
    });
    console.log(this.shippingDetails.value);
    this._orderService.addOrder(this.shippingDetails.value).subscribe({
      next: (response) => {
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'تنبيه', detail: 'تم التعديل بنجاح   ' });

      },
      error: (err) => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'تنبيه', detail: err.message });

      },
    });
  }
  showGovernorates() {
    this._governoratesService.getGovernorates().subscribe({
      next: (response) => {
        console.log(response);
        this.governorates = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  optionGovernorates(options:any) {
    let optionsValue = (options.target as HTMLInputElement).value;
    console.log(optionsValue);
    this.selectGovernorates = this.governorates.find((gov) => gov.id == optionsValue);
    console.log(this.selectGovernorates);

  }
}
