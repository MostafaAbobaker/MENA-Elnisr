import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../Interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http:HttpClient) { }

  getProducts() : Observable<any> {
    return this._http.get('http://elnisr.webxy.net/api/Product/GetAll');
  }

  addProduct(product: IProduct) :Observable<any>{
    return this._http.post('http://elnisr.webxy.net/api/Product/Add', product);
  }

}
