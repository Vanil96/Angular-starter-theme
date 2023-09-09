import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LandingComponent } from "./landing.component";
import { HomeComponent } from "./pages/home/home.component";
import { ExamplesComponent } from "./pages/examples/examples.component";
import { AuthorizedGuard } from "src/app/core/guards/authorized.guard";



const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'examples', component: ExamplesComponent, canActivate: [AuthorizedGuard] }
    ],
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LandingRoutingModule { }


