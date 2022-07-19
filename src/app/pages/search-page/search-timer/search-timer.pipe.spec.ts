import { SearchTimerPipe } from './search-timer.pipe';

describe('SearchTimerPipe', () => {
  let pipe: SearchTimerPipe;

  beforeEach(() => (pipe = new SearchTimerPipe()));
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transform', () => {
    expect(pipe.transform(undefined)).toBe('');
    expect(pipe.transform({ minutes: 0, seconds: 0 })).toBe('00:00');
    expect(pipe.transform({ minutes: 1, seconds: 2 })).toBe('01:02');
    expect(pipe.transform({ minutes: 10, seconds: 20 })).toBe('10:20');
  });
});
