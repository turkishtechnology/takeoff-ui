import { getNestedValue } from '../object-utils';

describe('object-utils', () => {
  describe('getNestedValue', () => {
    it('returns undefined when obj is null', () => {
      expect(getNestedValue(null, 'a.b')).toBeUndefined();
    });

    it('returns undefined when obj is undefined', () => {
      expect(getNestedValue(undefined, 'a.b')).toBeUndefined();
    });

    it('returns undefined when path is empty', () => {
      expect(getNestedValue({ a: 1 }, '')).toBeUndefined();
    });

    it('returns undefined when path is null', () => {
      expect(getNestedValue({ a: 1 }, null as any)).toBeUndefined();
    });

    it('resolves a top-level property', () => {
      expect(getNestedValue({ a: 1 }, 'a')).toBe(1);
    });

    it('resolves a deeply nested property', () => {
      const obj = { user: { profile: { name: 'Ada' } } };
      expect(getNestedValue(obj, 'user.profile.name')).toBe('Ada');
    });

    it('returns undefined for a missing intermediate key', () => {
      expect(getNestedValue({ a: { b: 1 } }, 'a.x.c')).toBeUndefined();
    });

    it('returns undefined for a missing leaf key', () => {
      expect(getNestedValue({ a: { b: 1 } }, 'a.c')).toBeUndefined();
    });

    it('returns undefined when an intermediate value is null', () => {
      expect(getNestedValue({ a: { b: null } }, 'a.b.c')).toBeUndefined();
    });

    it('returns undefined when the leaf value is null', () => {
      expect(getNestedValue({ a: { b: null } }, 'a.b')).toBeUndefined();
    });

    it('returns undefined when the leaf value is undefined', () => {
      expect(getNestedValue({ a: { b: undefined } }, 'a.b')).toBeUndefined();
    });

    it('converts boolean true to the string "true"', () => {
      expect(getNestedValue({ a: { active: true } }, 'a.active')).toBe('true');
    });

    it('converts boolean false to the string "false"', () => {
      expect(getNestedValue({ a: { active: false } }, 'a.active')).toBe('false');
    });

    it('returns falsy non-null values such as 0 and empty string', () => {
      expect(getNestedValue({ a: { count: 0 } }, 'a.count')).toBe(0);
      expect(getNestedValue({ a: { label: '' } }, 'a.label')).toBe('');
    });

    it('resolves array indices in the path', () => {
      const obj = { items: [{ name: 'first' }, { name: 'second' }] };
      expect(getNestedValue(obj, 'items.1.name')).toBe('second');
    });

    it('returns nested objects when the path stops mid-tree', () => {
      const obj = { a: { b: { c: 1 } } };
      expect(getNestedValue(obj, 'a.b')).toEqual({ c: 1 });
    });
  });
});
