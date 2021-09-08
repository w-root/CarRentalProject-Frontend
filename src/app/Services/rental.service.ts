import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../Models/listResponseModel';
import { Rental } from '../Models/rental';
import { RentalDetailDto } from '../Models/rentalDetailDto';
import { ResponseModel } from '../Models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = "https://localhost:44355/api/"
  constructor(private httpClient: HttpClient) { }

  addRental(rental:Rental): Observable<ResponseModel> {
    let newPath = this.apiUrl + "Rentals/add"
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }


  getByCustomerId(id:number): Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + "Rentals/getbycustomerid?id="+id
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  deleteRental(rental:Rental): Observable<ResponseModel> {
    let newPath = this.apiUrl + "Rentals/delete"
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }

  getRentalDetails(): Observable<ListResponseModel<RentalDetailDto>> {
    let newPath = this.apiUrl + "Rentals/getrentaldetails"
    return this.httpClient.post<ListResponseModel<RentalDetailDto>>(newPath,{});
  }

  
}
