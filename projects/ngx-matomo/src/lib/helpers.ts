/**
 * Determines whether a value is not null. This function will return true if the value is undefined
 * or any other value, but false if null.
 *
 * @template T - The type of the value being checked
 * @param value - The value to check for null
 * @returns A type predicate indicating whether the value is not null
 *
 * @example
 * // Returns true for undefined
 * isNonNull(undefined); // true
 *
 * @example
 * // Returns false for null
 * isNonNull(null); // false
 *
 * @example
 * // Returns true for any other value
 * isNonNull('hello'); // true
 * isNonNull(0); // true
 * isNonNull(false); // true
 */
export function isNonNull<T>(value: T | undefined | null): value is T | undefined {
  return value !== null;
}

/**
 * Determines whether a value is defined (not null and not undefined).
 *
 * @template T - The type of the value being checked
 * @param value - The value to check for null or undefined
 * @returns A type predicate indicating whether the value is defined (not null and not undefined)
 *
 * @example
 * // Returns false for undefined
 * isDefined(undefined); // false
 *
 * @example
 * // Returns false for null
 * isDefined(null); // false
 *
 * @example
 * // Returns true for any other value
 * isDefined('hello'); // true
 * isDefined(0); // true
 * isDefined(false); // true
 */
export function isDefined<T>(value: T | undefined | null): value is NonNullable<T> {
  return value !== undefined && value !== null;
}
