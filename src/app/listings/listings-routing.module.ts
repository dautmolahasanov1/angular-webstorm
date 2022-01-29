import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AclGuard } from "../guards/acl.guard";

import { ListingFormComponent } from "./components/listing-form/listing-form.component";
import { ListingsListComponent } from "./components/listings-list/listings-list.component";
import { ListingsComponent } from "./components/listings/listings.component";

const routes: Route[] = [
  {
    path: "",
    component: ListingsComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        component: ListingsListComponent
      },
      {
        path: "edit",
        component: ListingFormComponent,
        canActivate: [AclGuard]
      },
      {
        path: "edit/:id",
        component: ListingFormComponent,
        canActivate: [AclGuard]
      },
      // {
      //   path: "",
      //   pathMatch: "full",
      //   redirectTo: ""
      // }
    ]
  }
]

@NgModule({
  imports:[
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class ListingsRoutingModule {

}
