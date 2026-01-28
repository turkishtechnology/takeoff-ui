import { Separator } from '../../../dist/types';

const validSeparators: Separator[] = [',', '.', ' '] as const;

/**
 * Returns an alternative separator that is different from the provided one.
 * Used to prevent conflicts when only one separator is provided.
 */
const getAlternativeSeparator = (oppositeSep: Separator): Separator => {
  const alternatives: Separator[] = [',', '.'];
  //aynı değer olmaması için yapıldı
  return alternatives.find(sep => sep !== oppositeSep);
};

/**
 * Validates that a separator is one of the allowed values.
 * Returns the separator if valid, undefined if invalid or not provided.
 */
const validateSeparator = (separator: Separator | undefined): Separator | undefined => {
  if (!separator) return undefined;

  if (!validSeparators.includes(separator)) {
    console.warn(`TkCurrencyInput: Invalid separator '${separator}'. Must be one of: ${validSeparators.join(', ')}`);
    return undefined;
  }

  return separator;
};

/**
 * @param targetSeparator - Custom separator from component prop (if called in decimalSeparator, decimalSeparator)
 * @param oppositeSeparator - The opposite custom separator (if called in decimalSeparator, targetSeparator) to avoid conflicts
 * @param targetSelectedSeparator - Separator from selected currency (e.g., selectedCurrency.decimalSeparator)
 * @param oppositeSelectedSeparator - The opposite separator from currency (e.g., selectedCurrency.thousandsSeparator)
 * @param fallback - Final fallback separator if all other options are undefined
 * @returns The appropriate separator to use
 *
 */
export const getValidSeparator = (
  targetSeparator: Separator | undefined,
  oppositeSeparator: Separator | undefined,
  targetSelectedSeparator: Separator | undefined,
  oppositeSelectedSeparator: Separator | undefined,
  fallback: Separator,
): Separator => {
  // Validate all separators
  const validTarget = validateSeparator(targetSeparator);
  const validOpposite = validateSeparator(oppositeSeparator);
  const validTargetSelected = validateSeparator(targetSelectedSeparator);
  const validOppositeSelected = validateSeparator(oppositeSelectedSeparator);

  // Check for conflicts in custom props
  if (validTarget && validOpposite && validTarget === validOpposite) {
    console.error(`TkCurrencyInput: Both separator props are set to '${validTarget}' they cannot be same.`);
    return validTarget;
  }

  // Check for conflicts in interface fields
  if (validTargetSelected && validOppositeSelected && validTargetSelected === validOppositeSelected) {
    console.error(`TkCurrencyInput: Both interface separator fields set to '${validTargetSelected}' they cannot be same.`);
    return validTargetSelected;
  }

  // Priority 1: Use valid target separator if provided
  if (validTarget) {
    return validTarget;
  }

  // Priority 2: Auto-select if opposite separator is provided but target is not
  if (validOpposite) {
    return getAlternativeSeparator(validOpposite);
  }

  // Priority 3: Use currency's default for target separator
  if (validTargetSelected) {
    return validTargetSelected;
  }

  // Priority 4: Auto-select from currency's opposite separator
  if (validOppositeSelected) {
    return getAlternativeSeparator(validOppositeSelected);
  }

  // Priority 5: Final fallback
  return fallback;
};
