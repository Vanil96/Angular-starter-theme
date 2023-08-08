import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()

export class ApiUrlInterceptor implements HttpInterceptor {
    private apiUrl = environment.apiUrl;

    constructor() {
        //if multilanguage = set lang from store
    }


    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        /* exclude change if request include e.g 'images'
         if (request.url.includes('images')) {
             return next.handle(request)
         } */

        request = request.clone({
            url: `${this.apiUrl}${request.url}`,
            //headers: set headers if needed (e.g with languages),
        });
        return next.handle(request);

    };
}

export const ApiUrlInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiUrlInterceptor,
    multi: true,
};