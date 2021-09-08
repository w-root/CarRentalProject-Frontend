import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/Models/brand';
import { BrandService } from 'src/app/Services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands: Brand[] = [];
  currentBrand: Brand;

  constructor(private brandService: BrandService) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data
    })
  }
  setCurrentBrand(brand: Brand) {
    this.currentBrand = brand;
  }

  getCurrentBrandClass(brand: Brand) {
    if (brand === this.currentBrand) {
      return "list-group-item d-flex justify-content-between align-items-center active";
    }
    else {
      return "list-group-item d-flex justify-content-between align-items-center";
    }

  }

  getAllBrandClass() {
    if (!this.currentBrand) {
      return "list-group-item d-flex justify-content-between align-items-center active";
    }
    else {
      return "list-group-item d-flex justify-content-between align-items-center";
    }
  }

  removeCurrentBrand() {
    this.currentBrand = null;
  }
}