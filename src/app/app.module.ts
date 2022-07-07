import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { loadConfigProvider } from './initialize/app.initializer';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CollectionPageModule } from '@collection-page/collection-page.module';
import { NgMaterialModule } from './ng-material.module';

@NgModule({
  declarations: [AppComponent, MainPageComponent],
  imports: [
    CommonModule,
    CollectionPageModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgMaterialModule,
  ],
  providers: [loadConfigProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
