import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Observable, catchError, throwError } from 'rxjs';
import { SnackBarService } from "../services/snack-bar.service";

//to not use that interceptor for any http request, add 'HandleManually' to headers
//for example: this.http.get('/endpoint', {headers: new HttpHeaders({ 'HandleManually': 'true' })});

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
    constructor(private snackbar: SnackBarService, private translate: TranslateService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (!req.headers.has('HandleManually')) {
                    const errorMessage = this.translate.instant('httpErrors.' + error.error.errorCode);
                    const fallbackMessage = this.translate.instant('httpErrors.general-error');
                    this.snackbar.open(errorMessage !== `httpErrors.${error.error.errorCode}` ? errorMessage : fallbackMessage, 'warn');
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

