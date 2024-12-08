// tests/base64-to-binary.test.ts

import { base64ToBinary } from '../src/base64-to-binary';
import { isBase64 } from '../src/is-base64';

// Mock isBase64 module
jest.mock('../src/is-base64');

describe('base64ToBinary', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock atob globally since it's not available in Node
    global.atob = jest.fn((str) => Buffer.from(str, 'base64').toString('binary'));
    (isBase64 as jest.Mock).mockReturnValue(true);
  });

  it('should convert valid base64 string to Uint8Array', () => {
    const validBase64 = 'SGVsbG8gV29ybGQ='; // "Hello World" in base64
    const result = base64ToBinary(validBase64);

    expect(result).toBeInstanceOf(Uint8Array);
    expect(result.length).toBe(11); // "Hello World" is 11 bytes
    expect(Array.from(result)).toEqual([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]); // ASCII values for "Hello World"
    expect(isBase64).toHaveBeenCalledWith(validBase64);
  });

  it('should throw error for invalid input', () => {
    const invalidBase64 = 'Not a base64 string!@#$';
    (isBase64 as jest.Mock).mockReturnValue(false);
    
    expect(() => {
      base64ToBinary(invalidBase64);
    }).toThrow('Input must be a string');
    expect(isBase64).toHaveBeenCalledWith(invalidBase64);
  });

  it('should handle empty string input', () => {
    const result = base64ToBinary('');
    
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result.length).toBe(0);
    expect(isBase64).toHaveBeenCalledWith('');
  });

  it('should handle atob errors', () => {
    global.atob = jest.fn(() => {
      throw new Error('Invalid character');
    });
    
    expect(() => {
      base64ToBinary('SGVsbG8gV29ybGQ=');
    }).toThrow('Invalid character');
  });
});