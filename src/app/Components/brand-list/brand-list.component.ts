import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/Models/brand';
import { BrandService } from 'src/app/Services/brand.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {

  brands: Brand[];
  currentBrand: Brand = { id: 0, brandName: "" };

  brandForm: FormGroup;
  constructor(private brandService: BrandService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getBrands();
    this.createBrandForm();
  }

  createBrandForm() {
    this.brandForm = this.formBuilder.group({
      id: [""],
      brandName: [""]
    })
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data
    })
  }

  setCurrentBrand(brand: Brand) {
    this.currentBrand = brand;
  }

  deleteBrand() {
    this.brandService.deleteBrand(this.currentBrand).subscribe((response) => {
      this.toastrService.success(response.message);
      setTimeout(() => {
        window.location.href = '/admin/panel/brands';
      }, 500);
    })
  }

  updateBrand() {
    let brandModel = Object.assign({}, this.brandForm.value);
    this.brandService.updateBrand(brandModel).subscribe((response) => {
      this.toastrService.success(response.message)
      setTimeout(() => {
        window.location.href = '/admin/panel/brands';
      }, 500);
    })
  }

  addBrand() {
    let carmodel = Object.assign(this.brandForm.value, { id: 0 });
    this.brandService.addBrand(carmodel).subscribe((response) => {
      this.toastrService.success(response.message)
      setTimeout(() => {
        window.location.href = '/admin/panel/brands';
      }, 500);
    }, responseError => {
      if (responseError.error.Errors.length > 0) {
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage)

        }
      }
    })
  }

}
