import { getDataTestId } from '../test-id-utils';

describe('test-id-utils', () => {
  describe('getDataTestId', () => {
    it('returns undefined when testid is undefined', () => {
      expect(getDataTestId(undefined)).toBeUndefined();
    });

    it('returns undefined when testid is an empty string', () => {
      expect(getDataTestId('', 'suffix')).toBeUndefined();
    });

    it('returns the testid unchanged when no suffixes are given', () => {
      expect(getDataTestId('my-input')).toBe('my-input');
    });

    it('returns the testid unchanged when all suffixes are falsy', () => {
      expect(getDataTestId('my-input', undefined, '', undefined)).toBe('my-input');
    });

    it('appends a single suffix', () => {
      expect(getDataTestId('my-input', 'label')).toBe('my-input-label');
    });

    it('joins multiple suffixes with dashes', () => {
      expect(getDataTestId('my-input', 'left', 'icon')).toBe('my-input-left-icon');
    });

    it('filters out falsy suffixes while keeping the rest', () => {
      expect(getDataTestId('my-input', undefined, 'icon', '')).toBe('my-input-icon');
    });
  });
});
