import { HttpClient, HttpHandler } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { CollectionPageComponent } from './collection-page.component';
import { CollectionPageModule } from './collection-page.module';
import { CollectionService } from './collection.service';
import { CollectionFilterEnum } from './models';

const mockCollectionService: Partial<CollectionService> = {
  filter: { options: [], value: CollectionFilterEnum.all },
};

describe('CollectionPageComponent', () => {
  let component: CollectionPageComponent;
  let fixture: ComponentFixture<CollectionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectionPageComponent],
      imports: [CollectionPageModule],
      providers: [
        { provide: CollectionService, useValue: mockCollectionService },
        HttpClient,
        HttpHandler,
      ],
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
