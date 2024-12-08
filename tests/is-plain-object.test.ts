// tests/is-plain-object.test.ts

import { isPlainObject } from '../src/is-plain-object';

describe('isPlainObject', () => {
  test('should return false for null and non-objects', () => {
    expect(isPlainObject(null)).toBe(false);
    expect(isPlainObject(42)).toBe(false);
    expect(isPlainObject('string')).toBe(false);
    expect(isPlainObject(true)).toBe(false);
  });

  test('should return true for empty objects and arrays', () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject([])).toBe(true);
  });

  test('should return true for objects with plain values', () => {
    expect(isPlainObject({ a: 1, b: 'string', c: true, d: null })).toBe(true);
  });

  test('should return true for nested plain objects', () => {
    expect(isPlainObject({ a: { b: { c: 42 } } })).toBe(true);
  });

  test('should return true for arrays with plain values', () => {
    expect(isPlainObject([1, 'string', true, null])).toBe(true);
  });

  test('should return false for objects with non-plain values', () => {
    expect(isPlainObject({ a: 1, b: () => {} })).toBe(false);
    expect(isPlainObject({ a: 1, b: Symbol() })).toBe(false);
  });

  test('should handle circular references', () => {
    const obj = { a: 1 } as any;
    obj.b = obj;
    expect(isPlainObject(obj)).toBe(false);
  });
});