import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../Interfaces/icategory';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  base_URL: string = 'http://elnisr.webxy.net/api/';
  constructor(private _http:HttpClient) { }

  getCategories(): Observable<any> {
    return this._http.get( this.base_URL + 'Category/GetAllCategories');
  }

  /* AddCategory(category:ICategory ): Observable<any> {
    return this._http.post('http://elnisr.webxy.net/api/Category/AddCategory',
      {
        nameAr:category.nameAr,
        nameEn:category.nameEn,
        imagepath: category.image
      }
    )
  } */


  AddCategory(category:ICategory) : Observable<any> {

    const formData = new FormData();
            // Append the id
    formData.append('nameAr', category.nameAr);
    formData.append('nameEn', category.nameEn);
    formData.append('file', category.file); // File can be null

    console.log('goformDatav',formData)
    return this._http.post(this.base_URL+'Category/AddCategory', formData)

  }




  updateCategory(category:ICategory  ) : Observable<any> {
    const formData = new FormData();

    formData.append('id', category.id.toString());
    formData.append('nameAr', category.nameAr);
    formData.append('nameEn', category.nameEn);
    formData.append('file', category.file); // File can be null

    console.log('goformDatav',formData)

      return this._http.put(this.base_URL+'Category/UpdateCategory', formData)
    }

  deleteCategory(id:number) : Observable<any> {
    return this._http.delete(`http://elnisr.webxy.net/api/Category/DeleteCategory/${id}`)
  }
}
