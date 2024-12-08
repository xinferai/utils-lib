// tests/is-plain-value.test.ts

import { isPlainValue } from '../src/is-plain-value';

describe('isPlainValue', () => {
  test('should return true for null and undefined', () => {
    expect(isPlainValue(null)).toBe(true);
    expect(isPlainValue(undefined)).toBe(true);
  });

  test('should return true for finite numbers', () => {
    expect(isPlainValue(42)).toBe(true);
    expect(isPlainValue(0)).toBe(true);
    expect(isPlainValue(-3.14)).toBe(true);
  });

  test('should return false for non-finite numbers', () => {
    expect(isPlainValue(Infinity)).toBe(false);
    expect(isPlainValue(-Infinity)).toBe(false);
    expect(isPlainValue(NaN)).toBe(false);
  });

  test('should return true for strings and booleans', () => {
    expect(isPlainValue('hello')).toBe(true);
    expect(isPlainValue('')).toBe(true);
    expect(isPlainValue(true)).toBe(true);
    expect(isPlainValue(false)).toBe(true);
  });

  test('should return true for valid Date objects', () => {
    expect(isPlainValue(new Date())).toBe(true);
  });

  test('should return false for invalid Date objects', () => {
    expect(isPlainValue(new Date('invalid'))).toBe(false);
  });

  test('should return false for objects, arrays, and functions', () => {
    expect(isPlainValue({})).toBe(false);
    expect(isPlainValue([])).toBe(false);
    expect(isPlainValue(() => {})).toBe(false);
  });
});