// tests/deep-equal.test.ts

import { deepEqual } from '../src/deep-equal';

describe('deepEqual', () => {
  describe('primitive types', () => {
    it('should compare numbers correctly', () => {
      expect(deepEqual(1, 1)).toBe(true);
      expect(deepEqual(1, 2)).toBe(false);
      expect(deepEqual(0, -0)).toBe(true);
      expect(deepEqual(NaN, NaN)).toBe(true);
    });

    it('should compare strings correctly', () => {
      expect(deepEqual('hello', 'hello')).toBe(true);
      expect(deepEqual('hello', 'world')).toBe(false);
      expect(deepEqual('', '')).toBe(true);
    });

    it('should compare booleans correctly', () => {
      expect(deepEqual(true, true)).toBe(true);
      expect(deepEqual(false, false)).toBe(true);
      expect(deepEqual(true, false)).toBe(false);
    });

    it('should handle null and undefined', () => {
      expect(deepEqual(null, null)).toBe(true);
      expect(deepEqual(undefined, undefined)).toBe(true);
      expect(deepEqual(null, undefined)).toBe(false);
    });
  });

  describe('dates', () => {
    it('should compare dates correctly', () => {
      const date1 = new Date('2024-01-01');
      const date2 = new Date('2024-01-01');
      const date3 = new Date('2024-01-02');

      expect(deepEqual(date1, date2)).toBe(true);
      expect(deepEqual(date1, date3)).toBe(false);
    });
  });

  describe('arrays', () => {
    it('should compare simple arrays correctly', () => {
      expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
      expect(deepEqual([1, 2, 3], [1, 2, 4])).toBe(false);
      expect(deepEqual([], [])).toBe(true);
    });

    it('should compare nested arrays correctly', () => {
      expect(deepEqual([1, [2, 3]], [1, [2, 3]])).toBe(true);
      expect(deepEqual([1, [2, 3]], [1, [2, 4]])).toBe(false);
    });

    it('should handle arrays of different lengths', () => {
      expect(deepEqual([1, 2, 3], [1, 2])).toBe(false);
      expect(deepEqual([1], [1, 2])).toBe(false);
    });
  });

  describe('regular expressions', () => {
    it('should compare regular expressions correctly', () => {
      expect(deepEqual(/abc/, /abc/)).toBe(true);
      expect(deepEqual(/abc/g, /abc/g)).toBe(true);
      expect(deepEqual(/abc/, /def/)).toBe(false);
      expect(deepEqual(/abc/g, /abc/i)).toBe(false);
    });
  });

  describe('objects', () => {
    it('should compare simple objects correctly', () => {
      expect(deepEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
      expect(deepEqual({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);
      expect(deepEqual({}, {})).toBe(true);
    });

    it('should compare nested objects correctly', () => {
      expect(deepEqual(
        { a: 1, b: { c: 2, d: 3 } },
        { a: 1, b: { c: 2, d: 3 } }
      )).toBe(true);
      expect(deepEqual(
        { a: 1, b: { c: 2, d: 3 } },
        { a: 1, b: { c: 2, d: 4 } }
      )).toBe(false);
    });

    it('should handle objects with different keys', () => {
      expect(deepEqual({ a: 1, b: 2 }, { a: 1, c: 2 })).toBe(false);
      expect(deepEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
    });

    it('should handle complex nested structures', () => {
      const obj1 = {
        a: [1, 2, { b: 3 }],
        c: { d: new Date('2024-01-01'), e: /test/g }
      };
      const obj2 = {
        a: [1, 2, { b: 3 }],
        c: { d: new Date('2024-01-01'), e: /test/g }
      };
      const obj3 = {
        a: [1, 2, { b: 4 }],
        c: { d: new Date('2024-01-01'), e: /test/g }
      };

      expect(deepEqual(obj1, obj2)).toBe(true);
      expect(deepEqual(obj1, obj3)).toBe(false);
    });
  });
});