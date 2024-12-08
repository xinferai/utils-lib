// tests/pass-through.test.ts

import { passThrough } from '../src/pass-through';

describe('passThrough', () => {
  let mockResponse: Response;
  let mockReader: any;
  let chunks: Uint8Array[];
  
  beforeEach(() => {
    chunks = [];
    mockReader = {
      read: jest.fn()
    };
    
    mockResponse = {
      body: {
        getReader: () => mockReader
      },
      headers: new Headers({
        'content-type': 'application/json',
        'content-encoding': 'gzip'
      })
    } as any;
  });

  it('should throw error when response or body is missing', async () => {
    await expect(passThrough(null as any)).rejects.toThrow('No response or body');
    await expect(passThrough({} as any)).rejects.toThrow('No response or body');
  });

  it('should copy headers and remove content-encoding', async () => {
    mockReader.read.mockResolvedValueOnce({ done: true });
    
    const result = await passThrough(mockResponse);
    
    expect(result.headers.get('content-type')).toBe('application/json');
    expect(result.headers.has('content-encoding')).toBe(false);
  });

  it('should properly stream data chunks', async () => {
    const chunk1 = new Uint8Array([1, 2, 3]);
    const chunk2 = new Uint8Array([4, 5, 6]);
    
    mockReader.read
      .mockResolvedValueOnce({ done: false, value: chunk1 })
      .mockResolvedValueOnce({ done: false, value: chunk2 })
      .mockResolvedValueOnce({ done: true });

    const { readableStream } = await passThrough(mockResponse);
    const reader = readableStream.getReader();

    const result1 = await reader.read();
    expect(result1.value).toEqual(chunk1);
    expect(result1.done).toBe(false);

    const result2 = await reader.read();
    expect(result2.value).toEqual(chunk2);
    expect(result2.done).toBe(false);

    const result3 = await reader.read();
    expect(result3.done).toBe(true);
  });

  it('should call onFinish with concatenated body text', async () => {
    const chunk1 = new TextEncoder().encode('Hello ');
    const chunk2 = new TextEncoder().encode('World');
    
    mockReader.read
      .mockResolvedValueOnce({ done: false, value: chunk1 })
      .mockResolvedValueOnce({ done: false, value: chunk2 })
      .mockResolvedValueOnce({ done: true });

    const onFinish = jest.fn();
    const { readableStream } = await passThrough(mockResponse, onFinish);
    
    // Read all chunks to trigger onFinish
    const reader = readableStream.getReader();
    while(!(await reader.read()).done) {}

    expect(onFinish).toHaveBeenCalledWith('Hello World');
  });

  it('should handle empty streams', async () => {
    mockReader.read.mockResolvedValueOnce({ done: true });

    const onFinish = jest.fn();
    const { readableStream } = await passThrough(mockResponse, onFinish);
    
    const reader = readableStream.getReader();
    const result = await reader.read();
    
    expect(result.done).toBe(true);
    expect(onFinish).toHaveBeenCalledWith('');
  });
});