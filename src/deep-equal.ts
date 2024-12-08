// src/deep-equal.ts

/**
 * Check if two objects are deeply equal
 * @param obj1 Object 1
 * @param obj2 Object 2
 * @returns true if objects are deeply equal, false otherwise
 */
export function deepEqual(obj1: any, obj2: any): boolean {
  // Handle primitive types and null
  if (obj1 === obj2) return true;
  if (obj1 === null || obj2 === null) return false;
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;

  // Handle dates
  if (obj1 instanceof Date && obj2 instanceof Date) {
    return obj1.getTime() === obj2.getTime();
  }

  // Handle arrays
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) return false;
    return obj1.every((item, index) => deepEqual(item, obj2[index]));
  }

  // Handle regular expressions
  if (obj1 instanceof RegExp && obj2 instanceof RegExp) {
    return obj1.toString() === obj2.toString();
  }

  // Handle plain objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  return keys1.every(key => {
    if (!Object.prototype.hasOwnProperty.call(obj2, key)) return false;
    return deepEqual(obj1[key], obj2[key]);
  });
}