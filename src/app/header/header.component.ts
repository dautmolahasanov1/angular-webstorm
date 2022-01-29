import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userRole: string | null = null;
  
  destroy$ = new Subject<boolean>()

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.getUserRole$().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (role: string | null) => this.userRole = role,
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
