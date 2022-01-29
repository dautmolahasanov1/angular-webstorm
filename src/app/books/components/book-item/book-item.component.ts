import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Book } from '../../models/books.module';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss']
})
export class BookItemComponent implements OnInit {

  hasPermissions: boolean = false;

  constructor(
    private authService: AuthService
  ) {}
  @Input() book: Book | undefined;

  @Output() deleteClicked = new EventEmitter<number>()

  onDelete( ): void {
    this.deleteClicked.emit(this.book!.id)
  }

  ngOnInit(): void {
    this.hasPermissions = this.authService.hasPermissions("admin")
  }
}
