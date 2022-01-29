import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of, Subject, switchMap, takeUntil } from 'rxjs';
import { Listing } from '../../models/listing.model';
import { ListingService } from '../../services/listings.service';

@Component({
  selector: 'app-listing-form',
  templateUrl: './listing-form.component.html',
  styleUrls: ['./listing-form.component.scss']
})
export class ListingFormComponent implements OnInit, OnDestroy {

  jobCategories: string[] = ["Front-end", "Back-end", "DevOps"] // TODO move to db.json

  formGroup: FormGroup;

  destroy$ = new Subject<boolean>();

  constructor(
    private listingService: ListingService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.formGroup = new FormGroup({ // initialize formGroup in the constructor with empty values
      id: new FormControl(''),
      type: new FormControl(''),
      description: new FormControl(''),
      title: new FormControl(''),
      likeCount: new FormControl(''),
      category: new FormControl(''),
    });
  }

  ngOnInit(): void {

    this.route.params.pipe(
        switchMap((params: Params) => {
            const { id } = params;
            if (id) {
                return this.listingService.getListing$(id);
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
    const listing = this.formGroup.value as Listing;

    let request$;

    if (listing.id) {
      request$ = this.listingService.putListing$(listing);
    } else {
      request$ = this.listingService.postListing$(listing);
    }


    request$.subscribe({
      next: () => {
        this.router.navigate(["/main", "listings"])
      }
    });
  }

  private buildForm(listing?: Listing | null ): void {
    this.formGroup = this.fb.group({
      id: listing?.id,
      type: [ listing?.type || "", [Validators.required]],
      description: [ listing?.description || ""],
      title: [ listing?.title || "", [Validators.required]],
      likeCount: [listing?.likeCount || 0],
      applicantIds: [listing?.applicantIds || []],
      category: [ listing?.category || "", [Validators.required]],
    });
  }
}
