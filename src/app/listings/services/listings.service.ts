import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Listing } from "../models/listing.model";

@Injectable({
  providedIn: 'root' // singleton
  // providedIn: 'module-name' // scoped
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

  likeListing$(listing: Listing): Observable<Listing> {
    const likedListing = {...listing, likeCount: listing.likeCount + 1}
    console.log(listing);
    console.log(likedListing);
    return this.http.put<Listing>(`${environment.apiUrl}/listings/${listing.id}`, likedListing)
  }

  unlikeListing$(listing: Listing): Observable<Listing> {
    const likedListing = {...listing, likeCount: listing.likeCount - 1 }
    console.log(listing);
    console.log(likedListing);
    return this.http.put<Listing>(`${environment.apiUrl}/listings/${listing.id}`, likedListing)
  }
}
