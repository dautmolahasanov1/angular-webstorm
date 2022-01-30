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
  filteredListings: Listing[];
  hasPermissions: boolean = false;
  showFiltered: boolean = false;
  loggedUser: User | null = null;

  constructor(
    private authService: AuthService,
    private listingService: ListingService,
    private userService: UserService,
  ) {
    this.listings = [];
    this.filteredListings = [];
  }

  getListings() {
    this.listingService.getListings$().subscribe({
      next: (response: unknown) => {
        this.listings = response as Listing[];
        this.filteredListings = this.listings.filter(({ id })=> this.loggedUser?.liked.includes(id));
        console.log(this.listings, this.filteredListings)
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
      }
    });
  }

  getUser(): void {
    this.loggedUser = this.authService.getLoggedUserFromLocalStorage();
  }

  updateListingAndUser(): void {
    this.getListings();
    this.getUser();
  }

  toggleFilter(): void {
    this.showFiltered = !this.showFiltered;
    console.log("Fiiltering", this.showFiltered);
  }

  ngOnInit(): void {
    this.hasPermissions = this.authService.hasPermissions("admin");
    this.updateListingAndUser();
  }

  // This will toggle application for job
  onApply(listing: Listing): void {

    const newApplicant = !listing.applicantIds.includes(this.loggedUser?.id!)

    if (newApplicant) {
      this.listingService.applyForListing$(listing, this.loggedUser?.id!).subscribe({
        next: () => {
          this.getListings();
        }
      });
    } else {
      this.listingService.unapplyForListing$(listing, this.loggedUser?.id!).subscribe({
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

    this.listingService.likeListing$(listing).subscribe({
      next: () => {}
    });

    this.userService.addToLiked$(user, listing.id!).subscribe({
      next: () => {
      }
    });
    this.updateListingAndUser();
  }

  onUnlike({listing, user} : {listing: Listing, user: User}): void {
      this.listingService.unlikeListing$(listing).subscribe({
        next: () => {
        }
      });
      this.userService.removeFromLiked$(user, listing.id!).subscribe({
        next: () => {
        }
      });
      this.updateListingAndUser();
    }
}
