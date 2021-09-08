import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './Components/admin/admin.component';
import { BrandListComponent } from './Components/brand-list/brand-list.component';
import { CarListComponent } from './Components/car-list/car-list.component';
import { CarComponent } from './Components/car/car.component';
import { ColorListComponent } from './Components/color-list/color-list.component';
import { ColorComponent } from './Components/color/color.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LoginComponent } from './Components/login/login.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { RegisterComponent } from './Components/register/register.component';
import { RentalComponent } from './Components/rental/rental.component';
import { SettingsComponent } from './Components/settings/settings.component';
import { AdminGuard } from './Guards/admin.guard';
import { LoginGuard } from './Guards/login.guard';

const routes: Routes = [
  {path:"" ,pathMatch:"full", component:CarComponent},
  {path:"cars",pathMatch:"full",component:CarComponent},
  {path:"car/getcarsbrandid/:id" ,pathMatch:"full",component:CarComponent},
  {path:"car/colors",pathMatch:"full",component:ColorComponent},
  {path:"car/getcarscolorid/:id",pathMatch:"full",component:ColorComponent},
  {path:"car/rental/:id",pathMatch:"full",component:RentalComponent},
  {path:"car/rental/:id/payment",pathMatch:"full",component:PaymentComponent ,canActivate:[LoginGuard]},

  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"profile",component:ProfileComponent},
  {path:"settings",component:SettingsComponent},
  

  {path:"admin/panel/cars",component:CarListComponent ,canActivate:[AdminGuard]},
  {path:"admin/panel/colors",component:ColorListComponent ,canActivate:[AdminGuard]},
  {path:"admin/panel/brands",component:BrandListComponent ,canActivate:[AdminGuard]},
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
