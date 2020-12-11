import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RoleService } from './role.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private roleService: RoleService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    if (state.url.match('tasks') && this.roleService.activityPermission.subModule.Tasks.enabled) {
      return true;
    }
    else if (state.url.match('emails') && this.roleService.activityPermission.subModule.Emails.enabled) {
      return true;
    }
    else if (state.url.match('calendar') && this.roleService.activityPermission.subModule.Calendar.enabled) {
      return true;
    }
    else {
      this.router.navigate(['unauthorized']);
      return false
    }
  }

}