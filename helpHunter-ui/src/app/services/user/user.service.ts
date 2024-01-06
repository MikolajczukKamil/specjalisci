import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/user'; // URL to web API

  constructor(private http: HttpClient) { }

  getUserData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
