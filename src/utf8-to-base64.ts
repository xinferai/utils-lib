// src/utf8-to-base64.ts

/**
 * Convert a UTF-8 string to base64.
 * It works in both Node.js and browser environments
 * @param str the string to convert
 * @returns the base64 encoded string
 */
export function utf8ToBase64(str: string): string {
  // Input validation
  if (typeof str !== 'string') {
    throw new TypeError('Input must be a string');
  }

  // Handle empty string case
  if (str === '') {
    return '';
  }

  try {
    // Convert string to UTF-8 bytes
    const utf8Bytes = new TextEncoder().encode(str);
    
    // Convert bytes to base64
    return btoa(
      Array.from(utf8Bytes)
        .map(byte => String.fromCharCode(byte))
        .join('')
    );
  } catch (error) {
    throw new Error('Failed to encode string to base64');
  }
}
