import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./modules/auth/auth.component";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./modules/home/home.component";
import { PageNotFoundComponent } from "./shared/components/page-not-found/page-not-found.component";


const routes: Routes = [
    { path: '', component:HomeComponent},
    { path: 'login', component: AuthComponent },
    { path:'**', component: PageNotFoundComponent}
]


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }

