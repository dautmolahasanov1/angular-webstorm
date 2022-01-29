import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/users/models/user.model';
import { UserService } from 'src/app/users/services/user.service';
import { Listing } from '../../models/listing.model';

@Component({
  selector: 'app-listing-item',
  templateUrl: './listing-item.component.html',
  styleUrls: ['./listing-item.component.scss']
})
export class ListingItemComponent implements OnInit {

  isAdmin: boolean = false;
  isUser: boolean = false;
  userId: number | null = null;

  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}
  @Input() listing: Listing | undefined;
  @Input() user: User | null = null;

  @Output() applyClicked = new EventEmitter<Listing>()
  @Output() deleteClicked = new EventEmitter<number>()
  @Output() likeClicked = new EventEmitter<{listing: Listing, user: User}>()
  @Output() unlikeClicked = new EventEmitter<{listing: Listing, user: User}>()

  onDelete(): void {
    this.deleteClicked.emit(this.listing!.id);
  }

  onApply(): void {
    this.applyClicked.emit(this.listing!);
  }

  onLike(): void {
    this.likeClicked.emit({listing: this.listing!, user: this.user!});
  }

  onUnlike(): void {
    this.unlikeClicked.emit({listing: this.listing!, user:  this.user!});
  }

  ngOnInit(): void {
    this.user = this.authService.getLoggedUserFromLocalStorage();
    this.userService.getUser$(this.user?.id!).subscribe({
      next: (user => this.user = user)
    });
    this.isAdmin = this.user?.role === "admin";
    this.isUser = this.user?.role === "user";

    console.log(this.userId, this.isAdmin, this.isUser)
  }
}
