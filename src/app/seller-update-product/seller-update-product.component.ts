import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css',
})
export class SellerUpdateProductComponent implements OnInit {

  productData : undefined | Product
  productMessage : undefined | string

  constructor(private route : ActivatedRoute , private product : ProductService , private _router : Router){

  }

  ngOnInit() {
    let productId = this.route.snapshot.paramMap.get('id')
    // console.log(productId)
    productId && this.product.getProduct(productId).subscribe((data)=>{
      // console.log(data)
      this.productData = data;
    })
  }

  submit(data : any){
    // console.log(data)
    if(this.productData){
      data.id = this.productData.id
    }
    this.product.updateProduct(data).subscribe((result)=>{
      if(result){
        this.productMessage = "Product Update SuccessFully"
      }
    })
    setTimeout(()=>{
      this.productMessage = undefined
      this._router.navigate(['seller-home'])
    },1000)
  }
}
