import { HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SnackBarService } from '../services/snack-bar.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthInterceptor implements HttpInterceptor {

  constructor(private authServie: AuthService, private snackbar: SnackBarService, private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.getAuthorizedRequest(req)).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.snackbar.open('httpErrors.authorization.401', 'warn');
            return throwError(() => err);
          }
  
          if (err.status === 403) {
            this.snackbar.open('httpErrors.authorization.403', 'warn');
            this.router.navigate(['']);
            return throwError(() => err);
          }
        }
        throw err;
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
