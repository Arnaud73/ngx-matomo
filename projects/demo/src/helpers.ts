/**
 * Checks if a value or object is non null.
 *
 * @export
 */
export function isNonNull<T>(value: T | undefined | null): value is NonNullable<T> {
  return value != null;
}

export function isDefined<T>(value: T | undefined | null): value is NonNullable<T> {
  return <T>value !== undefined && <T>value !== null;
}
