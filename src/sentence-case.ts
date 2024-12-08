// src/sentence-case.ts

/**
 * Convert a string to sentence case.
 * @param str the string to convert
 * @returns the string in sentence case
 */
export function sentenceCase(str: string): string {
  return str
    // Insert space before capital letters
    .replace(/([A-Z])/g, ' $1')
    // Replace underscores and dashes with spaces
    .replace(/[_-]/g, ' ')
    // Remove extra spaces and trim
    .replace(/\s+/g, ' ')
    .trim()
    // Convert to lowercase
    .toLowerCase();
}