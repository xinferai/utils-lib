// src/is-in-browser.ts

/// <reference lib="dom" />

/**
 * Check if the current environment is a browser.
 * @returns {boolean} True if the current environment is a browser, false otherwise.
 */
export function isInBrowser(): boolean {
  if (typeof window === 'undefined') return false;
  if (typeof window.document === 'undefined') return false;
  return true;
}