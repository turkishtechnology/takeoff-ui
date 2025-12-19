/**
 * Utility functions for working with nested object properties
 */

/**
 * Gets a nested value from an object using a dot-separated path
 * @param obj - The object to traverse
 * @param path - The dot-separated path to the desired property (e.g., 'user.profile.name')
 * @returns The value at the specified path, or undefined if not found
 */
export const getNestedValue = (obj: any, path: string): any => {
  if (!obj || !path) return undefined;

  return path.split('.').reduce((acc, key) => {
    if (acc && acc[key] !== undefined && acc[key] !== null) {
      if (typeof acc[key] === 'boolean') {
        return acc[key].toString();
      } else return acc[key];
    } else {
      return undefined;
    }
  }, obj);
};
