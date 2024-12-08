// tests/parse-date.test.ts

import { parseDate } from '../src/parse-date';

describe('parseDate', () => {
  it('should parse valid date strings', () => {
    const date = parseDate('2023-08-10T00:00:00Z');
    expect(date).toBeInstanceOf(Date);
    expect(date?.toISOString()).toBe('2023-08-10T00:00:00.000Z');
  });

  it('should return null for invalid date strings', () => {
    expect(parseDate('invalid-date')).toBeNull();
  });

  it('should return null for empty strings', () => {
    expect(parseDate('')).toBeNull();
  });
});