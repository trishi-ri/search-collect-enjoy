import { Storageble } from './storage.service';

class TestClass extends Storageble<number> {
  protected convertItemToStorageItem(item: number): string {
    return String(item);
  }
  protected convertStorageItemToItem(storageItem: string): number {
    return Number(storageItem);
  }
}

describe('Storageble', () => {
  it('save', () => {
    spyOn(localStorage, 'setItem');
    const testClass = new TestClass('test');
    testClass.save(2);
    expect(localStorage.setItem as jasmine.Spy).toHaveBeenCalledWith(
      'sce.test',
      '2'
    );
  });

  it('load', () => {
    spyOn(localStorage, 'getItem').and.returnValue('19');
    const testClass = new TestClass('test');
    const result = testClass.load();
    expect(result).toBe(19);
    expect(localStorage.getItem as jasmine.Spy).toHaveBeenCalledWith(
      'sce.test'
    );
  });

  it('clear', () => {
    spyOn(localStorage, 'removeItem');
    const testClass = new TestClass('test');
    testClass.clear();
    expect(localStorage.removeItem as jasmine.Spy).toHaveBeenCalledWith(
      'sce.test'
    );
  });
});
