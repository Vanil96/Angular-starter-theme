import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';



@NgModule({
    declarations: [
        PageNotFoundComponent,
        NavigationComponent,
        FooterComponent
    ],
    imports: [RouterModule],
    exports: [PageNotFoundComponent, NavigationComponent, FooterComponent]
})

export class SharedModule { }