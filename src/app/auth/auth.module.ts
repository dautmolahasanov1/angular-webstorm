import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./components/login/login.component";
import { CommonModule } from "@angular/common";
import { AuthComponent } from './components/auth/auth.component';
import { AuthRoutingModule } from "./auth-routing.module";
// Material UI //
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
// Material UI //


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthRoutingModule,
    // Material UI //
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    // Material UI //
  ],
  declarations: [
    LoginComponent,
    AuthComponent,
  ]
})
export class AuthModule {

}
