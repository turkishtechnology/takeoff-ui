export const getDataTestidAttribute = (testid?: string, ...suffixes: Array<string | undefined>): { 'data-testid'?: string } => {
  if (!testid) return {};

  const normalizedSuffix = suffixes.filter(Boolean).join('-');
  const derivedTestId = normalizedSuffix ? `${testid}-${normalizedSuffix}` : testid;

  return { 'data-testid': derivedTestId };
};

export const getDataTestidProp = (testid?: string, ...suffixes: Array<string | undefined>): string | undefined => {
  if (!testid) return undefined;

  const normalizedSuffix = suffixes.filter(Boolean).join('-');
  return normalizedSuffix ? `${testid}-${normalizedSuffix}` : testid;
};
