import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/Models/customer';
import { Rental } from 'src/app/Models/rental';
import { RentalDetailDto } from 'src/app/Models/rentalDetailDto';
import { User } from 'src/app/Models/user';
import { CustomerService } from 'src/app/Services/customer.service';
import { RentalService } from 'src/app/Services/rental.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  user: User;
  customer: Customer;
  rentals: Rental[];
  rentalDetailDtos: RentalDetailDto[];

  currentRental: RentalDetailDto;

  constructor(private userService: UserService,
    private rentalService: RentalService,
    private customerService: CustomerService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getUserDetails();
    this.getCustomerDetails();
    setTimeout(() => {
      this.getRentals();
    }, 1000);
    setTimeout(() => {
      this.getRentalDetails(this.customer.id);
    }, 1000);


  }

  getUserDetails() {
    this.user = this.userService.getUserDetails();

  }

  getCustomerDetails() {
    this.customerService.getByUserId(this.user.id).subscribe((response) => {
      this.customer = response.data;

    });

  }
  setCurrentRental(rental: RentalDetailDto) {
    this.currentRental = rental;
  }

  getRentals() {
    this.rentalService.getByCustomerId(this.customer.id).subscribe((response) => {
      this.rentals = response.data;
      console.log(this.rentals)
    })
  }

  deleteRental() {
    let rentalModel = Object.assign({}, { id: this.currentRental.rentalId, carId: null, customerId: this.currentRental.customerId, rentDate: this.currentRental.rentDate, returnDate: this.currentRental.returnDate })
    this.rentalService.deleteRental(rentalModel).subscribe((response) => {
      this.toastrService.success(response.message);
      setTimeout(() => {
        window.location.href = "profile";
      }, 1000);

    });
  }

  getRentalDetails(id: number) {
    this.rentalService.getRentalDetails().subscribe((response) => {
      this.rentalDetailDtos = response.data.filter(rental => rental.customerId === id);

    })
  }




}

