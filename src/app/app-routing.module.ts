import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';

export const ROUTES: Routes = [
  { path: 'main', component: MainPageComponent },
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
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: '**', redirectTo: 'main' },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
