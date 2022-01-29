import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from 'src/app/users/services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {

  isAdmin: boolean = false;
  isUser: boolean = false;
  userId: number | null = null;
  loggedUser: User | null = null

  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Input() user: User | null = null;

  @Output() deleteClicked = new EventEmitter<number>()

  onDelete(): void { // TODO logout current user if this is the one that is deleted
    this.deleteClicked.emit(this.user!.id);
  }

  ngOnInit(): void {
    this.loggedUser = this.authService.getLoggedUserFromLocalStorage();
    this.userService.getUser$(this.user?.id!).subscribe({
      next: (user => this.loggedUser = user)
    });
    this.isAdmin = this.loggedUser?.role === "admin";
    this.isUser = this.loggedUser?.role === "user";
  }
}
