import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NtPipesModule } from '@ntersol-ui/pipes';
import { MatTableModule } from '@angular/material/table';
import { SignaturePadModule } from 'angular2-signaturepad';
import { ImageViewerModule } from 'ng2-image-viewer';

import {
  MatIconModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatDialogModule,
  MatExpansionModule,
  MatTabsModule,
  MatCardModule,
  MatStepperModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatButtonToggleModule,
  MatPaginatorModule,
  MatTooltipModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSortModule,
} from '@angular/material';

const modules = [
  // Angular Materials
  MatIconModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatDialogModule,
  MatExpansionModule,
  MatTabsModule,
  MatCardModule,
  MatStepperModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatButtonToggleModule,
  MatPaginatorModule,
  MatTooltipModule,
  MatDatepickerModule,
  MatNativeDateModule,
  NtPipesModule,
  MatTableModule,
  SignaturePadModule,
  MatSortModule,
  ImageViewerModule,
];

@NgModule({
  imports: [
    // Angular
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ...modules,
  ],
  exports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule, // NgbModule,
    ...modules,
  ],
  declarations: [],
})
export class VendorModule {}
