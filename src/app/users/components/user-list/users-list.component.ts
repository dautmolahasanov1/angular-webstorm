import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/users/models/user.model';
import { UserService } from 'src/app/users/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: User[];
  hasAdminPermissions: boolean = false;
  loggedUser: User | null = null;

  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {
    this.users = [];
  }

  getUsers() {
    this.userService.getUsers$().subscribe({
      next: (response: unknown) => {
        this.users = response as User[];
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
      }
    });
  }

  ngOnInit(): void {
    this.loggedUser = this.authService.getLoggedUserFromLocalStorage();
    this.hasAdminPermissions = this.loggedUser?.role === "admin";
    this.getUsers();
  }

  onDelete(id: number): void {
    this.userService.deleteUser$(id).subscribe({
      next: () => {
        this.users = this.users.filter(({id: lId}) => lId !== id);
      }
    });
  }
}
