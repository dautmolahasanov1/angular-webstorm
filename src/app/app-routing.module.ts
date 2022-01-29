import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
import { NonAuthGuard } from "./guards/non-auth.guard";

const routes: Route[] = [
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule),
    canLoad: [NonAuthGuard]
  },
  {
    path: "main/books",
    loadChildren: () => import("./books/books.module").then(m => m.BooksModule),
    canLoad: [AuthGuard]
  },
  {
    path: "main/listings",
    loadChildren: () => import("./listings/listings.module").then(m => m.ListingsModule),
    canLoad: [AuthGuard]
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "main/books"
  },
  {
    path: "main",
    pathMatch: "full",
    redirectTo: "main/listings"
  }
]

@NgModule({
  imports:[
    RouterModule.forRoot(routes),

  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
