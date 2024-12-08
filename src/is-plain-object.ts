
import { isPlainValue } from './is-plain-value';
import type { PlainObject } from './types';

/**
 * Check if a value is a plain object
 * @param input value to check
 * @returns true if the value is a plain object, false otherwise
 */
export function isPlainObject(input: unknown, seen = new WeakSet()): input is PlainObject {
  if (input === null || typeof input !== 'object') {
      return false;
  }

  if (seen.has(input)) {
      return false; // Circular reference detected
  }

  seen.add(input);

  if (Array.isArray(input)) {
      return input.every(
          (item) => isPlainValue(item) || isPlainObject(item, seen)
      );
  }

  for (const key in input as Record<string, unknown>) {
      if (Object.prototype.hasOwnProperty.call(input, key)) {
          const value = (input as Record<string, unknown>)[key];
          if (!isPlainValue(value) && !isPlainObject(value, seen)) {
              return false;
          }
      }
  }

  return true;
}