import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryPageComponent } from './inventory-page.component';
import { NgMaterialModule } from '@shared/ng-material.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: InventoryPageComponent,
  },
];

@NgModule({
  declarations: [InventoryPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes), NgMaterialModule],
})
export class InventoryPageModule {}
