// tests/is-base64.test.ts

import { isBase64 } from '../src/is-base64';

describe('isBase64', () => {
  it('should return true for valid base64 strings', () => {
    const validCases = [
      'SGVsbG8gV29ybGQ=',  // "Hello World"
      'dGVzdA==',          // "test"
      'YWJj',             // "abc"
      '',                 // empty string
      'YQ==',             // single character
      'YWI=',             // two characters
      'QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODk=' // all valid chars
    ];

    validCases.forEach(testCase => {
      expect(isBase64(testCase)).toBe(true);
    });
  });

  it('should return false for invalid base64 strings', () => {
    const invalidCases = [
      'SGVsbG8gV29ybGQ',   // missing padding
      'dGVzdA=',           // incorrect padding
      'YW!j',              // invalid character
      'Hello World',       // plain text
      '####',              // invalid characters
      'YWJj=',            // unnecessary padding
      'Y===',             // excessive padding
      null,               // null
      undefined,          // undefined
      123,                // number
      {},                 // object
      [],                 // array
      true,              // boolean
      'YWI=='             // incorrect padding length
    ];

    invalidCases.forEach(testCase => {
      expect(isBase64(testCase as any)).toBe(false);
    });
  });

  it('should handle edge cases', () => {
    expect(isBase64('+')).toBe(false);        // single invalid char
    expect(isBase64('A')).toBe(false);        // single valid char without padding
    expect(isBase64('A==')).toBe(false);      // invalid padding for single char
    expect(isBase64('AA==')).toBe(true);      // valid padding
    expect(isBase64('AAA=')).toBe(true);      // valid padding
    expect(isBase64('AAAA')).toBe(true);      // no padding needed
  });

  it('should handle error cases gracefully', () => {
    const errorCases = [
      Symbol('test'),
      BigInt(123),
      function() {},
      new Date(),
      /regex/,
      new Error('test')
    ];

    errorCases.forEach(testCase => {
      expect(isBase64(testCase as any)).toBe(false);
    });
  });
});