// tests/convert-date-cases.test.ts:

import {
  convertCase,
  convertObject,
  camelToSnake,
  snakeToCamel,
  endsWithAtToDate
} from '../src/convert-date-cases';

describe('convert-date-cases Functions', () => {

  describe('convertCase', () => {
    it('should convert camelCase to snake_case', () => {
      expect(convertCase('camelCaseString', 'snake')).toBe('camel_case_string');
    });
  
    it('should convert snake_case to camelCase', () => {
      expect(convertCase('snake_case_string', 'camel')).toBe('snakeCaseString');
    });
  
    it('should return the original string for "none" case', () => {
      expect(convertCase('originalString', 'none')).toBe('originalString');
    });
  });

  describe('convertObject', () => {
    it('should convert object keys to snake_case', () => {
      const obj = { camelCase: 'value' };
      expect(convertObject(obj, 'snake')).toEqual({ camel_case: 'value' });
    });

    it('should convert object keys to camelCase', () => {
      const obj = { snake_case: 'value' };
      expect(convertObject(obj, 'camel')).toEqual({ snakeCase: 'value' });
    });

    it('should handle nested objects and arrays', () => {
      const obj = { outerKey: { innerKey: 'value' }, arr: [{ nestedKey: 'value' }] };
      expect(convertObject(obj, 'snake')).toEqual({
        outer_key: { inner_key: 'value' },
        arr: [{ nested_key: 'value' }]
      });
    });

    it('should convert date strings to Date objects when convertDates is true', () => {
      const obj = { createdAt: '2023-08-10T00:00:00Z' };
      const result = convertObject(obj, 'snake', true);
      expect(result.created_at).toBeInstanceOf(Date);
    });
  });

  describe('camelToSnake', () => {
    it('should convert object keys from camelCase to snake_case', () => {
      const obj = { camelCaseKey: 'value', updatedAt: '2023-08-11T00:00:00Z', createdAt: new Date() };
      const result = camelToSnake(obj);
      expect(result.camel_case_key).toBe('value');
      expect(result.updated_at).toBeInstanceOf(Date);
      expect(result.created_at).toBeInstanceOf(Date);
    });
  });

  describe('snakeToCamel', () => {
    it('should convert object keys from snake_case to camelCase', () => {
      const obj = { snake_case_key: 'value', created_at: '2023-08-10T00:00:00Z', updatedAt: new Date() };
      const result = snakeToCamel(obj);
      expect(result.snakeCaseKey).toBe('value');
      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe('endsWithAtToDate', () => {
    it('should convert date strings ending with "_at" or "At" to Date objects', () => {
      const obj = { created_at: '2023-08-10T00:00:00Z', updatedAt: '2023-08-11T00:00:00Z', datedAt: new Date() };
      const result = endsWithAtToDate(obj);
      //console.log(result);
      expect(result.created_at).toBeInstanceOf(Date);
      expect(result.updatedAt).toBeInstanceOf(Date);
      expect(result.datedAt).toBeInstanceOf(Date);
    });

    it('should not convert non-date strings', () => {
      const obj = { name: 'John', age: '30' };
      const result = endsWithAtToDate(obj);
      expect(result).toEqual(obj);
    });
  });
});