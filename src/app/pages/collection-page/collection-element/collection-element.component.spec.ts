import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';

import { CollectionElementComponent } from './collection-element.component';

describe('CollectionElementComponent', () => {
  let component: CollectionElementComponent;
  let fixture: ComponentFixture<CollectionElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectionElementComponent],
      imports: [MatCardModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionElementComponent);
    component = fixture.componentInstance;
    component.element = {
      description: '',
      discover: () => {},
      howManyFound: 0,
      iconStyle: {},
      id: 0,
      name: '',
      use: () => {},
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
