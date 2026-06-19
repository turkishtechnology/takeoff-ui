import { createIncrementalMatcher, stripAnchors, DONE, MORE, FAILED, MatchState } from '../regex-mask-utils';

const cl = (src: string, val: string): MatchState | 'NULL' => {
  const m = createIncrementalMatcher(stripAnchors(src));
  return m ? m(val) : 'NULL';
};

/**
 * Documents the real capabilities and the known limits of the incremental matcher.
 * The "supported" cases must pass; the "limitations" block records constructs we
 * deliberately do not model so the behavior is explicit rather than surprising.
 */
describe('regex-mask-utils — capability matrix', () => {
  describe('supported (must pass)', () => {
    const cases: Array<[string, string, MatchState]> = [
      // Optional groups (e.g. an optional country prefix).
      ['^(\\+90)?[0-9]{10}$', '5551234567', DONE],
      ['^(\\+90)?[0-9]{10}$', '+905551234567', DONE],
      ['^(\\+90)?[0-9]{10}$', '+90', MORE],
      // Multi-segment structured values.
      ['^[a-z]+@[a-z]+\\.[a-z]{2,3}$', 'a@b.co', DONE],
      ['^[a-z]+@[a-z]+\\.[a-z]{2,3}$', 'a@b.', MORE],
      ['^[a-z]+@[a-z]+\\.[a-z]{2,3}$', 'a@b.c1', FAILED],
      // Alternation between different lengths.
      ['^(\\d{4}|\\d{6})$', '1234', DONE],
      ['^(\\d{4}|\\d{6})$', '12345', MORE],
      ['^(\\d{4}|\\d{6})$', '123456', DONE],
      // Greedy dot with a fixed suffix.
      ['^.*-end$', 'anything-end', DONE],
      ['^.*-end$', 'anything-', MORE],
      // Escaped special characters (currency).
      ['^\\$\\d+\\.\\d{2}$', '$12.34', DONE],
      ['^\\$\\d+\\.\\d{2}$', '$12', MORE],
      // Non-ASCII ranges.
      ['^[a-zçğıöşü]+$', 'çağrı', DONE],
      // Named capturing groups behave like normal groups.
      ['^(?<year>\\d{4})$', '2024', DONE],
      ['^(?<year>\\d{4})$', '20', MORE],
      // Bounded repetition of groups (common in masks).
      ['^(ab){2,3}$', 'ab', MORE],
      ['^(ab){2,3}$', 'abab', DONE],
      ['^(ab){2,3}$', 'abababab', FAILED],
      ['^([0-9]{3}){2}$', '123', MORE],
      ['^([0-9]{3}){2}$', '123456', DONE],
    ];
    cases.forEach(([src, val, exp]) => {
      it(`/${src}/ "${val}" → ${exp}`, () => {
        expect(cl(src, val)).toBe(exp);
      });
    });
  });

  describe('unsupported syntax degrades to disabled mask (returns null, never crashes)', () => {
    it('lookahead', () => expect(cl('^(?=.*\\d)[a-z]+$', 'abc1')).toBe('NULL'));
    it('lookbehind', () => expect(cl('^(?<=\\d)[a-z]+$', '1a')).toBe('NULL'));
    it('back-reference', () => expect(cl('^(.)\\1$', 'aa')).toBe('NULL'));
    it('named back-reference', () => expect(cl('^(?<c>.)\\k<c>$', 'aa')).toBe('NULL'));
    it('malformed (unterminated class)', () => expect(cl('[A-Z', 'A')).toBe('NULL'));
  });

  // KNOWN LIMITATION: an unbounded quantifier (+/*) nested directly inside a bounded
  // quantifier ({n,m}) makes the per-repetition boundary ambiguous for our expansion
  // strategy. Such patterns are not realistic input masks; we record the actual
  // behavior here so it is intentional and visible, not a silent surprise.
  describe('known limitation (documented, not a regression)', () => {
    it('unbounded-inside-bounded is over-permissive', () => {
      // Ideally MORE (needs >= 2 outer reps); the matcher accepts it as DONE.
      expect(cl('^((ab)+|c){2,3}$', 'abab')).toBe(DONE);
    });
  });
});
