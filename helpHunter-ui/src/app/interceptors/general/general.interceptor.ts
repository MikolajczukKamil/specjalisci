import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class GeneralInterceptor implements HttpInterceptor {
    private readonly apiServer = '//95.217.193.230:9999';

    private allowedUrls = ['/api/login', '/api/register', 'api.mapbox.com'];

    constructor(
        private auth: AuthService,
        private snackBar: MatSnackBar
    ) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (request.url.startsWith('/')) {
            request = request.clone({
                url: this.apiServer + request.url,
            });
        }

        if (!this.allowedUrls.some(allowedUrl => request.url.includes(allowedUrl))) {
            if (!this.auth.getToken()) {
                this.auth.logout();
            } else {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${this.auth.getToken()}`,
                    },
                });
            }
        }

        return next.handle(request).pipe(
            catchError((err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401 && !this.allowedUrls.some(allowedUrl => request.url.includes(allowedUrl))) {
                        this.auth.logout();
                        this.snackBar.open('Sesja wygasła', 'Close', {
                            duration: 3000,
                        });
                    }
                }
                throw err;
            })
        );
    }
}
