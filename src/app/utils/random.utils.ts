export class RandomUtils {
  public static intFromInterval(
    min = 0,
    max = 100,
    excludeMax?: boolean
  ): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + (excludeMax ? 0 : 1))) + min;
  }

  public static getRandomElement<T>(array: T[]): T {
    return array[RandomUtils.intFromInterval(0, array.length - 1)];
  }
}
