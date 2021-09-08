import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../Models/singleResponseModel';
import { User } from '../Models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ResponseModel } from '../Models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://localhost:44355/api/"

  constructor(private httpClient: HttpClient) { }

  jwt: JwtHelperService = new JwtHelperService();
  user: User;

  getUserDetails() {
    this.user = this.jwt.decodeToken(localStorage.getItem("token").toString());
    this.user.firstName = this.jwt.decodeToken(localStorage.getItem("token").toString())["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"];
    this.user.lastName = this.jwt.decodeToken(localStorage.getItem("token").toString())["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"];
    this.user.id = this.jwt.decodeToken(localStorage.getItem("token").toString())["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    return this.user;
  }

  getUserRoles() {
    if (!this.jwt.decodeToken(localStorage.getItem("token")?.toString())["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]) {
      return "User";
    }
    else {
      return this.jwt.decodeToken(localStorage.getItem("token")?.toString())["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    }
  }

  updateUser(user: User, password: string): Observable<ResponseModel> {
    let newPath = this.apiUrl + "Users/update";
    return this.httpClient.post<ResponseModel>(newPath, user, { headers: { "password": password } });
  }



}
