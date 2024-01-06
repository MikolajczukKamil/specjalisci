import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-random-image',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit {

    constructor(
        private _router: Router, 
        private snackBar: MatSnackBar
    ) {
        this.getRandomImageUrl();
    }

    public shouldShowImage1 = false;
    public shouldShowImage2 = false;
    public shouldShowImage3 = false;
    public shouldShowImage4 = false;
    imageUrls1: string = '';
    imageUrls2: string = '';
    imageUrls3: string = '';
    imageUrls4: string = '';
    chosenImage:string = '';
    full_name:  string = '';

    registerForm = new FormGroup({
        firstName: new FormControl<string>('', {
            nonNullable: true,
            validators: [
                Validators.required, 
                Validators.minLength(2), 
                Validators.pattern('[a-zA-Z].*')
            ],
        }),
        lastName: new FormControl<string>('', {
            nonNullable: true,
            validators: [
                Validators.required, 
                Validators.minLength(2), 
                Validators.pattern('[a-zA-Z].*')
            ],
        }),
        address: new FormControl<string>('', {
            nonNullable: true,
            validators: [
                Validators.required,
                Validators.minLength(4), 
            ],
        }),
        mobile: new FormControl<string>('', {
            nonNullable: true,
            validators: [
                Validators.required, 
                Validators.minLength(9), 
                Validators.maxLength(9), 
                Validators.pattern('[0-9].*')
            ],
        }),
        email: new FormControl<string>('', {
            nonNullable: true,
            validators: [
                Validators.required, 
                Validators.email
            ],
        }),
        pwd: new FormControl<string>('', { 
            nonNullable: true, 
            validators: [
                Validators.required,
                Validators.minLength(8)
            ] 
        }),
    });



    ngOnInit(): void {}

    registerSubmit() {
        if (this.registerForm.valid && this.chosenImage.length > 0) {
            this.full_name = this.registerForm.get('firstName')?.value + ' ' + this.registerForm.get('lastName')?.value;            
            this.navigateToLogin();

        } else {
            if (this.registerForm.get('firstName')?.invalid) {
                this.snackBar.open('Wprowadź poprawne imie', 'Close', {
                    duration: 3000,
                });
            }
            else if (this.registerForm.get('lastName')?.invalid) {
                this.snackBar.open('Wprowadź poprawne nazwisko', 'Close', {
                    duration: 3000,
                });
            }
            else if (this.registerForm.get('mobile')?.invalid) {
                this.snackBar.open('Wprowadź poprawny numer telefonu', 'Close', {
                    duration: 3000,
                });
            }
            else if (this.registerForm.get('email')?.invalid) {
                this.snackBar.open('Wprowadź poprawny adres email', 'Close', {
                    duration: 3000,
                });
            } else if (this.registerForm.get('pwd')?.invalid) {
                this.snackBar.open('Wprowadź poprawne hasło', 'Close', {
                    duration: 3000,
                });
            }else if (this.chosenImage.length == 0 ) {
                this.snackBar.open('Wybierz avatar', 'Close', {
                    duration: 3000,
                });
            }
        }
    }

    navigateToLogin() {
        this._router.navigateByUrl('/login');
    }

    navigateToHomePage() {
        this._router.navigateByUrl('/home');
    }

    imageUrls: string[] = [
        'assets/images/avatars/avatar1.png',
        'assets/images/avatars/avatar2.png',
        'assets/images/avatars/avatar3.png',
        'assets/images/avatars/avatar4.png',
        'assets/images/avatars/avatar5.png',
        // Add more image URLs as needed
    ];

    private shuffledImageUrls: string[] = this.shuffleArray([...this.imageUrls]);

    private currentIndex = 0;

    private shuffleArray(array: string[]): string[] {
        let currentIndex = array.length;
        let temporaryValue: string;
        let randomIndex: number;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    getRandomImageUrl(): void {
        this.imageUrls1 = this.shuffledImageUrls[this.currentIndex];
        this.currentIndex++;
        this.imageUrls2 = this.shuffledImageUrls[this.currentIndex];
        this.currentIndex++;
        this.imageUrls3 = this.shuffledImageUrls[this.currentIndex];
        this.currentIndex++;
        this.imageUrls4 = this.shuffledImageUrls[this.currentIndex];
        this.currentIndex++;
    }

    getImageUrls1(): string {
        return this.imageUrls1;
    }
    getImageUrls2(): string {
        return this.imageUrls2;
    }
    getImageUrls3(): string {
        return this.imageUrls3;
    }
    getImageUrls4(): string {
        return this.imageUrls4;
    }

    choseImage1(){
        this.shouldShowImage1 = true;
        this.shouldShowImage2 = false;
        this.shouldShowImage3 = false;
        this.shouldShowImage4 = false;
        this.chosenImage = this.getImageUrls1()
    }
    choseImage2(){
        this.shouldShowImage1 = false;
        this.shouldShowImage2 = true;
        this.shouldShowImage3 = false;
        this.shouldShowImage4 = false;
        this.chosenImage = this.getImageUrls2()
    }
    choseImage3(){
        this.shouldShowImage1 = false;
        this.shouldShowImage2 = false;
        this.shouldShowImage3 = true;
        this.shouldShowImage4 = false;
        this.chosenImage = this.getImageUrls3()
    }
    choseImage4(){
        this.shouldShowImage1 = false;
        this.shouldShowImage2 = false;
        this.shouldShowImage3 = false;
        this.shouldShowImage4 = true;
        this.chosenImage = this.getImageUrls4()
    }
}
