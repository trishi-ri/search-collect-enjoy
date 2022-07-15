import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTimerComponent } from './search-timer.component';
import { SearchTimerPipe } from './search-timer.pipe';

describe('SearchTimerComponent', () => {
  let component: SearchTimerComponent;
  let fixture: ComponentFixture<SearchTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchTimerComponent, SearchTimerPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
