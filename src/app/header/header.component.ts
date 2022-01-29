import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  hasUser: boolean = false;

  destroy$ = new Subject<boolean>()

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.getHasUser$().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (hasUser: boolean) => this.hasUser = hasUser,
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(["/auth", "login"])
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
