import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../auth-service/authService';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private myRoute: Router, private authService: AuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isLoggedIn()) {
      console.log('AuthGuard : ', next, state);
      // if (state && state.url === '/login') {
      //   this.myRoute.navigate(['admin', 'subscription', 'dashboard']);
      // }
      if (state && state.url.includes('/login')) {
        // TODO comment for old login
        if (this.authService.isAdvisor()) {
          this.myRoute.navigate(['admin', 'subscription', 'dashboard']);
        } else {
          this.myRoute.navigate(['customer', 'detail', 'overview', 'myfeed']);
        }
        return false;
      }
      // const user = this.authService.decode();
      //
      // if (user.Role === next.data.role) {
      //   return true;
      // }

      // navigate to not found page
      // this.myRoute.navigate(['/404']);

      return true;
    } else {
      console.log('AuthGuard failed: ', next, state);

      if (state && state.url.includes('/login')) {
        return true;
      }
      this.myRoute.navigate(['/login']);
      return false;
    }
  }

  // advisorGuard()
}
