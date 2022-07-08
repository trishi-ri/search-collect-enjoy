import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CollectionService } from '../collection.service';
import { CollectionPaginatorComponent } from './collection-paginator.component';

const mockCollectionService: Partial<CollectionService> = {
  paginator: { pageSizeOptions: [], pagination: new PageEvent() },
};

describe('CollectionPaginatorComponent', () => {
  let component: CollectionPaginatorComponent;
  let fixture: ComponentFixture<CollectionPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectionPaginatorComponent],
      imports: [MatPaginatorModule],
      providers: [
        { provide: CollectionService, useValue: mockCollectionService },
        HttpClient,
        HttpHandler,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
