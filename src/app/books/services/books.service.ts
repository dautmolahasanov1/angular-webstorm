import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Book } from "../models/books.model";

@Injectable({
  providedIn: 'root' // singleton
  // providedIn: 'module-name' // scoped
})
export class BookService {
  constructor(private http: HttpClient){
  }

  getBooks$(): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.apiUrl}/books`);
  }

  getBook$(id: number): Observable<Book> {
    return this.http.get<Book>(`${environment.apiUrl}/books/${id}`);
  }

  postBook$(book: Book): Observable<Book> {
    return this.http.post<Book>(`${environment.apiUrl}/books`, book);
  }

  putBook$(book: Book): Observable<Book> {
    return this.http.put<Book>(`${environment.apiUrl}/books/${book.id}`, book);
  }

  deleteBook$(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/books/${id}`);
  }
}
