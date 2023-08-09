import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./modules/auth/auth.component";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./modules/home/home.component";
import { PageNotFoundComponent } from "./shared/components/page-not-found/page-not-found.component";
import { ProfileComponent } from "./modules/profile/profile.component";


const routes: Routes = [
    { path: '', component:HomeComponent},
    { path: 'auth', component: AuthComponent },
    { path: 'profile', component: ProfileComponent },
    { path:'**', component: PageNotFoundComponent}
]


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }

