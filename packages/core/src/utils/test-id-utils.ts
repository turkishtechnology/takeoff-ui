export const getDataTestidAttribute = (testid?: string, ...suffixes: Array<string | undefined>): { 'data-testid'?: string } => {
  if (!testid) return {};

  const normalizedSuffix = suffixes.filter(Boolean).join('-');
  const derivedTestId = normalizedSuffix ? `${testid}-${normalizedSuffix}` : testid;

  return { 'data-testid': derivedTestId };
};
