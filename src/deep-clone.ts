// src/deep-clone.ts

/**
 * Deep clone an object
 * @param obj Object to clone
 * @param seen WeakMap for tracking circular references
 * @returns cloned object
 */
export function deepClone(obj: any, seen = new WeakMap()): any {
  // Handle primitives and null/undefined
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Check for circular references
  if (seen.has(obj)) {
    return seen.get(obj);
  }

  // Handle Date objects
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  // Handle RegExp objects
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }

  // Handle Array objects
  if (Array.isArray(obj)) {
    const clone: any[] = [];
    seen.set(obj, clone);
    return clone.concat(obj.map(item => deepClone(item, seen)));
  }

  // Handle Set objects
  if (obj instanceof Set) {
    const clone = new Set();
    seen.set(obj, clone);
    obj.forEach(value => clone.add(deepClone(value, seen)));
    return clone;
  }

  // Handle Map objects
  if (obj instanceof Map) {
    const clone = new Map();
    seen.set(obj, clone);
    obj.forEach((value, key) => clone.set(deepClone(key, seen), deepClone(value, seen)));
    return clone;
  }

  // Handle plain objects
  const clone = Object.create(Object.getPrototypeOf(obj));
  seen.set(obj, clone);
  
  Object.entries(obj).forEach(([key, value]) => {
    clone[key] = deepClone(value, seen);
  });
  
  return clone;
}