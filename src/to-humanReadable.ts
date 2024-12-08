
import { pluralize } from './pluralize';
import { parseDate } from './parse-date';

const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;
const DAYS_PER_YEAR = 365;

const TIME_UNITS = [
  { unit: 'year', seconds: SECONDS_PER_MINUTE * MINUTES_PER_HOUR * HOURS_PER_DAY * DAYS_PER_YEAR },
  { unit: 'day', seconds: SECONDS_PER_MINUTE * MINUTES_PER_HOUR * HOURS_PER_DAY },
  { unit: 'hour', seconds: SECONDS_PER_MINUTE * MINUTES_PER_HOUR },
  { unit: 'minute', seconds: SECONDS_PER_MINUTE },
  { unit: 'second', seconds: 1 },
];

/**
 * Convert time in ISO String, Date, milliseconds or seconds to human-readable format
 * @param input ISO String, Date, milliseconds or seconds
 * @returns the human-readable format of the time
 * @throws if input is not a number, Date, or ISO string
 * @throws if input is a negative number
 * @throws if input is an invalid date string
 */
export function toHumanReadable(input: number | Date | String): string {
  let seconds: number;
  if (typeof input === 'string') {
    const date = parseDate(input);
    if (date === null) {
      throw new Error('Invalid date string');
    }
    seconds = Math.floor(date.getTime() / 1000);
  } else if (input instanceof Date) {
    seconds = Math.floor(input.getTime() / 1000);
  } else if (typeof input === 'number') {
    if (input < 0) {
      throw new Error('Input must be a non-negative number');
    }
    if (input > 1000000000000) {
      seconds = Math.floor(input / 1000);
    } else {
      seconds = input;
    }
  } else {
    throw new Error('Input must be a number, Date, or ISO string');
  }

  if (seconds >= 10 * TIME_UNITS[0].seconds) {
    return '10 years and more';
  }

  if (seconds >= 3 * TIME_UNITS[0].seconds) {
    return '3 years and more';
  }

  const result: string[] = [];
  let remainingSeconds = seconds;

  for (const { unit, seconds: unitSeconds } of TIME_UNITS) {
    if (remainingSeconds >= unitSeconds) {
      const count = Math.floor(remainingSeconds / unitSeconds);
      result.push(pluralize(count, unit));
      remainingSeconds %= unitSeconds;

      if (unit === 'year' && remainingSeconds > 0) {
        const days = Math.floor(remainingSeconds / TIME_UNITS[1].seconds);
        if (days > 0) {
          result.push(pluralize(days, 'day'));
        }
        break;
      }

      if (result.length === 1) break;
    }
  }

  return result.join(' and ') || '0 seconds';
}