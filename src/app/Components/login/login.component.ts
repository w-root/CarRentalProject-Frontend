import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private localStorage:LocalStorageService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe((response) => {
        this.toastrService.success("Ana Sayfaya Yönlendiriliyorsunuz", "Giriş Başarılı", {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: "decreasing"
        });
        setTimeout(() => {
          window.location.href = "";
        }, 2000);
        this.localStorage.setItem("token",response.data.token);

      },responseError =>{
        console.log(responseError)
        this.toastrService.error(responseError.error);
      })
    }
  }


  
}
