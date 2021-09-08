import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {


  user: User;
  userUpdateForm: FormGroup;

  constructor(private userService: UserService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getUserDetails();
    this.createUpdateUserForm();
  }

  getUserDetails() {
    this.user = this.userService.getUserDetails();
  }

  createUpdateUserForm() {
    this.userUpdateForm = this.formBuilder.group({
      oldPassword: ["", Validators.required],
      newPassword: ["", Validators.required],
      newPassword2: ["", Validators.required]
    })
  }

  userUpdate() {
    let newModel = Object.assign({ }, this.userUpdateForm.value)

    if (newModel.newPassword === newModel.newPassword2) {
      let userModel = Object.assign({ }, { id: this.user.id, firstName: this.user.firstName, lastName: this.user.lastName, email: this.user.email, passwordHash: "", passwordSalt: "" })
      this.userService.updateUser(userModel, newModel.newPassword).subscribe((response) => {
        this.toastrService.success(response.message)
        setTimeout(() => {
          window.location.href = '/profile';
        }, 900);
      })
    }
    else {
      this.toastrService.error("Şifreler Uyuşmuyor !")
    }

  }


}




