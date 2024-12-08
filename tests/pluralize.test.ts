
import { pluralize } from '../src/pluralize';

describe('pluralize', () => {
  test('should return singular form for count of 1', () => {
    expect(pluralize(1, 'cat')).toBe('1 cat');
    expect(pluralize(1, 'dog')).toBe('1 dog');
    expect(pluralize(1, 'item')).toBe('1 item');
  });

  test('should return plural form for count of 0', () => {
    expect(pluralize(0, 'cat')).toBe('0 cats');
    expect(pluralize(0, 'dog')).toBe('0 dogs');
    expect(pluralize(0, 'item')).toBe('0 items');
  });

  test('should return plural form for counts greater than 1', () => {
    expect(pluralize(2, 'cat')).toBe('2 cats');
    expect(pluralize(5, 'dog')).toBe('5 dogs');
    expect(pluralize(100, 'item')).toBe('100 items');
  });

  test('should handle negative numbers', () => {
    expect(pluralize(-1, 'cat')).toBe('-1 cats');
    expect(pluralize(-5, 'dog')).toBe('-5 dogs');
  });

  test('should handle decimal numbers', () => {
    expect(pluralize(1.0, 'cat')).toBe('1 cat');
    expect(pluralize(1.5, 'dog')).toBe('1.5 dogs');
    expect(pluralize(0.5, 'item')).toBe('0.5 items');
  });
});