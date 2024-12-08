// tests/sentence-case.test.ts

import { sentenceCase } from '../src/sentence-case';

describe('sentenceCase', () => {
  it('should insert space before capital letters in camelCase', () => {
    expect(sentenceCase('helloWorld')).toBe('hello world');
    expect(sentenceCase('ThisIsATest')).toBe('this is a test');
    expect(sentenceCase('camelCase')).toBe('camel case');
  });

  it('should handle acronyms correctly', () => {
    expect(sentenceCase('PDFFile')).toBe('pdf file');
    expect(sentenceCase('handleXMLData')).toBe('handle xml data');
    expect(sentenceCase('parseJSON')).toBe('parse json');
  });

  it('should replace underscores with spaces', () => {
    expect(sentenceCase('hello_world')).toBe('hello world');
    expect(sentenceCase('this_is_a_test')).toBe('this is a test');
    expect(sentenceCase('multiple___spaces')).toBe('multiple spaces');
  });

  it('should replace dashes with spaces', () => {
    expect(sentenceCase('hello-world')).toBe('hello world');
    expect(sentenceCase('this-is-a-test')).toBe('this is a test');
    expect(sentenceCase('multiple---spaces')).toBe('multiple spaces');
  });

  it('should handle mixed separators', () => {
    expect(sentenceCase('hello_world-test')).toBe('hello world test');
    expect(sentenceCase('camelCase_with-separators')).toBe('camel case with separators');
  });

  it('should remove extra spaces', () => {
    expect(sentenceCase('hello   world')).toBe('hello world');
    expect(sentenceCase('multiple     spaces')).toBe('multiple spaces');
  });

  it('should trim spaces from start and end', () => {
    expect(sentenceCase('  hello world  ')).toBe('hello world');
    expect(sentenceCase('  leading_trailing  ')).toBe('leading trailing');
  });

  it('should convert everything to lowercase', () => {
    expect(sentenceCase('HELLO WORLD')).toBe('hello world');
    expect(sentenceCase('Mixed_CASE_text')).toBe('mixed case text');
  });

  it('should handle empty strings', () => {
    expect(sentenceCase('')).toBe('');
    expect(sentenceCase('   ')).toBe('');
  });

  it('should handle strings with special characters', () => {
    expect(sentenceCase('hello!world')).toBe('hello!world');
    expect(sentenceCase('test@example.com')).toBe('test@example.com');
  });
});