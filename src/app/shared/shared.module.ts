import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileBarComponent } from './components/profile-bar/profile-bar.component';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ScrollAnimationDirective } from '@app/core/directives/scroll-animation.directive';



@NgModule({
    declarations: [
        PageNotFoundComponent,
        NavigationComponent,
        FooterComponent,
        ProfileBarComponent,
        PaginationComponent,
        ScrollAnimationDirective,
    ],
    imports: [RouterModule, CommonModule],
    exports: [PageNotFoundComponent, NavigationComponent, FooterComponent, ProfileBarComponent, ScrollAnimationDirective,]
})

export class SharedModule { }