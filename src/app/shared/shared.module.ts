import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileBarComponent } from './components/profile-bar/profile-bar.component';
import { CommonModule } from '@angular/common';



@NgModule({
    declarations: [
        PageNotFoundComponent,
        NavigationComponent,
        FooterComponent,
        ProfileBarComponent
    ],
    imports: [RouterModule, CommonModule],
    exports: [PageNotFoundComponent, NavigationComponent, FooterComponent, ProfileBarComponent]
})

export class SharedModule { }