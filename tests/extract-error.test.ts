// tests/extract-error.test.ts

import { extractError } from '../src/extract-error';

describe('extractError', () => {
  it('should return error message when only message is present', () => {
    const error = new Error('Test error message');
    expect(extractError(error)).toBe('Test error message');
  });

  it('should return combined message when error cause with message is present', () => {
    const cause = new Error('Cause message');
    const error = new Error('Main message');
    (error as any).cause = cause;
    
    expect(extractError(error)).toBe('Main message, Cause message');
  });

  it('should return error message when cause exists but has no message', () => {
    const error = new Error('Main message');
    (error as any).cause = { someOtherProp: 'value' };
    
    expect(extractError(error)).toBe('Main message');
  });

  it('should return error toString when message is empty', () => {
    const error = new Error('');
    expect(extractError(error)).toBe('Error');
  });

  it('should handle null message', () => {
    const error = new Error();
    (error as any).message = null;
    expect(extractError(error)).toBe('Error: null');
  });

  it('should handle complex cause objects', () => {
    const error = new Error('Primary error');
    (error as any).cause = {
      message: 'Nested error',
      additionalInfo: 'Some extra info'
    };
    
    expect(extractError(error)).toBe('Primary error, Nested error');
  });
});