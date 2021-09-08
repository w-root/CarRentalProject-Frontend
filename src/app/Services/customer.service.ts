import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../Models/customer';
import { SingleResponseModel } from '../Models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = "https://localhost:44355/api/";
  
  constructor(private httpClient: HttpClient) { }

  getByUserId(id:number) {
      let newPath = this.apiUrl + "Customers/getbyuserid?id="+id
      return this.httpClient.get<SingleResponseModel<Customer>>(newPath);    
  }

 
}
