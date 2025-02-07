import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from 'rxjs';
import { SnackBarService } from "../services/snack-bar.service";

@Injectable({ providedIn: 'root' })
//to not use that interceptor for any http request, add 'HandleManually' to headers
//for example: this.http.get('/endpoint', {headers: new HttpHeaders({ 'HandleManually': 'true' })});

export class ErrorHandlerInterceptor implements HttpInterceptor {
    constructor(private snackbar: SnackBarService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (!req.headers.has('HandleManually')) {
                    const errorMessage = error.error.message;
                    const fallbackMessage = 'Wystąpił niezidentyfikowany błąd';
                    this.snackbar.open(errorMessage ? errorMessage : fallbackMessage, 'warn');
                }
                return throwError(() => error);
            })
        );
    }
}

export const ErrorHandlerInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorHandlerInterceptor,
    multi: true,
}

