import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/Models/brand';
import { Car } from 'src/app/Models/car';
import { CarDetail } from 'src/app/Models/carDetailDto';
import { Color } from 'src/app/Models/color';
import { BrandService } from 'src/app/Services/brand.service';
import { CarService } from 'src/app/Services/car.service';
import { ColorService } from 'src/app/Services/color.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  brands: Brand[];
  colors: Color[];
  cars: CarDetail[];

  currentCar: CarDetail = { carId: 0, brandName: "", colorName: "", carName: "", dailyPrice: 0 };

  carForm: FormGroup;

  constructor(private carService: CarService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private brandService:BrandService, 
    private colorService:ColorService
  ) { }

  ngOnInit(): void {
    this.getAllCars();
    this.createCarForm();
    this.getAllbrands();
    this.getAllColors();
  }

  createCarForm() {
    this.carForm = this.formBuilder.group({
      id: [{value: "", disabled: true}],
      brandId: [""],
      colorId: [""],
      carName: [""],
      dailyPrice: [""],
      modelYear: [""],
      description: [""],
    })

  }

  getAllbrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
  }

  getAllColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }

  getAllCars() {
    this.carService.getCarDetails().subscribe((response) => {
      this.cars = response.data
    })
  }

  setCurrentCar(car: CarDetail) {
    this.currentCar = car;
  }

  deleteCar() {
    let carModel = Object.assign(this.carForm.value, { id: this.currentCar.carId });
    this.carService.deleteCar(carModel).subscribe((response) => {
      this.toastrService.success(response.message);
      setTimeout(() => {
        window.location.href = '/admin/panel/cars';
      }, 1000);
    })
  }

  updateCar() {
    let carModel = Object.assign(this.carForm.value, { Id: this.currentCar.carId });
    this.carService.updateCar(carModel).subscribe((response) => {
      this.toastrService.success(response.message)
      setTimeout(() => {
        window.location.href = '/admin/panel/cars';
      }, 1000);
    },)
  }

  addCar() {
    let carModel = Object.assign(this.carForm.value, { Id: 0 });
    this.carService.addCar(carModel).subscribe((response) => {
      this.toastrService.success(response.message)
      setTimeout(() => {
        window.location.href = '/admin/panel/cars';
      }, 1000);
    })
  }
}
