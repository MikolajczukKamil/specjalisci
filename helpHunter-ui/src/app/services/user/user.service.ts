import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `http://localhost:5147/api/user/-1`; // URL to web API

  constructor(private http: HttpClient) { }

  getUserData(token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };

    const url = `${this.apiUrl}`;
    return this.http.get(url, httpOptions);
  }

  // getUserData(token: number): Observable<any> {
  //   const url = `${this.apiUrl}/${token}`;
  //   return this.http.get(url);
  // }
}
