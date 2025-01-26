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

  imageP: File | null = null;
  uploadSuccess: boolean = false;
  formCategory: FormGroup;

  fileUploadForm: any;

  constructor(
    private _categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    this.formCategory = this.fb.group({
      id: new FormControl(null),
      nameAr: new FormControl(null, [Validators.required]),
      nameEn: new FormControl(null, [Validators.required]),
      imagepath: new FormControl(null),
    });
  }

  onFileSelected(file: File): void {
    this.imageP = file;
    this.formCategory.patchValue({ imagepath: file });
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
    console.log('imageP', this.imageP);
    this.formCategory.value.imagepath = this.imageP;
    console.log('formCategory', this.formCategory.value);

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
  }

  editCategory(category: ICategory) {}
  deleteCategory(id: number) {}
}
