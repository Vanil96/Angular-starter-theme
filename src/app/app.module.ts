import { ErrorHandlerInterceptorProvider } from './core/interceptors/error-handler.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApiUrlInterceptorProvider } from './core/interceptors/api-url.interceptor';
import { ProfileModule } from './modules/profile/profile.module';
import { AuthInterceptorProvider } from './core/interceptors/auth.interceptor';
import { AuthorizedGuard } from './core/guards/authorized.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { translateLoader } from './shared/loaders/translate-browser.loader';


@NgModule({ declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        SharedModule,
        AppRoutingModule,
        ProfileModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (translateLoader),
                deps: [HttpClient] // use TransferState for SSR
            }
        })], providers: [ApiUrlInterceptorProvider, AuthInterceptorProvider, ErrorHandlerInterceptorProvider, AuthorizedGuard, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
