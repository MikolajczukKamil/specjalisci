import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private _router: Router) { }

  navigateToRegister() {
    this._router.navigateByUrl('/register')
  }
  navigateToLogin() {
    this._router.navigateByUrl('/login')
  }
  
}
