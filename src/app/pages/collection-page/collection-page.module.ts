import { NgModule } from '@angular/core';
import { CollectionElementComponent } from './collection-element/collection-element.component';
import { CollectionFilterComponent } from './collection-filter/collection-filter.component';
import { CollectionPageComponent } from './collection-page.component';
import { CollectionPaginatorComponent } from './collection-paginator/collection-paginator.component';
import { Routes, RouterModule } from '@angular/router';
import { CollectionGeneratorService } from './collection-generator.service';
import { CommonModule } from '@angular/common';
import { NgMaterialModule } from '@shared/ng-material.module';

const routes: Routes = [
  {
    path: '',
    component: CollectionPageComponent,
  },
];

const COMPONENTS = [
  CollectionPageComponent,
  CollectionElementComponent,
  CollectionFilterComponent,
  CollectionPaginatorComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, RouterModule.forChild(routes), NgMaterialModule],
  providers: [CollectionGeneratorService],
  exports: [RouterModule],
})
export class CollectionPageModule {}
