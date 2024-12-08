
/**
 * Given a count and a unit, return the pluralized form of the unit if the count is not 1.
 * @param count the count
 * @param unit  the unit
 * @returns the pluralized form of the unit if the count is not 1
 */
export function pluralize(count: number, unit: string): string {
  return `${count} ${unit}${count !== 1 ? 's' : ''}`;
}