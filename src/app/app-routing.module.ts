import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { PageNotFoundComponent } from "./shared/components/page-not-found/page-not-found.component";


const routes: Routes = [
    { path: '', loadChildren: () => import('./modules/landing/landing.module').then(m => m.LandingModule) },
    { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
    { path: 'profile', loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule) },
    { path: '**', component: PageNotFoundComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }

