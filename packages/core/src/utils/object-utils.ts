/**
 * Utility functions for working with nested object properties
 */

/**
 * Gets a nested value from an object using a dot-separated path
 * @param obj - The object to traverse
 * @param path - The dot-separated path to the desired property (e.g., 'user.profile.name')
 * @returns The value at the specified path, or undefined if not found
 */
export const getNestedValue = <T extends Record<string, unknown>>(obj: T | null | undefined, path: string): unknown => {
  if (!obj || !path) return undefined;

  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object') {
      const value = (acc as Record<string, unknown>)[key];

      if (value !== undefined && value !== null) {
        if (typeof value === 'boolean') {
          return value.toString();
        }

        return value;
      }
    }

    return undefined;
  }, obj);
};
