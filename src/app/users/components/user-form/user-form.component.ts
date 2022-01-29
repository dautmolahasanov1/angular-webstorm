import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of, Subject, switchMap, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  isAdmin: boolean = false;
  destroy$ = new Subject<boolean>();

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.formGroup = new FormGroup({ // initialize formGroup in the constructor with empty values
      id: new FormControl(''),
      name: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
      role: new FormControl(''),
      liked: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.route.params.pipe(
        switchMap((params: Params) => {
            const { id } = params;
            if (id) {
                return this.userService.getUser$(id);
            }
            return of(null);
        }),
        takeUntil(this.destroy$)
    ).subscribe({
      next: (params) => {
        console.log(params);
        this.buildForm(params);
      }
    })
    this.isAdmin = this.authService.getLoggedUserFromLocalStorage()?.role === "admin"
  }

  ngOnDestroy(): void {
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
  }

  onSubmit(): void {
    const user = this.formGroup.value as User;

    let request$;

    if (user.id) {
      request$ = this.userService.putUser$(user);
    } else {
      request$ = this.userService.postUser$(user);
    }

    request$.subscribe({
      next: () => {
        this.router.navigate(["/main", "users"])
      }
    });
  }

  private buildForm(user?: User | null ): void {
    this.formGroup = this.fb.group({
      id: user?.id,
      name: [ user?.name || "", ],
      username: [ user?.username || "", [Validators.required]],
      password: [ user?.password || "", [Validators.required]],
      role: [user?.role || "user"],
      liked: [ user?.liked || []],
    });
  }
}
