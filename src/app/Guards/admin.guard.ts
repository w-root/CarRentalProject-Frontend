import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';
import { UserService } from '../Services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService,
    private toastService: ToastrService,
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.isAuthenticated()) {
      if (this.userService.getUserRoles() == "admin") {
        return true;
      }
      else {
        this.router.navigate([""]);
        this.toastService.error("Bu Sayfa İçin Yetkiniz Yok !");
        return false;
      }
    }
    else {
      this.router.navigate(["login"]);
      this.toastService.error("Sisteme Giriş Yapmalısınız !");
      return false;
    }
  }

}
