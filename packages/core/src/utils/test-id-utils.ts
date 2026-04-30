export const getDataTestId = (testid?: string, ...suffixes: Array<string | undefined>): string | undefined => {
  if (!testid) return undefined;

  const normalizedSuffix = suffixes.filter(Boolean).join('-');
  return normalizedSuffix ? `${testid}-${normalizedSuffix}` : testid;
};
