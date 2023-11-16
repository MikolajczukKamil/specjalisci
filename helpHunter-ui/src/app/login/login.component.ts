import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _router: Router) { }

  navigateToRegister() {
    this._router.navigateByUrl('/register')
  }
  navigateToHomePage() {
    this._router.navigateByUrl('/home')
  }

  loginForm = new FormGroup({
    email: new FormControl(""),
    pwd: new FormControl("")
  });

  loginSubmit() {
    console.log(this.loginForm.value);
  }

}
