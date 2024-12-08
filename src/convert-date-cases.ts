
import { parseDate } from './parse-date';

type CaseStyle = 'snake' | 'camel' | 'none';

/**
 * Convert object keys from snake_case to camelCase
 * including dates strings conversion to Date objects
 * @param obj 
 * @returns camelCase object
 */
export function snakeToCamel<T extends object>(obj: T): any {
  return convertObject(obj, 'camel', true);
}

/**
 * Convert object keys from camelCase to snake_case
 * including date strings conversion to Date objects
 * @param obj 
 * @returns snake_case object
 */
export function camelToSnake<T extends object>(obj: T): any {
  return convertObject(obj, 'snake', true);
}

/**
 * Convert object keys from snake_case to camelCase and convert date strings to Date objects
 * @param obj 
 * @returns camelCase object with date strings converted to Date objects
 */
export function endsWithAtToDate<T extends object>(obj: T): any {
  return convertObject(obj, 'none', true);
}

/**
 * Convert a string to snake_case or camelCase.
 * For tests only.
 * @param str 
 * @param to 
 * @returns string in snake_case or camelCase
 */
export function convertCase(str: string, to: CaseStyle): string {
    if (to === 'snake') {
        return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    } else if (to === 'camel') {
        return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    }
    return str; // 'none' case, return as is
}

/**
 * Convert object keys to snake_case or camelCase and convert date strings to Date objects.
 * For tests only.
 * @param obj 
 * @param toCaseStyle 
 * @param convertDates 
 * @returns 
 */
export function convertObject<T extends object>(
    obj: T,
    toCaseStyle: CaseStyle,
    convertDates: boolean = false
): any {
    if (typeof obj !== 'object' || obj === null || obj === undefined) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => convertObject(item, toCaseStyle, convertDates));
    }

    const entries = Object.entries(obj);

    if (entries.length === 0) {
        return obj;
    }

    const result: Record<string, any> = {};

    for (const [key, value] of entries) {
        let newKey = convertCase(key, toCaseStyle);
        let newValue = value;

        if (typeof value === 'object' && value !== null) {
            newValue = convertObject(value, toCaseStyle, convertDates);
        } else if (convertDates && typeof value === 'string' && 
                   (key.endsWith('_at') || key.endsWith('At'))) {
            const date = parseDate(value);
            if (date) {
                newValue = date;
            }
                
        }

        result[newKey] = newValue;
    }

    return result;
}