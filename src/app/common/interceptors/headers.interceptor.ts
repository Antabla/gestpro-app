import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { v4 } from 'uuid';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('accessToken');

    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}`, 'x-requid': v4() },
    });

    console.log('req', req);

    return next.handle(req);
  }
}
