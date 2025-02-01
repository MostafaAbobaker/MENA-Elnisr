import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../Interfaces/icategory';
import { CategoryService } from '../../Services/category.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
// import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  textSearch: string = '';
  isAdd: boolean = false;
  buttonEdit: boolean = false;
  getCategory: ICategory[] = [];
  selectedCategory: any = null; // Add this line
  imageP: File | null = null;
  uploadSuccess: boolean = false;
  formCategory: FormGroup;

  fileUploadForm: any;

  constructor(
    private _categoryService: CategoryService,
    private fb: FormBuilder
  ) 
  {
    this.formCategory = this.fb.group({
      id: new FormControl(null),
      nameAr: new FormControl(null, [Validators.required, Validators.pattern(/^[\u0600-\u06FF\s]+$/)]),
      nameEn: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]),
        file: new FormControl(null),
    });
  }

  onFileSelected(file: File): void {
    this.imageP = file;
    this.formCategory.patchValue({ file: file });
  }
  ngOnInit(): void {
    this.showCategory();
  }

  showCategory() {
    this._categoryService.getCategories().subscribe({
      next: (response) => {
        console.log(response);
        this.getCategory = response.data;
        console.log(response.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addCategory(): void {
     this.formCategory.value.file = this.imageP;
 

    let nameEn: string = this.formCategory.value.nameEn.toLocaleLowerCase().trim()
    let catListNameEn = this.getCategory.some(gov => gov.nameEn.toLocaleLowerCase() === nameEn.toLocaleLowerCase())

    debugger
    if(this.formCategory.valid) {

        if(this.selectedCategory) {

          this._categoryService.updateCategory(this.formCategory.value).subscribe({
            next: (response) => {
              console.log(response);
              this.showCategory();
              this.isAdd = false;
              this.buttonEdit = false;
              this.formCategory.reset();
              this.selectedCategory = null;
            },
            error: (err) => {
              console.log(err);
              alert(`This Category is already exist ${err.message}`  )
            },
          });

        } else {
          if(!catListNameEn) {
            this._categoryService.AddCategory(this.formCategory.value).subscribe({
              next: (response) => {
                console.log(response);
                this.showCategory();
                this.isAdd = false;
                this.buttonEdit = false;
                this.formCategory.reset();
              },
              error: (err) => {
                console.log(err);
              },
            });
          } else {
            alert('This Category is already exist')
          }
        }
    }


  }

  editCategory(category: ICategory) {
    this.isAdd = true;
    this.buttonEdit = true;
    this.selectedCategory = category;
    this.formCategory.patchValue(category)
    window.scrollTo(0, 0);
  }
  deleteCategory(id: number) {
    this._categoryService.deleteCategory(id).subscribe({
      next: (response) => {
        console.log(response);
        this.showCategory();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
