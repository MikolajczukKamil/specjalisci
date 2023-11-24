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
    ) {
        if (this.auth.isLogged()) {
            this.navigateToHomePage();
        }
    }

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
            this.auth
                .login(formValue.email, formValue.pwd)
                .then(() => {
                    this.navigateToHomePage();
                })
                .catch(err => {
                    this.snackBar.open('Niepoprawny login lub hasło', 'Close', {
                        duration: 3000,
                    });
                });
        } else {
            if (this.loginForm.get('email')?.invalid) {
                this.snackBar.open('Wprowadź poprawny adres email', 'Close', {
                    duration: 3000,
                });
            } else if (this.loginForm.get('pwd')?.invalid) {
                this.snackBar.open('Wprowadź poprawne hasło', 'Close', {
                    duration: 3000,
                });
            } else {
                this.snackBar.open('Wypełnij pola z loginem i hasłem', 'Close', {
                    duration: 3000,
                });
            }
        }
    }
}
