import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { HomeComponent } from './pages/home/home.component';
import { ExamplesComponent } from './pages/examples/examples.component';


@NgModule({
  declarations: [
    LandingComponent,
    HomeComponent,
    ExamplesComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule
  ],
  providers: []
})
export class LandingModule { }
