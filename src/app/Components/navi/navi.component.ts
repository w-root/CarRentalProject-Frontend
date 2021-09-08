import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';

import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  control: boolean = false;
  role: string
  user: User;
  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.control = this.authService.isAuthenticated();
    this.getUserRoles();
    this.getUserDetails();
  }

  logout() {
    this.authService.logout();
    this.control = false;
  }

  getUserRoles() {
    this.role = this.userService.getUserRoles();
    console.log(this.role);
  }

  getUserDetails() {
    this.user = this.userService.getUserDetails();
  }

}
