import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { HttpClientModule } from '@angular/common/http';
import {Router} from '@angular/router'
import { Login, SignUp } from '../data-type';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [FormsModule , HttpClientModule , NgIf],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent {

  constructor(private seller : SellerService , private _router : Router){}
  showLogin = false
  authError : string = ''

  ngOnInit(){
    this.seller.reloadSeller()
  }

  signUp(data : SignUp):void{
    // console.warn(data)
    this.seller.userSignUp(data)
  }

  login(data : Login) : void{
    this.authError = ''
    // console.log(data)
    this.seller.userLogin(data)
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError = "Email or Password is not Correct!!"
      }
    })
  }

  openLogin(){
    this.showLogin = true
  }
  openSignUp(){
    this.showLogin = false
  }

}
