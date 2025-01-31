import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../Services/category.service';
import { ICategory } from '../../Interfaces/icategory';
import { ProductService } from '../../Services/product.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {

  categories!:ICategory[]
  filesImage: any[] = []

  testimonialImage:string []=[
    'Screenshot 2025-01-11 031838.png',
    'Screenshot 2025-01-11 031857.png',
    'Screenshot 2025-01-11 031910.png',
    'Screenshot 2025-01-11 031923.png',
  ]
  formProduct:FormGroup =new FormGroup({
    nameAr: new FormControl(null, [Validators.required, Validators.pattern(/^[\u0600-\u06FF\s]+$/)]),
    nameEn: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]),
    descAr: new FormControl(null, [Validators.required]),
    descEn: new FormControl(null, [Validators.required]),
    detailAr: new FormControl(null, [Validators.required]),
    detailEn: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required, Validators.pattern(/^\d+$/)]),
    oldPrice: new FormControl(null, [Validators.required, Validators.pattern(/^\d+$/)]),
    discount: new FormControl(null, [Validators.required, Validators.pattern(/^\d+$/)]),
    categoryId: new FormControl(null, [Validators.required]),
    isOffer: new FormControl(false, [Validators.required]),
    showHome: new FormControl(false, [Validators.required]),
    files: new FormControl([], [Validators.required]),
  });

  constructor(private _categoryService:CategoryService , private _productService:ProductService) { }
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
  changeFile(event: any) {

  const files = event.target.files;
  const updatedFiles = [...this.formProduct.get('files')?.value];
  for (let i = 0; i < files.length; i++) {
    updatedFiles.push(files[i]);
    this.filesImage.push({
      file: files[i],
      url: URL.createObjectURL(files[i])
    });
  }
  this.formProduct.patchValue({ files: updatedFiles });
  console.log(this.filesImage);
  }

  removeImage(image: any) {
    const index = this.filesImage.indexOf(image);
  if (index !== -1) {
    URL.revokeObjectURL(this.filesImage[index].url);  // إلغاء URL عند إزالة الصورة
    this.filesImage.splice(index, 1);
    const updatedFiles = this.formProduct.get('files')?.value.filter((file: any) => file !== image.file);
    this.formProduct.patchValue({
      files: updatedFiles  // تحديث الحقل في النموذج
    });
  }
  }
  addProduct() {
    console.log(this.formProduct);
    // if(this.formProduct.valid) {
      this._productService.addProduct(this.formProduct.value).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (err) => {
          console.log(err);
        },
      })
    // }
  }
  /* removeImage(image:any) {
    this.filesImage = this.filesImage.filter(file => file !== image)
   }*/
}
