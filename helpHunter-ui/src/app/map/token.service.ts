import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.local';

@Injectable({ providedIn: 'root' })
export class TokenService {
    private url = '/api/config';

    constructor(private client: HttpClient) {}

    getToken(): Observable<MapToken> {
        if (environment.mapToken) {
            return new Observable<MapToken>(subscriber => {
                subscriber.next({ map_token: environment.mapToken });
            });
        }
        return this.client.get<MapToken>(this.url);
    }
}

export interface MapToken {
    map_token: string;
}
