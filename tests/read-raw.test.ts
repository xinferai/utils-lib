// tests/read-raw.test.ts

import { readRaw } from '../src/read-raw';

describe('readRaw', () => {
  let mockResponse: Response;
  let mockReader: any;
  
  beforeEach(() => {
    mockReader = {
      read: jest.fn()
    };
    
    mockResponse = {
      body: {
        getReader: () => mockReader
      },
      headers: new Map([
        ['content-type', 'application/json'],
        ['content-length', '123']
      ])
    } as any;
  });

  it('should read response headers correctly', async () => {
    mockReader.read
      .mockResolvedValueOnce({ done: true, value: undefined });

    const result = await readRaw(mockResponse);

    expect(result.headers).toEqual({
      'content-type': 'application/json',
      'content-length': '123'
    });
  });

  it('should read body text correctly', async () => {
    const encoder = new TextEncoder();
    mockReader.read
      .mockResolvedValueOnce({ 
        done: false, 
        value: encoder.encode('Hello\nWorld') 
      })
      .mockResolvedValueOnce({ done: true, value: undefined });

    const result = await readRaw(mockResponse);

    expect(result.bodyText).toBe('Hello\nWorld');
  });

  it('should handle empty response body', async () => {
    mockReader.read
      .mockResolvedValueOnce({ done: true, value: undefined });

    const result = await readRaw(mockResponse);

    expect(result.bodyText).toBe('');
  });

  it('should handle multiple chunks of data', async () => {
    const encoder = new TextEncoder();
    mockReader.read
      .mockResolvedValueOnce({ 
        done: false, 
        value: encoder.encode('Hello') 
      })
      .mockResolvedValueOnce({ 
        done: false, 
        value: encoder.encode(' World') 
      })
      .mockResolvedValueOnce({ done: true, value: undefined });

    const result = await readRaw(mockResponse);

    expect(result.bodyText).toBe('Hello World');
  });

  it('should call readLines callback with lines and last line', async () => {
    const encoder = new TextEncoder();
    mockReader.read
      .mockResolvedValueOnce({ 
        done: false, 
        value: encoder.encode('Line 1\nLine 2\nLine') 
      })
      .mockResolvedValueOnce({ 
        done: false, 
        value: encoder.encode(' 3\nLine 4') 
      })
      .mockResolvedValueOnce({ done: true, value: undefined });

    const readLinesMock = jest.fn();
    await readRaw(mockResponse, readLinesMock);

    expect(readLinesMock).toHaveBeenCalledWith(['Line 1', 'Line 2'], 'Line');
    expect(readLinesMock).toHaveBeenCalledWith(['Line 3'], 'Line 4');
  });

  it('should throw error when response or body is missing', async () => {
    await expect(readRaw(null as any)).rejects.toThrow('No response or body');
    await expect(readRaw({ headers: new Map() } as any)).rejects.toThrow('No response or body');
  });
});