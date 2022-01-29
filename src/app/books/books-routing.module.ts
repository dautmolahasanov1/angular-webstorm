import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";

import { BookFormComponent } from "./components/book-form/book-form.component";
import { BooksListComponent } from "./components/books-list/books-list.component";
import { BooksComponent } from "./components/books/books.component";

const routes: Route[] = [
  {
    path: "",
    component: BooksComponent,
    children: [
      {
        path: "books",
        component: BooksListComponent
      },
      {
        path: "books/edit",
        component: BookFormComponent
      },
      {
        path: "books/edit/:id",
        component: BookFormComponent
      },
      {
        path: "",
        pathMatch: "full",
        redirectTo: "books"
      }
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
