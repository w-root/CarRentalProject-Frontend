import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { LoginModel } from '../Models/loginModel';
import { RegisterModel } from '../Models/registerModel';
import { SingleResponseModel } from '../Models/singleResponseModel';
import { TokenModel } from '../Models/tokenModel';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://localhost:44355/api/Auth/";
  constructor(private httpClient: HttpClient,private localStorage:LocalStorageService) { }


  jwt: JwtHelperService = new JwtHelperService();

  login(loginModel: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiUrl + "login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, loginModel);
  }

  register(registerModel: RegisterModel) {
    let newPath = this.apiUrl + "register";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, registerModel);
  }

  isAuthenticated() {
    if (this.localStorage.getItem("token")) {
      return true;
    }
    else {
      return false;
    }
  }

  logout() {
    window.location.href = "login";
    this.localStorage.removeItem("token");
  }

  





}