import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileBarComponent } from './components/profile-bar/profile-bar.component';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ScrollAnimationDirective } from '@app/core/directives/scroll-animation.directive';
import { RestrictCharactersDirective } from '@app/core/directives/restrict-characters.directive';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InputComponent } from './components/form/input/input.component';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControlPipe } from '@app/core/pipes/form-control.pipe';
import { InputAutocompleteComponent } from './components/form/input-autocomplete/input-autocomplete.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete'
import { MatOptionModule } from '@angular/material/core';
import { SelectComponent } from './components/form/select/select.component';
import {MatSelectModule} from '@angular/material/select';
import { RadioComponent } from './components/form/radio/radio.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    declarations: [
        PageNotFoundComponent,
        FooterComponent,
        ProfileBarComponent,
        PaginationComponent,
        ScrollAnimationDirective,
        RestrictCharactersDirective,
        NavbarComponent,
        InputComponent,
        FormControlPipe,
        InputAutocompleteComponent,
        SelectComponent,
        RadioComponent,
    ],
    imports: [RouterModule, CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatAutocompleteModule, MatOptionModule, MatSelectModule, MatButtonModule, MatIconModule ],
    exports: [PageNotFoundComponent, FooterComponent, ProfileBarComponent, ScrollAnimationDirective, RestrictCharactersDirective, NavbarComponent, InputComponent, FormControlPipe, InputAutocompleteComponent, SelectComponent, MatButtonModule, MatIconModule ]
})

export class SharedModule { }