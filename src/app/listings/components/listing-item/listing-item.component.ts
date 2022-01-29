import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Listing } from '../../models/listing.model';

@Component({
  selector: 'app-listing-item',
  templateUrl: './listing-item.component.html',
  styleUrls: ['./listing-item.component.scss']
})
export class ListingItemComponent implements OnInit {

  isAdmin: boolean = false;
  isUser: boolean = false;

  constructor(
    private authService: AuthService
  ) {}
  @Input() listing: Listing | undefined;

  @Output() applyClicked = new EventEmitter<number>() // TODO send both ids ? ?? ?
  @Output() deleteClicked = new EventEmitter<number>()
  @Output() likeClicked = new EventEmitter<Listing>()
  @Output() unlikeClicked = new EventEmitter<Listing>()

  onDelete(): void {
    this.deleteClicked.emit(this.listing!.id);
  }

  onApply(): void {
    this.applyClicked.emit(this.listing!.id);
  }

  onLike(): void {
    this.likeClicked.emit(this.listing!);
  }

  onUnlike(): void {
    this.unlikeClicked.emit(this.listing!);
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.hasPermissions("admin");
    this.isUser = this.authService.hasPermissions("user");
  }
}
