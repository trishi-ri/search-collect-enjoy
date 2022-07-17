import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: 'search',
    loadChildren: () =>
      import('@search-page/search-page.module').then((m) => m.SearchPageModule),
  },
  {
    path: 'collection',
    loadChildren: () =>
      import('@collection-page/collection-page.module').then(
        (m) => m.CollectionPageModule
      ),
  },
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: '**', redirectTo: 'search' },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
