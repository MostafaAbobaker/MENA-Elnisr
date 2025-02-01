import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../Services/category.service';
import { ICategory } from '../../Interfaces/icategory';
import { ProductService } from '../../Services/product.service';

 

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {
  base_URL: string = 'http://elnisr.webxy.net/api/';

   formProduct: FormGroup;
   imageP: any[] = [];
   images: any[] = [];  // to store the selected images


  categories!:ICategory[]
 


  constructor(private _categoryService:CategoryService, private _product:ProductService,  private fb: FormBuilder) {
    this.formProduct = this.fb.group({
      nameAr: new FormControl(null, [Validators.required, Validators.pattern(/^[\u0600-\u06FF\s]+$/)]),
      nameEn: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]),
      descAr: new FormControl(null, [Validators.required]),
      descEn: new FormControl(null),
      detailAr: new FormControl(null, [Validators.required]),
      detailEn: new FormControl(null ),
      price: new FormControl(null, [Validators.required, Validators.pattern(/^\d+$/)]),
      oldPrice: new FormControl(null, [Validators.required, Validators.pattern(/^\d+$/)]),
    //  discount: new FormControl(null, [Validators.required, Validators.pattern(/^\d+$/)]),
      categoryId: new FormControl(null, [Validators.required]),
 id:new FormControl(null),
 videoUrl:new FormControl(null),

    //  brand: new FormControl(null, [Validators.required]),
       showHome: new FormControl(null ),
      isOffer: new FormControl(null),
 
      images: new FormControl([])  // initialize images control to hold file list
     
    });

   }
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
    const formData = new FormData();

    formData.append('nameAr', this.formProduct.value.nameAr);
formData.append('nameEn', this.formProduct.value.nameEn);
formData.append('descAr', this.formProduct.value.descAr);
formData.append('descEn', this.formProduct.value.descEn);
formData.append('detailAr', this.formProduct.value.detailAr);
formData.append('detailEn', this.formProduct.value.detailEn);
formData.append('price', this.formProduct.value.price );
formData.append('oldPrice', this.formProduct.value.oldPrice );
formData.append('categoryId', this.formProduct.value.categoryId );
formData.append('isOffer', this.formProduct.value.isOffer);
formData.append('showHome', this.formProduct.value.showHome );
formData.append('videoUrl', this.formProduct.value.videoUrl );

formData.append('id', '0' );
 
    this.images.forEach(image => {
      formData.append('images', image.file, image.file.name);  // append each image to FormData
    });

   
    this.formProduct.patchValue({ id : 0 });
    this._product.addProduct(formData).subscribe({
      next: (response) => {
        console.log(response);
        
      },
      error: (err) => {
        console.log(err);
        
      },
    });
  }
  removeImage(image:any) {
   // this.filesImage = this.filesImage.filter(file => file !== image)
  }
   
  
  onFileChange(event: any): void {
    console.log(event)
    const files = event.target.files;
    if (files) {
      // Iterate through the files and add them to the images array
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = () => {
          this.images.push({
            file: file,
            previewUrl: reader.result
          });
        };
        reader.readAsDataURL(file);  // read the file to preview
      }
    }
  }

}
