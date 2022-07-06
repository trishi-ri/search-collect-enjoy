import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { loadConfigProvider } from './initialize/app.initializer';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CollectionPageComponent } from './pages/collection-page/collection-page.component';
import { CollectionElementComponent } from './pages/collection-page/collection-element/collection-element.component';
import { CollectionFilterComponent } from './pages/collection-page/collection-filter/collection-filter.component';
import { CollectionPaginatorComponent } from './pages/collection-page/collection-paginator/collection-paginator.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CollectionPageComponent,
    CollectionElementComponent,
    CollectionFilterComponent,
    CollectionPaginatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    HttpClientModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatPaginatorModule,
  ],
  providers: [loadConfigProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
