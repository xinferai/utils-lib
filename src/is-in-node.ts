
/**
 * Returns true if the current environment is Node.js
 * @returns {boolean} true if the current environment is Node.js
 */
export function isInNode(): boolean {
  return typeof process !== 'undefined' && 
    process.versions != null && 
  process.versions.node != null;
}