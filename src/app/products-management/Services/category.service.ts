import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../Interfaces/icategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http:HttpClient) { }

  getCategories(): Observable<any> {
    return this._http.get('http://elnisr.webxy.net/api/Category/GetAllCategories');
  }

  addCategories(category:ICategory , fileName:string): Observable<any> {
    return this._http.post('http://elnisr.webxy.net/api/Category/GetAllCategories',
      {
        nameAr:category.nameAr,
        nameEn:category.nameEn,
        file: fileName,
      }
    )
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
