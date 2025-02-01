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

  addProduct(product: any) :Observable<any>{

    console.log(product);

    // Append the id

 
    return this._http.post('https://localhost:7156/api/Product/AddProduct', product);

    
  }
   
}
