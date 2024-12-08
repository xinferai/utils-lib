// src/get-js-string.ts

/**
 * Convert an object to a JavaScript code string
 * @param obj the object to convert
 * @returns the JavaScript code string
 */
export function getJsString(obj: any): string {
  // Handle null and undefined
  if (obj === null) return 'null';
  if (obj === undefined) return 'undefined';
  
  // Handle arrays
  if (Array.isArray(obj)) {
      const items = obj.map(item => getJsString(item)).join(',');
      return `[${items}]`;
  }
  
  // Handle plain objects
  if (typeof obj === 'object') {
      const pairs = Object.entries(obj).map(([key, value]) => {
          // Check if key is a valid JavaScript identifier
          const validIdentifier = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key);
          const formattedKey = validIdentifier ? key : `'${key}'`;
          
          return `${formattedKey}:${getJsString(value)}`;
      });
      return `{${pairs.join(',')}}`;
  }
  
  // Handle strings
  if (typeof obj === 'string') {
      return `'${obj.replace(/'/g, "\\'")}'`;
  }
  
  // Handle other primitives
  return String(obj);
}