import { Injectable } from '@angular/core';
import { TokenModel } from '../Models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getItem(key:string) {
    let isKey = localStorage.getItem(key)
    
    if (isKey) {
      return true;
    }
    else {
      return false;
    }

  }

  removeItem(key:string) {
    localStorage.removeItem(key);
  }

  setItem(key:string,token: string) {
    localStorage.setItem(key, token);
  }



}
