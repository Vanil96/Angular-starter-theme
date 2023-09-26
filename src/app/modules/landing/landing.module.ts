import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { HomeComponent } from './pages/home/home.component';
import { ExamplesComponent } from './pages/examples/examples.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '@app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LandingComponent,
    HomeComponent,
    ExamplesComponent,

  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    FontAwesomeModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: []
})
export class LandingModule { }
