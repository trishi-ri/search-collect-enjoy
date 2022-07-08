import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AppModule } from 'src/app/app.module';
import { CollectionService } from '../collection.service';

import { CollectionFilterComponent } from './collection-filter.component';
import { CollectionFilterEnum } from './collection-filter.model';

const mockCollectionService: Partial<CollectionService> = {
  filter: { options: [], value: CollectionFilterEnum.all },
};

describe('CollectionFilterComponent', () => {
  let component: CollectionFilterComponent;
  let fixture: ComponentFixture<CollectionFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectionFilterComponent],
      imports: [MatButtonToggleModule],
      providers: [
        { provide: CollectionService, useValue: mockCollectionService },
        HttpClient,
        HttpHandler,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
