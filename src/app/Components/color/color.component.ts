import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/Models/car';
import { Color } from 'src/app/Models/color';
import { CarService } from 'src/app/Services/car.service';
import { ColorService } from 'src/app/Services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  currentColor: Color;
  colors: Color[];
  cars: Car[];

  constructor(private colorService: ColorService,private activatedRoute: ActivatedRoute,private carService:CarService) { }

  ngOnInit(): void {
    this.getColors();

    this.activatedRoute.params.subscribe(params => {
      if (params["id"]) {
        this.getCarsByColorId(params["id"]);
        console.log(this.cars);
      }
      else {
        this.getCars();
      }
    })
  }


  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data
    })
  }

  setCurrentColor(color: Color) {
    this.currentColor = color;
  }

  getCarsByColorId(id:number){
    this.colorService.getCarsByColorId(id).subscribe((response) => {
      this.cars = response.data
    })
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data
    })
  }

  getCurrentColorClass(color: Color) {
    if (color === this.currentColor) {
      return "list-group-item   d-flex justify-content-between align-items-center active";
    }
    else {
      return "list-group-item   d-flex justify-content-between align-items-center";
    }
  }

  getAllColorClass() {
     if (!this.currentColor) {
      return "list-group-item d-flex justify-content-between align-items-center active";
    }
    else {
      return "list-group-item d-flex justify-content-between align-items-center";
    }
  }

  removeCurrentColor(){
     this.currentColor = null;
  }
}
