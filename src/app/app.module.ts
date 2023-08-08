import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { ProfileComponent } from './modules/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiUrlInterceptorProvider } from './core/interceptors/api-url.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [ApiUrlInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
