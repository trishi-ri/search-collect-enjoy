import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPageComponent } from './search-page.component';
import { RouterModule, Routes } from '@angular/router';
import { NgMaterialModule } from '@shared/ng-material.module';
import { SearchTimerComponent } from './search-timer/search-timer.component';
import { SearchTimerPipe } from './search-timer/search-timer.pipe';

const routes: Routes = [
  {
    path: '',
    component: SearchPageComponent,
  },
];

@NgModule({
  declarations: [SearchPageComponent, SearchTimerComponent, SearchTimerPipe],
  imports: [CommonModule, RouterModule.forChild(routes), NgMaterialModule],
})
export class SearchPageModule {}
