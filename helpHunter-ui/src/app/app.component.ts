import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'helpHunter-ui';
    constructor(private _router: Router) { }

  navigateToRegister() {
    this._router.navigateByUrl('/register')
  }
  navigateToLogin() {
    this._router.navigateByUrl('/login')
  }
}
