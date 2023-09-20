import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ApiUrlInterceptorProvider } from './core/interceptors/api-url.interceptor';
import { ProfileModule } from './modules/profile/profile.module';
import { AuthInterceptorProvider } from './core/interceptors/auth.interceptor';
import { AuthorizedGuard } from './core/guards/authorized.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    ProfileModule,
    BrowserAnimationsModule,
    
  ],
  providers: [ApiUrlInterceptorProvider, AuthInterceptorProvider, AuthorizedGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
