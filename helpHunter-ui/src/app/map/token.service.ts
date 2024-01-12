import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment.local';

@Injectable({ providedIn: 'root' })
export class TokenService {
    private url = '/api/config';
    private token = new BehaviorSubject<MapToken>({ map_token: environment.mapToken });

    constructor(private client: HttpClient) {}

    getToken(): Observable<MapToken> {
        if (!this.token.getValue().map_token) {
            this.client.get<MapToken>(this.url).subscribe({
                next: token => {
                    this.token.next(token);
                },
                error: err => {
                    console.error(err);
                },
            });
        }

        return this.token.asObservable();
    }
}

export interface MapToken {
    map_token: string;
}
