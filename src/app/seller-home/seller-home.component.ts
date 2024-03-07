import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import {faTrash , faEdit} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [FormsModule, NgFor , FontAwesomeModule , RouterModule],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css',
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | Product[];
  productMessage: undefined | string;
  icon = faTrash;
  iconEdit = faEdit

  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.list()
  }

  deleteProduct(id: number) {
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product is deleted SuccessFully!!';
      }
      this.list()
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }

  list() {
    this.product.productList().subscribe((result) => {
      // console.log(result)
      if (result) {
        this.productList = result;
      }
    });
  }
}
