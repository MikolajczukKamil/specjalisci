import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class GeneralInterceptor implements HttpInterceptor {
    private allowedUrls = ['/api/login', '/api/register', 'api.mapbox.com'];

    constructor(private auth: AuthService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
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
