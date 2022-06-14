import { Command } from '../commands';
import { IoCContainer } from './ioc.service';

describe('IoCContainer', () => {
  let container: IoCContainer;

  beforeEach(() => (container = new IoCContainer()));

  it('default keys', () => {
    expect(container.keys).toEqual(['IoC.Registry']);
  });

  it('resolve IoC.Registry', () => {
    container.resolve<Command>('IoC.Registry', 'get two', () => 2).execute();

    expect(container.keys).toEqual(['IoC.Registry', 'get two']);
    expect(container.resolve<number>('get two')).toBe(2);
  });

  it('error "not found ioc-record by key"', () => {
    expect(() => container.resolve('test')).toThrowError(
      'not found ioc-record by key "test"'
    );
  });
});
