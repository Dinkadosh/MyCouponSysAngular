import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import * as SecureLS from 'secure-ls';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate {

  secure = new SecureLS();

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userToken = this.secure.get('tokenS');
    const userRole = this.secure.get('roleS');
    if (userToken) {
        // check if route is restricted by role
        if (route.data.roles && route.data.roles.indexOf(userRole) === -1) {
            // role not authorised so redirect to home page
            this.router.navigate(['/login']);
            return false;
        }

        // authorised so return true
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login']);
    return false;
}
  }

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): boolean {
  //   const url: string = state.url;
  //   return this.checkLogin(url);
  // }

  // checkLogin(url: string): boolean {
  //   console.log(this.authService.isLoggedIn)
  //   if (this.authService.islogin()) { return true; }

  //   // Store the attempted URL for redirecting
  //   this.authService.redirectUrl = url;

  //   // Navigate to the login page with extras
  //   this.router.navigate(['/login']);
  //   return false;
  // }
