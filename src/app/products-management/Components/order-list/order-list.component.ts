import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  ordersList:any[] = []
  textSearch:string = '';
  constructor(private _orderService:OrderService) { }
  ngOnInit(): void {
    this._orderService.getOrders().subscribe({
      next: (response) => {
        console.log(response);
        this.ordersList = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    })
  }
  viewOrder(id:number) {
    console.log(id);
  }
  editOrder(order:any) {
    console.log(order);
  }
  deleteOrder(id:number) {
    console.log(id);
  }
}
