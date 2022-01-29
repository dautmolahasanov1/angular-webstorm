import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Listing } from "../models/listing.model";

@Injectable({
  providedIn: 'root' // singleton
})
export class ListingService {
  constructor(private http: HttpClient){
  }

  getListings$(): Observable<Listing[]> {
    return this.http.get<Listing[]>(`${environment.apiUrl}/listings`);
  }

  getListing$(id: number): Observable<Listing> {
    return this.http.get<Listing>(`${environment.apiUrl}/listings/${id}`);
  }

  postListing$(listing: Listing): Observable<Listing> {
    return this.http.post<Listing>(`${environment.apiUrl}/listings`, listing);
  }

  putListing$(listing: Listing): Observable<Listing> {
    return this.http.put<Listing>(`${environment.apiUrl}/listings/${listing.id}`, listing);
  }

  deleteListing$(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/listings/${id}`);
  }

  applyForListing$(listing: Listing, applicantId: number): Observable<Listing> {
    const appliedListings = {...listing, applicantIds: [...listing.applicantIds, applicantId]}
    return this.http.put<Listing>(`${environment.apiUrl}/listings/${listing.id}`, appliedListings)
  }

  unapplyForListing$(listing: Listing, applicantId: number): Observable<Listing> {
    const appliedListings = {...listing, applicantIds: listing.applicantIds.filter((id) => id !== applicantId)}
    return this.http.put<Listing>(`${environment.apiUrl}/listings/${listing.id}`, appliedListings)
  }

  likeListing$(listing: Listing): Observable<Listing> {
    const likedListing = {...listing, likeCount: listing.likeCount + 1}
    return this.http.put<Listing>(`${environment.apiUrl}/listings/${listing.id}`, likedListing)
  }

  unlikeListing$(listing: Listing): Observable<Listing> {
    const likedListing = {...listing, likeCount: listing.likeCount - 1 }
    return this.http.put<Listing>(`${environment.apiUrl}/listings/${listing.id}`, likedListing)
  }
}
