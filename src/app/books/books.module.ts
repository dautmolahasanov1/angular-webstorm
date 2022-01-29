import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { Route, RouterModule } from "@angular/router";

// ===== MATERIAL UI ===== //
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// ===== MATERIAL UI ===== //

import { BookFormComponent } from "./components/book-form/book-form.component";
import { BookItemComponent } from "./components/book-item/book-item.component";
import { BooksListComponent } from "./components/books-list/books-list.component";
import { BooksComponent } from './components/books/books.component';
import { BooksRoutingModule } from "./books-routing.module";



@NgModule({
  declarations: [
    BooksListComponent,
    BookItemComponent,
    BookFormComponent,
    BooksComponent
  ],
  imports:[
    CommonModule,
    ReactiveFormsModule,
    BooksRoutingModule,
    // Material UI //
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    // Material UI //
  ],
})
export class BooksModule {

}
