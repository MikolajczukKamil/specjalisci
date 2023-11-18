import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {
    constructor(
        private _router: Router,
        private auth: AuthService,
        private snackBar: MatSnackBar
    ) {}

    navigateToRegister() {
        this._router.navigateByUrl('/register');
    }

    navigateToHomePage() {
        this._router.navigateByUrl('/home');
    }

    loginForm = new FormGroup({
        email: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required, Validators.email],
        }),
        pwd: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    });

    loginSubmit() {
        if (this.loginForm.valid) {
            const formValue = this.loginForm.getRawValue();
            this.auth.login(formValue.email, formValue.pwd).then(() => {
                this.navigateToHomePage();
            });
        } else {
            if (this.loginForm.get('email')?.invalid) {
                this.snackBar.open('Please enter a valid email', 'Close', {
                    duration: 3000,
                });
            } else if (this.loginForm.get('pwd')?.invalid) {
                this.snackBar.open('Please enter a valid password', 'Close', {
                    duration: 3000,
                });
            } else {
                this.snackBar.open('Please fill in all fields', 'Close', {
                    duration: 3000,
                });
            }
        }
    }
}
