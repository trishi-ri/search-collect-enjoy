import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';

const MODULES = [
  MatGridListModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatSnackBarModule,
  MatCardModule,
  MatChipsModule,
  MatButtonToggleModule,
  MatPaginatorModule,
];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class NgMaterialModule {}
