import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './subpages/home/home.component';
import { SharedModule } from '@app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';


@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule
  ],
  providers: []
})
export class PagesModule { }
