/**
 * Checks if a value or object is non null.
 *
 * @export
 */
export function isNonNull<T>(value: T): value is NonNullable<T> {
  return value != null;
}
