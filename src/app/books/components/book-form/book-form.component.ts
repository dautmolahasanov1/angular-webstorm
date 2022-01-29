import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of, Subject, switchMap, takeUntil } from 'rxjs';
import { Book } from '../../models/books.module';
import { BookService } from '../../services/books.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;

  destroy$ = new Subject<boolean>();

  constructor(
    private bookService: BookService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.formGroup = new FormGroup({ // initialize formGroup in the constructor with empty values
      id: new FormControl(''),
      author: new FormControl(''),
      title: new FormControl(''),
      description: new FormControl(''),
    });
  }

  ngOnInit(): void {

    this.route.params.pipe(
        switchMap((params: Params) => {
            const { id } = params;
            if (id) {
                return this.bookService.getBook$(id);
            }
            return of(null);
        }),
        takeUntil(this.destroy$)
    ).subscribe({
      next: (params) => {
        console.log(params);
        this.buildForm(params);
      }
    })
  }

  ngOnDestroy(): void {
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
  }

  onSubmit(): void {
    const book = this.formGroup.value as Book;

    let request$;

    if (book.id) {
      request$ = this.bookService.putBook$(book);
    } else {
      request$ = this.bookService.postBook$(book);
    }


    request$.subscribe({
      next: (response) => {
        this.router.navigate(["/books"])
      }
    });
  }

  private buildForm(book?: Book | null ): void {
    this.formGroup = this.fb.group({
      id: book?.id,
      author: [ book?.author || "", [Validators.required]],
      description: [ book?.description || ""],
      title: [ book?.title || "", [Validators.required]]
    });
  }
}
