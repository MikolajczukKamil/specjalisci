import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserData } from '../../profile/user-data';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private apiUrl = `/api/user/-1`; // URL to web API
    private userData = new BehaviorSubject<UserData>({} as UserData);

    constructor(private http: HttpClient) {}

    getUserData(): Observable<UserData> {
        if (!this.userData.getValue().id) {
            this.http.get<UserData>(this.apiUrl).subscribe({
                next: userData => {
                    this.userData.next(userData);
                },
                error: err => {
                    console.error(err);
                },
            });
        }

        return this.userData.asObservable();
    }

    updateUserData(userDto: UserData): Observable<any> {
        this.userData.next({} as UserData);
        return this.http.put('/api/user', userDto);
    }
}
