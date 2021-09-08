import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../Models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl = "https://localhost:44342/api/"


  constructor(private httpClient: HttpClient) { }

  addPayment(payment:any): Observable<ResponseModel> {
    let newPath = this.apiUrl + "Payment/add"
    return this.httpClient.post<ResponseModel>(newPath,payment);
  }
}
