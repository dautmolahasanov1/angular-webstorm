import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../models/login.model';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.formGroup = new FormGroup({ // initialize formGroup in the constructor with empty values
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]]
    })
  }

  onSubmit(): void {
    const body = this.formGroup.value as Login;
    this.authService.login$(body).subscribe({
      next: (user: User | null) => {
        if (!user) {
          this.router.navigate(["/auth"]);
        }

        this.authService.setLoggedUserInLocalStorage(user!);
        this.router.navigate(["/main"]);
      }
    })
  }
}
