// tests/is-in-browser.test.ts:

import { isInBrowser } from "../src/is-in-browser";

describe('isInBrowser', () => {
  it('should return true if window is defined', () => {
    const globalAny = global as any;
    globalAny.window = { document: {} };
    expect(isInBrowser()).toBe(true);
    delete globalAny.window;
  });

  it('should return false if window is not defined', () => {
    expect(isInBrowser()).toBe(false);
  });
});
