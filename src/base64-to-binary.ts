// src/base64-to-binary.ts

import { isBase64 } from './is-base64';

/**
 * Convert a Base64 string to a Uint8Array.
 * It works in both Node.js and browser environments
 * @param base64String 
 * @returns Uint8Array
 */
export function base64ToBinary(base64String: string): Uint8Array {
  if (!isBase64(base64String)) {
    throw new Error('Input must be a string');
  }
  const binaryString = atob(base64String);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}