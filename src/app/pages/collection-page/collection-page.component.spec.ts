import { HttpClient, HttpHandler } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollectionFilterComponent } from './collection-filter/collection-filter.component';

import { CollectionPageComponent } from './collection-page.component';
import { CollectionService } from './collection.service';

describe('CollectionPageComponent', () => {
  let component: CollectionPageComponent;
  let fixture: ComponentFixture<CollectionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectionPageComponent],
      providers: [CollectionService, HttpClient, HttpHandler],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
