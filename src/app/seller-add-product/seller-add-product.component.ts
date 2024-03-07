import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css',
})
export class SellerAddProductComponent {
  addProductMessage: string | undefined;

  constructor(private product: ProductService, private _router: Router) {}

  submitProduct(data: Product) {
    console.log(data);
    this.product.addProduct(data).subscribe((result) => {
      console.log(result);
      if (result) {
        this.addProductMessage = 'Product is Successfully Added';
      }
      setTimeout(() => {
        this.addProductMessage = undefined;
        this._router.navigate(['seller-home']);
      }, 3000);
    });
  }
}
