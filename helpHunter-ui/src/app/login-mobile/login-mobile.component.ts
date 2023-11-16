import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-mobile',
  templateUrl: './login-mobile.component.html',
  styleUrls: ['./login-mobile.component.css']
})
export class LoginMobileComponent {
  constructor(private _router: Router) { }

  navigateToRegister() {
    this._router.navigateByUrl('/register-mobile')
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
