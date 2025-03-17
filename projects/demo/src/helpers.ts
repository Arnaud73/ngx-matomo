/**
 * Determines whether a value is not null.
 * @template T
 * @param value
 * @returns defined
 */
export function isNonNull<T>(value: T | undefined | null): value is T | undefined {
  return value !== null;
}

/**
 * Determines whether a value is not undefined nor null.
 * @template T
 * @param value
 * @returns defined
 */
export function isDefined<T>(value: T | undefined | null): value is NonNullable<T> {
  return value !== undefined && value !== null;
}
