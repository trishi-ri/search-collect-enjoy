import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ICommand } from '@shared/models/command';
import { NgMaterialModule } from '@shared/ng-material.module';
import { IoC } from 'src/app/initialize/app.initializer';
import { IoCKeys } from 'src/assets/ioc-keys';

import { SearchTimerComponent } from './search-timer.component';
import { SearchTimerPipe } from './search-timer.pipe';
import { TimerTime } from './timer-time.model';

describe('SearchTimerComponent', () => {
  let component: SearchTimerComponent;
  let fixture: ComponentFixture<SearchTimerComponent>;
  IoC.resolve<ICommand>(
    IoCKeys.Registry,
    IoCKeys.SearchDefaultTimerTime,
    () => new TimerTime({ minutes: 0, seconds: 5 })
  ).execute();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchTimerComponent, SearchTimerPipe],
      imports: [NgMaterialModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.timerTime.asSeconds).toBe(5);
  });
});
