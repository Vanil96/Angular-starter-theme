import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatOptionModule } from '@angular/material/core';
import { SelectComponent } from './components/form/select/select.component';
import { MatSelectModule } from '@angular/material/select';
import { RadioGroupComponent } from './components/form/radio-group/radio-group.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { CheckboxGroupComponent } from './components/form/checkbox-group/checkbox-group.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CheckboxComponent } from './components/form/checkbox/checkbox.component';
import { TextareaComponent } from './components/form/textarea/textarea.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

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
        RadioGroupComponent,
        CheckboxGroupComponent,
        CheckboxComponent,
        TextareaComponent,
    ],
    imports: [RouterModule, CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatAutocompleteModule, MatOptionModule, MatSelectModule, MatButtonModule, MatIconModule, MatRadioModule, MatCheckboxModule, FormsModule, FontAwesomeModule, TranslateModule],
    exports: [PageNotFoundComponent, FooterComponent, ProfileBarComponent, ScrollAnimationDirective, RestrictCharactersDirective, NavbarComponent, InputComponent, FormControlPipe, InputAutocompleteComponent, SelectComponent, MatButtonModule, MatIconModule, RadioGroupComponent, CheckboxGroupComponent, CheckboxComponent, TextareaComponent, TranslateModule]
})

export class SharedModule { }