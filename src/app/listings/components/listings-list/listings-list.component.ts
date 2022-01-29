import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/users/models/user.model';
import { UserService } from 'src/app/users/services/user.service';
import { Listing } from '../../models/listing.model';
import { ListingService } from '../../services/listings.service';

@Component({
  selector: 'app-listings-list',
  templateUrl: './listings-list.component.html',
  styleUrls: ['./listings-list.component.scss']
})
export class ListingsListComponent implements OnInit {

  listings: Listing[];
  hasPermissions: boolean = false;

  constructor(
    private authService: AuthService,
    private listingService: ListingService,
    private userService: UserService,
  ) {
    this.listings = [];
  }

  getListings() {
    this.listingService.getListings$().subscribe({
      next: (response: unknown) => {
        this.listings = response as Listing[];
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
      }
    });
  }

  ngOnInit(): void {
    this.hasPermissions = this.authService.hasPermissions( "admin");
    this.getListings();
  }

  // This will toggle application for job
  onApply(listing: Listing): void {
    const applicantId = this.authService.getLoggedUserFromLocalStorage()?.id

    const newApplicant = !listing.applicantIds.includes(applicantId!)

    if (newApplicant) {
      this.listingService.applyForListing$(listing, applicantId!).subscribe({
        next: () => {
          this.getListings();
        }
      });
    } else {
      this.listingService.unapplyForListing$(listing, applicantId!).subscribe({
        next: () => {
          this.getListings();
        }
      });
    }
  }

  onDelete(id: number): void {
    this.listingService.deleteListing$(id).subscribe({
      next: () => {
        this.listings = this.listings.filter(({id: lId}) => lId !== id);
      }
    });
  }

  onLike({listing, user} : {listing: Listing, user: User}): void {
    console.log(user);

    this.listingService.likeListing$(listing).subscribe({
      next: () => {
        this.getListings();
      }
    });

    console.log(123)
    this.userService.addToLiked$(user, listing.id!).subscribe({
      next: () => {
        this.getListings();
      }
    });
  }

  onUnlike({listing, user} : {listing: Listing, user: User}): void {
      this.listingService.unlikeListing$(listing).subscribe({
        next: () => {
          this.getListings();
        }
      });
      this.userService.removeFromLiked$(user, listing.id!).subscribe({
        next: () => {
          this.getListings();
        }
      });
    }
}
