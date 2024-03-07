import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Order } from '../data-type';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {

  orderData : Order[] | undefined

  constructor(private product : ProductService){
    this.getOrderList()
  }

  cancelOrder(orderId : number|undefined){
    orderId && this.product.cancelOrder(orderId).subscribe((result)=>{
      if(result){
        this.getOrderList()
      }
    })
  }

  getOrderList(){
    this.product.orderList().subscribe((result)=>{
      this.orderData = result
    })
  }

}
