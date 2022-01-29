import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
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
    private listingService: ListingService
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

    this.getListings()
  }

  onDelete(id: number): void {
    this.listingService.deleteListing$(id).subscribe({
      next: () => {
        this.listings = this.listings.filter(({id: lId}) => lId !== id);
      }
    });
  }

  onLike(listing: Listing): void {
    this.listingService.likeListing$(listing).subscribe({
      next: () => {
        this.getListings();
      }
    });
  }

  onUnlike(listing: Listing): void {
      this.listingService.unlikeListing$(listing).subscribe({
        next: () => {
          this.getListings();
        }
      });
    }
}
