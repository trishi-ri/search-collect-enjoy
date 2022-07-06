import { RandomUtils } from './random.utils';

describe('RandomUtils', () => {
  describe('intFromInterval', () => {
    it('default result interval intFromInterval from 0 to 100', () => {
      const result = RandomUtils.intFromInterval();
      expect(result >= 0).toBeTrue();
      expect(result <= 100).toBeTrue();
    });

    it('result interval intFromInterval from 1 to 3 (exclude max)', () => {
      const result = RandomUtils.intFromInterval(1, 3, true);
      expect(result >= 1).toBeTrue();
      expect(result < 3).toBeTrue();
    });
  });

  describe('getRandomElement', () => {
    it('random elemenet from interval', () => {
      const array = ['qwerty', { test: 2 }, 24];
      const randomElemenet = RandomUtils.getRandomElement(array);
      expect(array.includes(randomElemenet)).toBe(true);
    });
  });
});
