import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../Models/carImage';
import { ListResponseModel } from '../Models/listResponseModel';
import { ResponseModel } from '../Models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl = "https://localhost:44355/api/";

  constructor(private httpClient: HttpClient) { }

  getCarImage(id:number): Observable<ListResponseModel<CarImage>> {
    let newPath = this.apiUrl + "CarImages/getbycarid?carId="+id
    console.log(id)
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

}
