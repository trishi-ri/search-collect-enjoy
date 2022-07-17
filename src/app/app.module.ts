import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { loadConfigProvider } from './initialize/app.initializer';
import { CollectionPageModule } from '@collection-page/collection-page.module';
import { NgMaterialModule } from './shared/ng-material.module';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { SearchPageModule } from '@search-page/search-page.module';

@NgModule({
  declarations: [AppComponent, NavigationBarComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgMaterialModule,
    CollectionPageModule,
    SearchPageModule,
  ],
  providers: [loadConfigProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
