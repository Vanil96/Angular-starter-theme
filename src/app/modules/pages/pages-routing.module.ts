import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./subpages/home/home.component";
import { ExamplesComponent } from "./subpages/examples/examples.component";
import { AuthorizedGuard } from "src/app/core/guards/authorized.guard";
import { PagesComponent } from "./pages.component";



const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
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

export class PagesRoutingModule { }


