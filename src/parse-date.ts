
import { parseISO, isValid } from 'date-fns';

/**
 * Parse date string to Date object
 * @param value 
 * @returns Date object or null if the value is not a valid date string
 */
export function parseDate(value: string): Date | null {
  if (typeof value !== 'string' || !value) return null;
  const date = parseISO(value);
  return isValid(date) ? date : null;
}