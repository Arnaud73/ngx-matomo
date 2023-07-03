/**
 * Type guard for checking if a value or object is non null.
 *
 * @export
 */
export function isNonNull<T>(value: T | undefined | null): value is NonNullable<T> {
  return value != null;
}

/**
 * Type guard for checking if a value or object is defined.
 *
 * @export
 */
export function isDefined<T>(value: T | undefined | null): value is NonNullable<T> {
  return <T>value !== undefined && <T>value !== null;
}

/**
 * Checks if a value or object is non null or undefined, throws an error otherwise.
 *
 * @export
 */
export function requireNonNull<T>(value: T | null | undefined, message: string): T {
  if (value === null || value === undefined) {
    throw new Error('Unexpected ' + value + ' value: ' + message);
  }
  return value;
}
