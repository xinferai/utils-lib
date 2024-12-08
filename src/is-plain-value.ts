// src/is-plain-value.ts

import type { PlainValue } from './types';

/**
 * Check if a value is a plain value
 * @param value value to check
 * @returns true if the value is a plain value, false otherwise
 */
export function isPlainValue(value: unknown): value is PlainValue {
    if (value === null || value === undefined) return true;

    const type = typeof value;
    
    if (type === 'number') {
        return Number.isFinite(value);
    }
    
    if (type === 'string' || type === 'boolean') return true;

    if (value instanceof Date && !isNaN(value.getTime())) return true;

    return false;
}