// src/is-base64.ts

/**
 * Check if the given string is a valid Base64 string
 * @param str the string to check
 * @returns true if valid Base64, false otherwise 
 */
export function isBase64(str: string) {
  try {
      if (typeof str !== 'string') {
          return false;
      }
      const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;      
      if (!base64Regex.test(str)) {
          return false;
      }
      const paddingLength = str.match(/={1,2}$/)?.[0]?.length || 0;
      if (paddingLength > 0) {
          return str.length % 4 === 0;
      }
      return str.length % 4 === 0;
  } catch {
      return false;
  }
}