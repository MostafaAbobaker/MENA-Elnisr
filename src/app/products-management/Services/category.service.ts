import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../Interfaces/icategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
   base_URL: string = 'http://elnisr.webxy.net/api/';
  constructor(private _http:HttpClient) { }

  getCategories(): Observable<any> {
    return this._http.get('http://elnisr.webxy.net/api/Category/GetAllCategories');
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
    formData.append('imagepath', category.imagepath); // File can be null

    console.log('goformDatav',formData)
    return this._http.post(this.base_URL+'Category/AddCategory', formData)

  }




  updateCategory(id :number,category:ICategory , fileName:string ) : Observable<any> {
      return this._http.put('http://elnisr.webxy.net/api/Category/UpdateCategory',
        {
          id: id,
          nameAr:category.nameAr,
          nameEn:category.nameEn,
          file: fileName,
        })
    }

  deleteCategory(id:number) : Observable<any> {
    return this._http.delete(`http://elnisr.webxy.net/api/Category/DeleteCategory/${id}`)
  }
}
