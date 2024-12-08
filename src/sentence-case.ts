// src/sentence-case.ts

/**
 * Convert a string to sentence case.
 * @param str the string to convert
 * @returns the string in sentence case
 */
export function sentenceCase(str: string): string {
  return str
    // Insert space before capital letters that follow lowercase letters
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    // Insert space before capital letters that follow capital letters
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    // Replace underscores and dashes with spaces
    .replace(/[_-]/g, ' ')
    // Remove extra spaces and trim
    .replace(/\s+/g, ' ')
    .trim()
    // Convert to lowercase last
    .toLowerCase();
}