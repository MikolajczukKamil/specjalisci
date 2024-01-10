import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export interface Token {
    token: string;
}

export interface RegisterPayload {
    full_name: string;
    phone_number: string;
    email: string;
    password: string;
    avatar: number;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private token: string | null = null;

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
        this.token = localStorage.getItem('token');
    }

    login(username: string, password: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.http.post<Token>(`/api/login`, { username, password }).subscribe({
                next: token => {
                    this.token = token.token;
                    localStorage.setItem('token', token.token);
                    resolve(true);
                },
                error: error => {
                    reject(error);
                },
            });
        });
    }

    register(payload: RegisterPayload): Observable<unknown> {
        // add heder with origin access

        return this.http.post(`/api/register`, payload);
    }

    getToken(): string | null {
        return this.token;
    }

    isLogged(): boolean {
        return this.token !== null;
    }

    logout() {
        this.token = null;
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

    canActivate(): boolean | UrlTree {
        if (this.token === null) {
            return this.router.parseUrl('/login');
        } else {
            return true;
        }
    }
}
