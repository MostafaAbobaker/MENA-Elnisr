import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../Services/category.service';
import { ICategory } from '../../Interfaces/icategory';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {

  categories!:ICategory[]
  filesImage:string []=[
    '1680402563605-cover.jpeg',
    '1680402563675-1.jpeg',
    '1680403266805-1.jpeg',
    '1680403266806-3.jpeg',
  ]
  testimonialImage:string []=[
    'Screenshot 2025-01-11 031838.png',
    'Screenshot 2025-01-11 031857.png',
    'Screenshot 2025-01-11 031910.png',
    'Screenshot 2025-01-11 031923.png',
  ]
  formProduct:FormGroup =new FormGroup({
    nameAr: new FormControl(null, [Validators.required, Validators.pattern(/^[\u0600-\u06FF\s]+$/)]),
    nameEn: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]),
    descriptionAr: new FormControl(null, [Validators.required]),
    descriptionEn: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required, Validators.pattern(/^\d+$/)]),
    oldPrice: new FormControl(null, [Validators.required, Validators.pattern(/^\d+$/)]),
    discount: new FormControl(null, [Validators.required, Validators.pattern(/^\d+$/)]),
    category: new FormControl(null, [Validators.required]),
    brand: new FormControl(null, [Validators.required]),
    features: new FormControl(null, [Validators.required]),
    imageForm: new FormControl(null, [Validators.required]),
  });

  constructor(private _categoryService:CategoryService) { }
  ngOnInit(): void {
    this.showCategory()
  }
  showCategory() {
    this._categoryService.getCategories().subscribe({
      next: (response) => {
        console.log(response);
        this.categories = response.data;
        console.log(response.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  changeFile(event:any){
  }
  addProduct() {
    console.log(this.formProduct);
  }
  removeImage(image:any) {
    this.filesImage = this.filesImage.filter(file => file !== image)
  }
}
