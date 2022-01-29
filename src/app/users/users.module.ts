import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { Route, RouterModule } from "@angular/router";

// ===== MATERIAL UI ===== //
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
// ===== MATERIAL UI ===== //

import { UserFormComponent } from "./components/user-form/user-form.component";
import { UserItemComponent } from "./components/user-item/user-item.component";
import { UsersListComponent } from "./components/user-list/users-list.component";
import { UsersComponent } from './components/users/users.component';
import { UsersRoutingModule } from "./users-routing.module";



@NgModule({
  declarations: [
    UsersListComponent,
    UserItemComponent,
    UserFormComponent,
    UsersComponent
  ],
  imports:[
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    // Material UI //
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    MatSelectModule,
    // Material UI //
  ],
})
export class UsersModule {

}
