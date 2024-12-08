// tests/deep-clone.test.ts

import { deepClone } from '../src/deep-clone';

describe('deepClone', () => {
  test('should handle primitive values', () => {
    expect(deepClone(42)).toBe(42);
    expect(deepClone('hello')).toBe('hello');
    expect(deepClone(true)).toBe(true);
    expect(deepClone(null)).toBeNull();
    expect(deepClone(undefined)).toBeUndefined();
  });

  test('should clone Date objects', () => {
    const date = new Date();
    const clonedDate = deepClone(date);
    
    expect(clonedDate).toBeInstanceOf(Date);
    expect(clonedDate.getTime()).toBe(date.getTime());
    expect(clonedDate).not.toBe(date);
  });

  test('should clone RegExp objects', () => {
    const regex = /test/gi;
    const clonedRegex = deepClone(regex);
    
    expect(clonedRegex).toBeInstanceOf(RegExp);
    expect(clonedRegex.source).toBe(regex.source);
    expect(clonedRegex.flags).toBe(regex.flags);
    expect(clonedRegex).not.toBe(regex);
  });

  test('should clone arrays', () => {
    const array = [1, 'test', { a: 1 }, [2, 3]];
    const clonedArray = deepClone(array);
    
    expect(clonedArray).toEqual(array);
    expect(clonedArray).not.toBe(array);
    expect(clonedArray[2]).not.toBe(array[2]);
    expect(clonedArray[3]).not.toBe(array[3]);
  });

  test('should clone Set objects', () => {
    const set = new Set([1, 'test', { a: 1 }]);
    const clonedSet = deepClone(set);
    
    expect(clonedSet).toBeInstanceOf(Set);
    expect(clonedSet).not.toBe(set);
    expect(Array.from(clonedSet)).toEqual(Array.from(set));
    
    const originalObj = Array.from(set)[2];
    const clonedObj = Array.from(clonedSet)[2];
    expect(clonedObj).toEqual(originalObj);
    expect(clonedObj).not.toBe(originalObj);
  });

  test('should clone Map objects', () => {
    const map = new Map<any, any>([
      ['key1', 'value1'],
      [{ a: 1 }, { b: 2 }]
    ]);
    const clonedMap = deepClone(map);
    
    expect(clonedMap).toBeInstanceOf(Map);
    expect(clonedMap).not.toBe(map);
    expect(clonedMap.get('key1')).toBe('value1');
    
    const originalKey = Array.from(map.keys())[1];
    const originalValue = map.get(originalKey);
    const clonedKey = Array.from(clonedMap.keys())[1];
    const clonedValue = clonedMap.get(clonedKey);
    
    expect(clonedKey).toEqual(originalKey);
    expect(clonedKey).not.toBe(originalKey);
    expect(clonedValue).toEqual(originalValue);
    expect(clonedValue).not.toBe(originalValue);
  });

  test('should clone nested objects', () => {
    const obj = {
      a: 1,
      b: {
        c: 2,
        d: {
          e: 3
        }
      }
    };
    const clonedObj = deepClone(obj);
    
    expect(clonedObj).toEqual(obj);
    expect(clonedObj).not.toBe(obj);
    expect(clonedObj.b).not.toBe(obj.b);
    expect(clonedObj.b.d).not.toBe(obj.b.d);
  });

  test('should handle circular references', () => {
    const obj: any = {
      a: 1,
      b: {
        c: 2
      }
    };
    obj.circular = obj;
    obj.b.circular = obj.b;
    
    const clonedObj = deepClone(obj);
    
    expect(clonedObj).toEqual(obj);
    expect(clonedObj).not.toBe(obj);
    expect(clonedObj.circular).toBe(clonedObj);
    expect(clonedObj.b.circular).toBe(clonedObj.b);
  });

  test('should preserve object prototypes', () => {
    class TestClass {
      constructor(public value: number) {}
      getValue() { return this.value; }
    }
    
    const obj = new TestClass(42);
    const clonedObj = deepClone(obj);
    
    expect(clonedObj).toBeInstanceOf(TestClass);
    expect(clonedObj.getValue()).toBe(42);
    expect(clonedObj).not.toBe(obj);
  });
});