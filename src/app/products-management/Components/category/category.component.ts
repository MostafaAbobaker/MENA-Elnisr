import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../Interfaces/icategory';
import { CategoryService } from '../../Services/category.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit{
  categories: ICategory[] = [];
  isAdd: boolean = false;
  buttonEdit: boolean = false;
  fileImage: any;
  categoryForm: any;
  constructor(private _categoryService:CategoryService) {
    this.categoryForm = new FormGroup({
      nameAr: new FormControl(''),
      nameEn: new FormControl(''),
      file: new FormControl('' ),
    })
  }


  ngOnInit(): void {
    this.showCategories()
  }
  showCategories() {
    this._categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  changeFile(event: any) {
    console.log(event.target.files);

    this.fileImage = event.target.files[0];

    this.categoryForm.patchValue({ file: this.fileImage });
  }
  addCategory() {
    console.log(this.categoryForm);
    console.log(this.categoryForm.value);
    const categoryData: ICategory = {
      nameAr: this.categoryForm.get('nameAr')?.value,
      nameEn: this.categoryForm.get('nameEn')?.value,
      file: this.categoryForm.get('file')?.value
    };
      this._categoryService.addCategories(this.categoryForm).subscribe({
        next: (data) => {
          this.showCategories();
          console.log(data);

        },
        error: (err) => {
          console.log(err);
        }
      })

  }
  editCategory(category:ICategory) {
    /* this.categoryForm.setValue({
      nameAr: category.nameAr,
      nameEn: category.nameEn,
      file: category.imagePath
    }) */
  }
  deleteCategory(id:number) {
    /* this._categoryService.deleteCategory(id).subscribe({
      next: (data) => {
        this.showCategories();
      },
      error: (err) => {
        console.log(err);
      }
    }) */
  }
}
