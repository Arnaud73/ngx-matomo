import { isDefined, isNonNull } from './helpers';

describe('Helper Functions', () => {
  describe('isNonNull', () => {
    it('should return true for undefined', () => {
      expect(isNonNull(undefined)).toBe(true);
    });

    it('should return false for null', () => {
      expect(isNonNull(null)).toBe(false);
    });

    it('should return true for string values', () => {
      expect(isNonNull('')).toBe(true);
      expect(isNonNull('hello')).toBe(true);
    });

    it('should return true for numeric values', () => {
      expect(isNonNull(0)).toBe(true);
      expect(isNonNull(-1)).toBe(true);
      expect(isNonNull(42)).toBe(true);
      expect(isNonNull(NaN)).toBe(true);
    });

    it('should return true for boolean values', () => {
      expect(isNonNull(false)).toBe(true);
      expect(isNonNull(true)).toBe(true);
    });

    it('should return true for objects and arrays', () => {
      expect(isNonNull({})).toBe(true);
      expect(isNonNull([])).toBe(true);
      expect(isNonNull({ key: 'value' })).toBe(true);
      expect(isNonNull([1, 2, 3])).toBe(true);
    });

    it('should return true for functions', () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      expect(isNonNull(() => {})).toBe(true);
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      expect(isNonNull(function () {})).toBe(true);
    });
  });

  describe('isDefined', () => {
    it('should return false for undefined', () => {
      expect(isDefined(undefined)).toBe(false);
    });

    it('should return false for null', () => {
      expect(isDefined(null)).toBe(false);
    });

    it('should return true for string values', () => {
      expect(isDefined('')).toBe(true);
      expect(isDefined('hello')).toBe(true);
    });

    it('should return true for numeric values', () => {
      expect(isDefined(0)).toBe(true);
      expect(isDefined(-1)).toBe(true);
      expect(isDefined(42)).toBe(true);
      expect(isDefined(NaN)).toBe(true);
    });

    it('should return true for boolean values', () => {
      expect(isDefined(false)).toBe(true);
      expect(isDefined(true)).toBe(true);
    });

    it('should return true for objects and arrays', () => {
      expect(isDefined({})).toBe(true);
      expect(isDefined([])).toBe(true);
      expect(isDefined({ key: 'value' })).toBe(true);
      expect(isDefined([1, 2, 3])).toBe(true);
    });

    it('should return true for functions', () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      expect(isDefined(() => {})).toBe(true);
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      expect(isDefined(function () {})).toBe(true);
    });
  });

  describe('Type narrowing capabilities', () => {
    // These tests are more for TypeScript compilation checks
    // They verify the type predicates work correctly

    it('isNonNull should narrow types correctly', () => {
      const value: string | null = Math.random() > 0.5 ? 'test' : null;

      if (isNonNull(value)) {
        // This should compile without error since value is now string
        expect(typeof value).toBe('string');
      } else {
        // Here value should be null
        expect(value).toBeNull();
      }
    });

    it('isDefined should narrow types correctly', () => {
      const value: string | undefined | null =
        Math.random() > 0.7 ? 'test' : Math.random() > 0.5 ? undefined : null;

      if (isDefined(value)) {
        // This should compile without error since value is now string
        expect(typeof value).toBe('string');
      } else {
        // Here value should be null or undefined
        expect(value == null).toBe(true);
      }
    });
  });
});
