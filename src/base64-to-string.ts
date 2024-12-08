
/**
 * Convert a base64 string to a UTF-8 string.
 * It works in both Node.js and browser environments
 * @param str base64 string to convert
 * @returns utf-8 string
 * @throws {Error} if base64 decoding is not supported
 */
export function base64ToString(str: string): string {
  if (typeof Buffer !== 'undefined') {
    // Node.js environment
    return Buffer.from(str, 'base64').toString('utf8');
  } else if (typeof atob === 'function') {
    // Browser environment with atob
    return decodeURIComponent(
        atob(str).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join('')
    );
  } else {
    // Fallback for environments without Buffer or atob
    throw new Error('Base64 decoding is not supported in this environment');
  }
};