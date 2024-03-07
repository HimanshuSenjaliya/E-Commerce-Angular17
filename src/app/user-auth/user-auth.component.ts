
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cart, Login, Product, SignUp } from '../data-type';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [FormsModule , CommonModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {

  showLogin : boolean = true;
  authError:string = '';
  
  constructor(private user : UserService , private product:ProductService){
    this.user.userAuthReload()
  }

  signUp(data : SignUp){
    // console.log(data)
    this.user.userSignUp(data)
  }

  login(data : Login){
    // console.log(data)
    this.user.userLogin(data)
    this.user.invalidUserAuth.subscribe((result)=>{
      console.log(result)
      if(result){
        this.authError = "User Not Found"
      }else{
        this.localCartToRemoteCart()
      }
    })
  }

  openLogin(){
    this.showLogin = true
  }
  openSignUp(){
    this.showLogin = false
  }

  localCartToRemoteCart(){
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id ;
    if(data){
      let cartDataList : Product[] = JSON.parse(data)
      
      cartDataList.forEach((product:Product, index)=>{
        let cartData:Cart = {
          ...product ,
          productId : product.id ,
          userId
        }
        delete cartData.id
        setTimeout(()=>{
          this.product.addToCart(cartData).subscribe((result)=>{
            if(result){
              console.log("Data is stored in DB")
            }
          })
        },500)
        if(cartDataList.length === index+1){
          localStorage.removeItem('localCart')
        }
      })
    }
    setTimeout(()=>{
      this.product.getCartList(userId)
    },2000)
    
  }

}
