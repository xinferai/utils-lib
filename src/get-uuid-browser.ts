// src/get-uuid-browser.ts

import { v4 } from 'uuid';

/**
 * getUUID - Get a UUID
 *
 * @returns {string} - A UUID
 */
export const getUUID = (): string => {
  return v4();
};