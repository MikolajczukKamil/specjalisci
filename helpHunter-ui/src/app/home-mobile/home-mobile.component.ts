import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-mobile',
  templateUrl: './home-mobile.component.html',
  styleUrls: ['./home-mobile.component.css']
})
export class HomeMobileComponent {
  constructor(private _router: Router) { }

  navigateToRegister() {
    this._router.navigateByUrl('/register-mobile')
  }
  navigateToLogin() {
    this._router.navigateByUrl('/login-mobile')
  }
}
