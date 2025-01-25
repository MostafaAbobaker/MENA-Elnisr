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

  categories:ICategory[] = [];

  isAdd:boolean = false
  buttonEdit:boolean = false
  fileImage:string =''
  selectedCategory: any = null; // Add this line



  formCategory:FormGroup = new FormGroup({
    nameAr: new FormControl(null, [Validators.required, Validators.pattern(/^[\u0600-\u06FF\s]+$/)]),
    nameEn: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]),
    descEn:new FormControl(null),
    descAr:new FormControl(null),
    categoryImage: new FormControl(null),
    imageForm: new FormControl(null, [Validators.required])
  })

  constructor(private _categoryService:CategoryService,
    // private messageService: MessageService  // Add this line if you want to use MessageService Toast
   ){}
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
    let nameEn: string = this.formCategory.value.nameEn.toLocaleLowerCase().trim()
    let categoryNameEn = this.categories.some(Category => Category.nameEn.toLocaleLowerCase() === nameEn.toLocaleLowerCase())

    /* if(this.formCategory.valid) {
      if(this.selectedCategory){
        this._categoryService.updateCategory(this.selectedCategory.id, this.formCategory.value,this.fileImage).subscribe({
          next: (response) => {
            console.log(response);
            this.showCategory();
            this.isAdd = false;
            this.buttonEdit = false;
            this.formCategory.reset();
            this.selectedCategory = null;

          },
          error: (error) => {
            console.log('Error =>', error);

          }
        })
      } else {

      }


    } */
      if(!categoryNameEn) {
        this._categoryService.addCategories(this.formCategory.value , this.fileImage).subscribe({
          next: (response) => {
            console.log(response);
            this.showCategory();
            this.fileImage= '';
            this.formCategory.reset();
/*             this.messageService.add({ severity: 'success', summary: 'تنبيه', detail: 'تم الاضافة بنجاح   ' });
 */
        },
          error: (error) => {
            console.log('Error =>', error);
/*             this.messageService.add({ severity: 'info', summary: 'تنبيه', detail: `${error.message}` });
 */
        }
        })
      }
  }

    editCategory(Category: ICategory): void {
      this.isAdd = true;
      this.buttonEdit = true;
      this.selectedCategory = Category;
      this.formCategory.patchValue(Category)
      window.scrollTo(0, 0);

    }

    deleteCategory(id: number) {
      this._categoryService.deleteCategory(id).subscribe({
        next: (response) => {
          console.log(response);
          this.showCategory();
/*           this.messageService.add({ severity: 'info', summary: 'تنبيه', detail: 'تم الحذف   ' });
 */
        },
        error: (err) => {
          console.log(err);
/*           this.messageService.add({ severity: 'info', summary: 'تنبيه', detail: err.message });
 */
        },
      });
    }

}
