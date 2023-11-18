import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, UrlTree } from '@angular/router';

export interface Token {
    token: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    token: string | null = null;

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

    getToken(): string | null {
        return this.token;
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
