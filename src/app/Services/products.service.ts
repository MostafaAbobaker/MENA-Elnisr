import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http:HttpClient) { }

  getCategories():Observable<any>{
    return this._http.get('https://ecommerce.routemisr.com/api/v1/categories')
  }

  getProducts():Observable<any> {
    return this._http.get('https://ecommerce.routemisr.com/api/v1/products');
  }
  getProductDetails(id:string):Observable<any> {
    return this._http.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }

  getGovernorates(): Observable<any> {
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
       return this._http.get('http://elnisr.webxy.net/api/Governorates/GetAll', { headers: headers });
    }
}
