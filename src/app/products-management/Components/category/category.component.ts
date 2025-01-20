import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../Interfaces/icategory';
import { CategoryService } from '../../Services/category.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit{
  categories:ICategory[] = [];
  isAdd:boolean = false
  buttonEdit:boolean = false
  fileImage:string =''
  formCategory:FormGroup = new FormGroup({
    nameAr: new FormControl(null, [Validators.required, Validators.pattern(/^[\u0600-\u06FF\s]+$/)]),
    nameEn: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]),
    descEn:new FormControl(null),
    descAr:new FormControl(null),
    categoryImage: new FormControl(null),
    imageForm: new FormControl(null, [Validators.required])
  })

  constructor(private _categoryService:CategoryService ){}
  ngOnInit(): void {
    this.showCategory()
  }

  showCategory() {
    this._categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
      },
      error: (error) => {
        console.log('Error =>', error);
      }
    });
  }

  changeFile(event:any){
    this.fileImage = event.target.files[0].name;

  }

  addCategory(){
    console.log(this.formCategory);
    if(this.formCategory.valid) {
      this._categoryService.addCategories(this.formCategory.value , this.fileImage).subscribe({
        next: (response) => {
          console.log(response);
          this.showCategory();
          this.fileImage= '';
          this.formCategory.reset();
       },
        error: (error) => {
          console.log('Error =>', error);
       }
      })

    }

  }
}
