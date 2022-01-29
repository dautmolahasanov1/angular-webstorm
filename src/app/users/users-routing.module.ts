import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AclGuard } from "../guards/acl.guard";

import { UserFormComponent } from "./components/user-form/user-form.component";
import { UsersListComponent } from "./components/user-list/users-list.component";
import { UsersComponent } from "./components/users/users.component";

const routes: Route[] = [
  {
    path: "",
    component: UsersComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        component: UsersListComponent
      },
      {
        path: "edit",
        component: UserFormComponent,
        canActivate: [AclGuard]
      },
      {
        path: "edit/:id",
        component: UserFormComponent,
        canActivate: [AclGuard]
      },
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
export class UsersRoutingModule {

}
