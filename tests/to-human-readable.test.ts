// tests/to-human-readable.test.ts:

import { toHumanReadable } from '../src/to-human-readable';

describe('toHumanReadable', () => {
  it('should return "10 years and more" for seconds greater than 10 years', () => {
    const seconds = 10 * 365 * 24 * 60 * 60 + 1;
    expect(toHumanReadable(seconds)).toBe('10 years and more');
  });

  it('should return "3 years and more" for seconds greater than 3 years but less than 10 years', () => {
    const seconds = 4 * 365 * 24 * 60 * 60;
    expect(toHumanReadable(seconds)).toBe('3 years and more');
  });

  it('should return correct human-readable format for various durations', () => {
    expect(toHumanReadable(365 * 24 * 60 * 60)).toBe('1 year');
    expect(toHumanReadable(24 * 60 * 60)).toBe('1 day');
    expect(toHumanReadable(60 * 60)).toBe('1 hour');
    expect(toHumanReadable(60)).toBe('1 minute');
    expect(toHumanReadable(1)).toBe('1 second');
  });

  it('should handle complex durations', () => {
    const seconds = 2 * 365 * 24 * 60 * 60 + 3 * 24 * 60 * 60 + 4 * 60 * 60 + 5 * 60 + 6;
    expect(toHumanReadable(seconds)).toBe('2 years and 3 days');
  });

  it('should throw an error for negative input', () => {
    expect(() => toHumanReadable(-1)).toThrow('Input must be a non-negative number');
  });

  // New tests for Date input
  describe('Date input', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2024-01-01T00:00:00Z'));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should handle Date objects', () => {
      const twoMinutesAgo = new Date('2023-12-31T23:58:00Z');
      expect(toHumanReadable(twoMinutesAgo)).toBe('2 minutes');
    });

    it('should handle Date objects with complex durations', () => {
      const twentyFiveHoursAgo = new Date('2023-12-30T23:00:00Z');
      expect(toHumanReadable(twentyFiveHoursAgo)).toBe('1 day');
    });
  });

  // New tests for String input (ISO format)
  describe('ISO String input', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2024-01-01T00:00:00Z'));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should handle ISO date strings', () => {
      const oneHourAgo = '2023-12-31T23:00:00Z';
      expect(toHumanReadable(oneHourAgo)).toBe('1 hour');
    });

    it('should handle ISO strings with complex durations', () => {
      const twoDaysAgo = '2023-12-30T00:00:00Z';
      expect(toHumanReadable(twoDaysAgo)).toBe('2 days');
    });

    it('should throw error for invalid date strings', () => {
      expect(() => toHumanReadable('invalid-date')).toThrow('Invalid date string');
      expect(() => toHumanReadable('2024-13-45')).toThrow('Invalid date string');
    });
  });

  // Tests for milliseconds input
  describe('Milliseconds input', () => {
    it('should handle milliseconds input', () => {
      // 60000ms = 60 seconds
      expect(toHumanReadable(60)).toBe('1 minute');
      // 3600000ms = 3600 seconds
      expect(toHumanReadable(3600)).toBe('1 hour');
    });

    it('should handle large millisecond values', () => {
      // 86400000ms = 86400 seconds = 1 day
      const oneDayInSeconds = 24 * 60 * 60;
      expect(toHumanReadable(oneDayInSeconds)).toBe('1 day');
    });
  });

  // Edge cases
  describe('Edge cases', () => {
    it('should handle zero', () => {
      expect(toHumanReadable(0)).toBe('0 seconds');
    });

    it('should throw error for invalid input types', () => {
      // @ts-expect-error Testing invalid input
      expect(() => toHumanReadable({})).toThrow('Input must be a number, Date, or ISO string');
      // @ts-expect-error Testing invalid input
      expect(() => toHumanReadable(null)).toThrow('Input must be a number, Date, or ISO string');
      // @ts-expect-error Testing invalid input
      expect(() => toHumanReadable(undefined)).toThrow('Input must be a number, Date, or ISO string');
    });
  });
});