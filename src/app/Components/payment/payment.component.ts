import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/Models/car';
import { CarImage } from 'src/app/Models/carImage';
import { Customer } from 'src/app/Models/customer';
import { Payment } from 'src/app/Models/payment';
import { Rental } from 'src/app/Models/rental';
import { User } from 'src/app/Models/user';
import { CarImageService } from 'src/app/Services/car-image.service';
import { CarService } from 'src/app/Services/car.service';
import { CustomerService } from 'src/app/Services/customer.service';
import { PaymentService } from 'src/app/Services/payment.service';
import { RentalService } from 'src/app/Services/rental.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  totalPrice : number;
  car: Car = {
    "id": 0,
    "carName": "",
    "brandId": 0,
    "colorId": 0,
    "modelYear": 0,
    "description": "",
    "dailyPrice": 0
  };

  rental: Rental = {
    "id": 0,
    "carId": 0,
    "customerId": 0,
    "rentDate": null,
    "returnDate": null
  };

  customer: Customer = {
    "id": 0,
    "userId": 0,
    "companyName": "string"
  };

  paymentForm: FormGroup;
  constructor(private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private rentalService: RentalService,
    private userService: UserService,
    private toastrService: ToastrService,
    private customerService: CustomerService,

  ) { }

  ngOnInit(): void {
    this.getCar();
    this.getRentalDetails();
    this.createPaymentForm();

  }
  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      cardNumber: ["", Validators.required],
      cardHolder: ["", Validators.required],
      expMonth: ["", Validators.required],
      expYear: ["", Validators.required],
      cvc: ["", Validators.required]
    })
  }

  getCar() {
    this.activatedRoute.params.subscribe(params => {
      this.carService.getCar(params["id"]).subscribe((response) => {
        this.car = response.data;
      })
    })
  }

  addRental() {
    if (!this.rental.rentDate || !this.rental.returnDate) {
      this.toastrService.error("Tarih Seçiniz");
      return;
    }
    this.getTotalPrice();
    if (!this.paymentForm.valid) {
      this.toastrService.error("Kart Bilgileri Boş Bırakılamaz");
      return;
    }
    let rentalModel = Object.assign(this.rental, { customerId: this.customer.id, carId: this.car.id });

    this.rentalService.addRental(rentalModel).subscribe((response) => {
      this.toastrService.success("Ödeme Gerçekleşti", "Araba Kiralandı");
      setTimeout(() => {
        window.location.href = ""
      }, 1000);
    }, responseError => {
      console.log(responseError)
      this.toastrService.error(responseError.error.message)
    })

  }

  getRentalDetails() {
    this.customerService.getByUserId(Number(this.userService.getUserDetails().id)
    ).subscribe(response => {
      this.customer = response.data;
    })
  }

  getTotalPrice(){
    if (this.rental.returnDate <= this.rental.rentDate)
    {
       this.toastrService.error("Tarhileri Kontrol Ediniz !")
    }
    let rentDate = new Date(this.rental.rentDate);
    let returnDate = new Date(this.rental.returnDate);
    let dateDifference = returnDate.getTime() - rentDate.getTime();
    let numberOfDays = Math.ceil(dateDifference / (1000 * 3600 * 24));
    this.totalPrice = numberOfDays * this.car.dailyPrice;
  }


}
