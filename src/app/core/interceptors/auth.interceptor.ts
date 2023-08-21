import { HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthInterceptor implements HttpInterceptor {

  constructor(private authServie: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.getAuthorizedRequest(req)).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          switch (err.status) {
            case 401:
              this.authServie.logout('Authorization required - Please log in!');
              break;

            case 403:
              // you can redirect here
              alert('Access denied. You do not have the necessary permissions.');
              // this.router.navigate(['/home']);
              break;

            default:
              alert('An error occurred. Please try again later.');
              break;
          }
        }
        return throwError(() => err);
      })
    );
  }

  getAuthorizedRequest(req: HttpRequest<any>) {
    return req.clone({
      setHeaders: {
        'Authorization': 'Bearer ' + this.authServie.getToken()
      }
    })
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
}
