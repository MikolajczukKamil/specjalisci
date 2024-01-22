import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserData} from "../../profile/user-data";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `/api/user/-1`; // URL to web API

  constructor(private http: HttpClient) { }

  getUserData(token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };

    const url = `${this.apiUrl}`;
    return this.http.get(this.apiUrl, httpOptions);
  }

  updateUserData(userDto: UserData): Observable<any> {
    return this.http.put('/api/user', userDto);
  }
}
