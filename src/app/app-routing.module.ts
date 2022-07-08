import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';

export const routes: Routes = [
  { path: 'main', component: MainPageComponent },
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
