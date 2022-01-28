import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { BookItemComponent } from './book-item/book-item.component';
import { BooksListComponent } from './books-list/books-list.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';

// ===== MATERIAL UI ===== //
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
// ===== MATERIAL UI ===== //

import { HttpClientModule } from '@angular/common/http';
import { Route, RouterModule } from '@angular/router';
import { BookFormComponent } from './book-form/book-form.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Route[] = [
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
    component: MainComponent
  },
]
@NgModule({
  declarations: [
    AppComponent,
    BookFormComponent,
    BookItemComponent,
    BooksListComponent,
    HeaderComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    // Material UI //
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    // Material UI //
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
