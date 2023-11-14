import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-random-image',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  template: `  `,
})

export class RegisterComponent{
  imageUrls1: string= "";
  imageUrls2: string= "";
  imageUrls3: string= "";
  imageUrls4: string = "";
  constructor(private _router: Router) {
    this.getRandomImageUrl();
  };

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
    console.log('gowno');
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
    this.imageUrls1= this.shuffledImageUrls[this.currentIndex];
    this.currentIndex++;
    this.imageUrls2= this.shuffledImageUrls[this.currentIndex];
    this.currentIndex++;
    this.imageUrls3= this.shuffledImageUrls[this.currentIndex];
    this.currentIndex++;
    this.imageUrls4= this.shuffledImageUrls[this.currentIndex];
    this.currentIndex++;
  }

  getImageUrls1(): string {
    console.log(this.imageUrls1);
    return this.imageUrls1;
  }
  getImageUrls2(): string {
    console.log(this.imageUrls2);
    return this.imageUrls2;
  }
  getImageUrls3(): string {
    console.log(this.imageUrls3);
    return this.imageUrls3;
  }
  getImageUrls4(): string {
    console.log(this.imageUrls4);
    return this.imageUrls4;
  }
}