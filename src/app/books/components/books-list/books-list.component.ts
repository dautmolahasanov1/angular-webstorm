import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Book } from '../../models/books.model';
import { BookService } from '../../services/books.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  books: Book[];
  hasPermissions: boolean = false;

  constructor(
    private authService: AuthService,
    private bookService: BookService
  ) {
    this.books = [];
  }
  ngOnInit(): void {
    this.hasPermissions = this.authService.hasPermissions( "admin");

    this.bookService.getBooks$().subscribe({
      next: (response: unknown) => {
        this.books = response as Book[];
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
      }
    });
  }

  onDelete(id: number): void {
    this.bookService.deleteBook$(id).subscribe({
      next: () => {
        this.books = this.books.filter(({id: bId}) => bId !== id);
      }
    });
  }

}
