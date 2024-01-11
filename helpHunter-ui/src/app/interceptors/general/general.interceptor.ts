import { Injectable, isDevMode } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class GeneralInterceptor implements HttpInterceptor {
    private readonly apiServer = '//95.217.193.230:9999';
    private readonly isDevMode = isDevMode();

    private allowedUrls = ['/api/login', '/api/register', 'api.mapbox.com'];

    constructor(private auth: AuthService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (!isDevMode && request.url.startsWith('/')) {
            request = request.clone({
                url: this.apiServer + request.url,
            });
        }

        if (!this.allowedUrls.includes(request.url)) {
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
        return next.handle(request);
    }
}
