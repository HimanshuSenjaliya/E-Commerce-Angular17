import {
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { SellerService } from './services/seller.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('seller')) {
    return true;
  }

  return false;
};

// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   const _router = inject(Router);

//   let isloggedIn = sessionStorage.getItem('isLoggedIn');

//   if (isloggedIn == 'false') {
//     alert('Please Login! , redirect to Login Page!!');
//     _router.navigate(['login']);
//     return false;
//   }

//   return true;
// };
