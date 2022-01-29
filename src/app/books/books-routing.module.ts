import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AclGuard } from "../guards/acl.guard";

import { BookFormComponent } from "./components/book-form/book-form.component";
import { BooksListComponent } from "./components/books-list/books-list.component";
import { BooksComponent } from "./components/books/books.component";

const routes: Route[] = [
  {
    path: "",
    component: BooksComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        component: BooksListComponent
      },
      {
        path: "edit",
        component: BookFormComponent,
        canActivate: [AclGuard]
      },
      {
        path: "edit/:id",
        component: BookFormComponent,
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
export class BooksRoutingModule {

}
