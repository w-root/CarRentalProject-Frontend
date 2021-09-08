import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../Models/car';
import { Color } from '../Models/color';
import { ListResponseModel } from '../Models/listResponseModel';
import { ResponseModel } from '../Models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = "https://localhost:44355/api/"; 
  
  constructor(private httpClient:HttpClient) { }

    getColors():Observable<ListResponseModel<Color>>{
      let newPath = this.apiUrl + "Colors/getall"
      return this.httpClient.get<ListResponseModel<Color>>(newPath);
    }

    getCarsByColorId(id:number){
      let newPath = this.apiUrl + "Cars/getcarsbycolorid?id="+id
      return this.httpClient.get<ListResponseModel<Car>>(newPath);
    }

    deleteColor(color:Color):Observable<ResponseModel>{
      let newPath = this.apiUrl + "Colors/delete"
      return this.httpClient.post<ResponseModel>(newPath,color);
    }
  
    updateColor(color:Color):Observable<ResponseModel>{
      let newPath = this.apiUrl + "Colors/update"
      return this.httpClient.post<ResponseModel>(newPath,color);
    }
    
    addColor(color:Color):Observable<ResponseModel>{
      let newPath = this.apiUrl + "Colors/add"
      return this.httpClient.post<ResponseModel>(newPath,color);
    }
  
}
