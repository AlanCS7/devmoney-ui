import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   const token = localStorage.getItem('token');

  //   const headers = {
  //     Authorization: `Bearer ${token}`,
  //     'Content-Type': 'application/json'
  //   };

  //   if (token) {
  //     request = request.clone({
  //       setHeaders: headers
  //     });
  //   }

  //   return next.handle(request);
  // }

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.includes('/oauth/token') && this.auth.isAccessTokenInvalid()) {
      this.auth.obterNovoAccessToken();
    }

    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    if (token) {
      request = request.clone({
        setHeaders: headers,
      });
    }

    return next.handle(request);
  }
}
