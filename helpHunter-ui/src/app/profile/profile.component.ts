import {Component} from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  protected list =
    [
      {
        title: 'Dane kontaktowe',
        subtitle: 'Zaktualizuj swoje zdjęcie i data osobwe.',
      },
      {
        title: 'Imię i nazwisko',
        data: 'Janusz Kowalski'
      },
      {
        title: 'Telefon',
        data: '123 456 789'
      },
      {
        title: 'Email',
        data: 'pCQpK@example.com'
      },
      {
        title: 'Twój avatar',
        subtitle: 'Będzie to widoczne na Twoim profilu',
        data: './assets/images/avatars/avatar1.png'
      },
      {
        title: 'Adres',
        data: 'ul. Przyjazna 1, 00-000 Wrocław'
      },
      {
        title: 'Tryb specjalisty'
      },
      {
        title: 'O firmie',
        data: 'Opis firmy'
      },
      {
        title: 'Tryb pracy'
      },
      {
        title: 'Lista usług'
      },
    ]
}
