import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../Models/brand';
import { ListResponseModel } from '../Models/listResponseModel';
import { ResponseModel } from '../Models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl = "https://localhost:44355/api/";
  
  constructor(private httpClient:HttpClient) { }

  getBrands(){
    let newPath = this.apiUrl + "Brands/getall"
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  deleteBrand(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiUrl + "Brands/delete"
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }

  updateBrand(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiUrl + "Brands/update"
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }
  addBrand(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiUrl + "Brands/add"
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }


}
