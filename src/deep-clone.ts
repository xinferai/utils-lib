// src/deep-clone.ts

/**
 * Deep clone an object
 * @param obj Object to clone
 * @returns cloned object
 */
export function deepClone(obj: any): any {
  // Handle primitives and null/undefined
  if (obj === null || typeof obj !== 'object') {
    return obj;
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
    return obj.map(item => deepClone(item));
  }

  // Handle Set objects
  if (obj instanceof Set) {
    return new Set([...obj].map(item => deepClone(item)));
  }

  // Handle Map objects
  if (obj instanceof Map) {
    return new Map([...obj].map(([key, value]) => [deepClone(key), deepClone(value)]));
  }

  // Handle plain objects
  const clonedObj = Object.create(Object.getPrototypeOf(obj));
  
  // Handle circular references
  const seen = new WeakMap();
  
  function cloneRecursive(obj: any) {
    if (seen.has(obj)) {
      return seen.get(obj);
    }
    
    seen.set(obj, clonedObj);
    
    Object.entries(obj).forEach(([key, value]) => {
      clonedObj[key] = deepClone(value);
    });
    
    return clonedObj;
  }
  
  return cloneRecursive(obj);
}