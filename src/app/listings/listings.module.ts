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

import { ListingFormComponent } from "./components/listing-form/listing-form.component";
import { ListingItemComponent } from "./components/listing-item/listing-item.component";
import { ListingsListComponent } from "./components/listings-list/listings-list.component";
import { ListingsComponent } from './components/listings/listings.component';
import { ListingsRoutingModule } from "./listings-routing.module";



@NgModule({
  declarations: [
    ListingsListComponent,
    ListingItemComponent,
    ListingFormComponent,
    ListingsComponent
  ],
  imports:[
    CommonModule,
    ReactiveFormsModule,
    ListingsRoutingModule,
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
export class ListingsModule {

}
