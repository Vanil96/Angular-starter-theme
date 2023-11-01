import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class ApiUrlInterceptor implements HttpInterceptor {
    private apiUrl = environment.apiUrl;

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        if (request.url.startsWith('http://') || request.url.startsWith('https://')) {
            return next.handle(request);}

        if (  request.url.includes('assets/i18n/')) {
            return next.handle(request);
        }

        request = request.clone({
            url: `${this.apiUrl}${request.url}`,
            //headers: set headers if needed (e.g with languages),
        });
        return next.handle(request);
    }
}

export const ApiUrlInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiUrlInterceptor,
    multi: true,
}