import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrder } from '../products-management/Interfaces/iorder';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http:HttpClient) { }
  addOrder(order: IOrder) {
    return this._http.post(environment.baseApi + 'Order/AddOrder', order);
  }

}
