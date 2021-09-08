import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './Components/car/car.component';
import { ColorComponent } from './Components/color/color.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { NaviComponent } from './Components/navi/navi.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './Components/profile/profile.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { ToastrModule } from 'ngx-toastr';
import { AdminComponent } from './Components/admin/admin.component';
import { CarListComponent } from './Components/car-list/car-list.component';
import { BrandListComponent } from './Components/brand-list/brand-list.component';
import { ColorListComponent } from './Components/color-list/color-list.component';
import { RentalComponent } from './Components/rental/rental.component';
import { BrandComponent } from './Components/brand/brand.component';
import { SettingsComponent } from './Components/settings/settings.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { FooterComponent } from './Components/footer/footer.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FilterPipe } from './Pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    ColorComponent,
    DashboardComponent,
    NaviComponent,
    ProfileComponent,
    RegisterComponent,
    LoginComponent,
    AdminComponent,
    CarListComponent,
    BrandListComponent,
    ColorListComponent,
    RentalComponent,
    BrandComponent,
    SettingsComponent,
    PaymentComponent,
    FooterComponent,
    FilterPipe,
    
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
