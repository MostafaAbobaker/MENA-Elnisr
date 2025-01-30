import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url:string="";
  constructor(private _http:HttpClient) { }

  getOrders() :Observable<any> {
    this.url =environment.baseApi;
    return this._http.get(environment.baseApi+ 'Order/GetAll')
  }
}
