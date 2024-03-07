import { CommonModule, NgIf, NgSwitch, NgSwitchCase, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    TitleCasePipe,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName: string = '';
  userName : string = '' ;
  searchResult : undefined | Product[]
  cartItems = 0 ;

  constructor(private route: Router, private product: ProductService) {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          //console.log("in Seller area")
          this.menuType = 'seller';
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }
        }
        else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore)
          this.userName = userData.name ;
          this.menuType = 'user';
          this.product.getCartList(userData.id)
        }
         else {
          // console.log("Outside Seller")
          this.menuType = 'default';
        }
      }
    });

    let cartData = localStorage.getItem('localCart')
    if(cartData){
      this.cartItems = JSON.parse(cartData).length
    }
    this.product.cartData.subscribe((items)=>{
      this.cartItems = items.length
    })
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth'])
    this.product.cartData.emit([])
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      console.log(element.value);
      this.product.searchProduct(element.value).subscribe((result) => {
        console.log(result);
        this.searchResult = result
      });
    }
  }
}
