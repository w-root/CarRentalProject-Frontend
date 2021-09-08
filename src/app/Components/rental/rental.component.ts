import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarImage } from 'src/app/Models/carImage';
import { CarImageService } from 'src/app/Services/car-image.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  carImage: CarImage[] = [];
  
  basePath = "https://localhost:44355";

  constructor(private carImageService: CarImageService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
      this.getCarImages();
 }

  getCarImages() {
    this.activatedRoute.params.subscribe(params => {
      this.carImageService.getCarImage(params["id"]).subscribe((response) => {
        this.carImage = response.data;
      })
    })
  }

  
  
  

}
