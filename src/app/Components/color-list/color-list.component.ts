import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/Models/color';
import { ColorService } from 'src/app/Services/color.service';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css']
})
export class ColorListComponent implements OnInit {
 
  colors: Color[];
  currentColor: Color = { id: 0, colorName: "" };

  colorForm : FormGroup;

  constructor(private colorService:ColorService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.getColors();
    this.createColorForm();
  }

  createColorForm(){
    this.colorForm = this.formBuilder.group({
      id : [""],
      colorName : [""]
    } )
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data
    })
  }

  setCurrentColor(color:Color) {
    this.currentColor = color;
  }

  deleteColor() {
    this.colorService.deleteColor(this.currentColor).subscribe((response) => {
      this.toastrService.success(response.message);
      setTimeout(() => {
        window.location.href = '/admin/panel/colors';
      }, 500);
    })
  }

  updateColor() {
    let colorModel = Object.assign({},this.colorForm.value);
    this.colorService.updateColor(colorModel).subscribe((response) => {
      this.toastrService.success(response.message)
      setTimeout(() => {
        window.location.href = '/admin/panel/colors';
      }, 500);
    })
  }

  addColor() {
    let colorModel = Object.assign(this.colorForm.value,{id:0});
    this.colorService.addColor(colorModel).subscribe((response) => {
      this.toastrService.success(response.message)
      setTimeout(() => {
        window.location.href = '/admin/panel/colors';
      }, 500);
    })
  }
}
