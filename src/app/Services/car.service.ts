import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../Models/brand';
import { Car } from '../Models/car';
import { CarDetail } from '../Models/carDetailDto';
import { ListResponseModel } from '../Models/listResponseModel';
import { ResponseModel } from '../Models/responseModel';
import { SingleResponseModel } from '../Models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:44355/api/";

  constructor(private httpClient:HttpClient) { }

    getCars():Observable<ListResponseModel<Car>>{
      let newPath = this.apiUrl + "Cars/getall"
      return this.httpClient.get<ListResponseModel<Car>>(newPath);
    }

    getCarsByBrandId(id:number){
      let newPath = this.apiUrl + "Cars/getcarsbybrandid?id="+id
      return this.httpClient.get<ListResponseModel<Car>>(newPath);
    }

    getCar(id:number){
      let newPath = this.apiUrl + "Cars/getbyid?id="+id
      return this.httpClient.get<SingleResponseModel<Car>>(newPath);
    }

    getCarDetails(){
      let newPath = this.apiUrl + "Cars/getcardetails"
      return this.httpClient.post<ListResponseModel<CarDetail>>(newPath,{});
    }
    

    deleteCar(car:CarDetail):Observable<ResponseModel>{
      let newPath = this.apiUrl + "Cars/delete"
      return this.httpClient.post<ResponseModel>(newPath,car);
    }
  
    updateCar(car:CarDetail):Observable<ResponseModel>{
      let newPath = this.apiUrl + "Cars/update"
      return this.httpClient.post<ResponseModel>(newPath,car);
    }
    addCar(car:CarDetail):Observable<ResponseModel>{
      let newPath = this.apiUrl + "Cars/add"
      return this.httpClient.post<ResponseModel>(newPath,car);
    }

}

