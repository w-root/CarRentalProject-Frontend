import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/Models/brand';
import { Car } from 'src/app/Models/car';
import { BrandService } from 'src/app/Services/brand.service';
import { CarService } from 'src/app/Services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars: Car[] = [];

  filterText = "";


  constructor(private carService: CarService,
    private activatedRoute: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["id"]) {
        this.getCarsByBrandId(params["id"]);
        console.log(this.cars);
      }
      else {
        this.getCars();
      }
    })
  }


  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data
    })
  }

  getCarsByBrandId(id: number) {
    this.carService.getCarsByBrandId(id).subscribe((response) => {
      this.cars = response.data
    })

  }


}
