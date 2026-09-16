import { getValidSeparator } from '../helpers';
import type { Separator } from '../types';

describe('currency-input helpers', () => {
  describe('getValidSeparator', () => {
    let warn: jest.SpyInstance;
    let error: jest.SpyInstance;

    beforeEach(() => {
      warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
      error = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      warn.mockRestore();
      error.mockRestore();
    });

    it('prefers the explicit target separator', () => {
      expect(getValidSeparator(',', undefined, '.', ' ', '.')).toBe(',');
    });

    it('derives the opposite of the sibling prop when the target is unset', () => {
      expect(getValidSeparator(undefined, '.', undefined, undefined, ',')).toBe(',');
      expect(getValidSeparator(undefined, ',', undefined, undefined, '.')).toBe('.');
    });

    it('falls back to the currency separator', () => {
      expect(getValidSeparator(undefined, undefined, '.', undefined, ',')).toBe('.');
    });

    it('derives the opposite of the currency sibling separator', () => {
      expect(getValidSeparator(undefined, undefined, undefined, ',', ' ')).toBe('.');
    });

    it('uses the fallback when nothing else is supplied', () => {
      expect(getValidSeparator(undefined, undefined, undefined, undefined, ' ')).toBe(' ');
    });

    it('accepts a space as a separator', () => {
      expect(getValidSeparator(' ', undefined, undefined, undefined, '.')).toBe(' ');
      expect(warn).not.toHaveBeenCalled();
    });

    it('warns about an invalid separator and skips to the next source', () => {
      expect(getValidSeparator('x' as Separator, undefined, undefined, undefined, '.')).toBe('.');
      expect(warn).toHaveBeenCalledWith(expect.stringContaining("Invalid separator 'x'"));
    });

    it('ignores an invalid sibling separator', () => {
      expect(getValidSeparator(undefined, 'x' as Separator, undefined, undefined, ',')).toBe(',');
      expect(warn).toHaveBeenCalled();
    });

    it('reports two identical props as a conflict and keeps the target', () => {
      expect(getValidSeparator(',', ',', undefined, undefined, '.')).toBe(',');
      expect(error).toHaveBeenCalledWith(expect.stringContaining('cannot be the same'));
    });

    it('reports two identical currency separators as a conflict', () => {
      expect(getValidSeparator(undefined, undefined, '.', '.', ',')).toBe('.');
      expect(error).toHaveBeenCalledWith(expect.stringContaining('cannot be the same'));
    });

    // Both conflict checks run before the priority ladder, so a malformed currency object
    // wins over an explicit prop. Surfaced here rather than changed: the call already logs.
    it('lets a conflicting currency pair override an explicit prop', () => {
      expect(getValidSeparator(',', undefined, '.', '.', ' ')).toBe('.');
      expect(error).toHaveBeenCalledWith(expect.stringContaining('cannot be the same'));
    });

    // The sibling-derived value only ever picks between ',' and '.', so a space sibling
    // resolves to the first alternative rather than mirroring it.
    it('derives a comma when the sibling is a space', () => {
      expect(getValidSeparator(undefined, ' ', undefined, undefined, '.')).toBe(',');
    });
  });
});
