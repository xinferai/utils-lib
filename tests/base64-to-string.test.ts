// tests/convert-date-cases.test.ts:

import { base64ToString } from '../src/base64-to-string';
import puppeteer from 'puppeteer';

declare global {
  interface Window {
    base64ToString: (str: string) => string;
  }
}

describe('base64ToString', () => {
  test('decodes base64 string in Node.js environment', () => {
    const encoded = 'SGVsbG8sIFdvcmxkIQ==';
    const decoded = base64ToString(encoded);
    expect(decoded).toBe('Hello, World!');
  });

  test('throws error when neither Buffer nor atob is available', () => {
    const originalBuffer = global.Buffer;
    const originalAtob = global.atob;
    (global as any).Buffer = undefined;
    (global as any).atob = undefined;

    expect(() => base64ToString('SGVsbG8=')).toThrow('Base64 decoding is not supported in this environment');

    global.Buffer = originalBuffer;
    global.atob = originalAtob;
  });

  test('decodes base64 string in browser environment', async () => {
    const browser = await puppeteer.launch({ 
        headless: 'new',
        args: [
            '--no-sandbox', 
            '--disable-setuid-sandbox',
        ] 
    } as any);
    const page = await browser.newPage();

    await page.evaluate(() => {
      window.base64ToString = (str) => {
        if (typeof Buffer !== 'undefined') {
          return Buffer.from(str, 'base64').toString('utf8');
        } else if (typeof atob === 'function') {
          return decodeURIComponent(
            atob(str).split('').map(function(c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join('')
          );
        } else {
          throw new Error('Base64 decoding is not supported in this environment');
        }
      };
    });

    const result = await page.evaluate(() => {
      return window.base64ToString('SGVsbG8sIEJyb3dzZXIh');
    });

    expect(result).toBe('Hello, Browser!');

    await browser.close();
  }, 10000);
});