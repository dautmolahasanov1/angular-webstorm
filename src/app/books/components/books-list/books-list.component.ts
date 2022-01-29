import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/books.module';
import { BookService } from '../../services/books.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  books: Book[];

  constructor(private bookService: BookService) {
    this.books = [];
  }
  ngOnInit(): void {
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
