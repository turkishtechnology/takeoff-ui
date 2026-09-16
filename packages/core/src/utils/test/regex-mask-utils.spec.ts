import { createIncrementalMatcher, stripAnchors, DONE, MORE, FAILED, MatchState } from '../regex-mask-utils';

describe('regex-mask-utils', () => {
  describe('createIncrementalMatcher', () => {
    const classify = (source: string, value: string): MatchState | null => {
      const matcher = createIncrementalMatcher(stripAnchors(source));
      return matcher ? matcher(value) : null;
    };

    const table: Array<[string, Array<[string, MatchState]>]> = [
      [
        '^[A-Z]{2}[0-9]{4}$',
        [
          ['', MORE],
          ['A', MORE],
          ['AB', MORE],
          ['AB1', MORE],
          ['AB1234', DONE],
          ['1', FAILED],
          ['ABX', FAILED],
          ['AB12345', FAILED],
        ],
      ],
      [
        '^(abc|def)$',
        [
          ['a', MORE],
          ['ab', MORE],
          ['abc', DONE],
          ['de', MORE],
          ['def', DONE],
          ['x', FAILED],
          ['abcd', FAILED],
        ],
      ],
      [
        '^[0-9,]{1,10}$',
        [
          ['', MORE],
          ['1', DONE],
          ['1,2,3', DONE],
          ['1234567890', DONE],
          ['1234567890,', FAILED],
          ['1a', FAILED],
        ],
      ],
      [
        '^[A-Z]+$',
        [
          ['A', DONE],
          ['ABC', DONE],
          ['', MORE],
          ['A1', FAILED],
        ],
      ],
      [
        '^\\d{3}-\\d{2}$',
        [
          ['1', MORE],
          ['123', MORE],
          ['123-', MORE],
          ['123-4', MORE],
          ['123-45', DONE],
          ['123-456', FAILED],
          ['12a', FAILED],
        ],
      ],
      [
        '^[a-z{}]+$',
        [
          ['a', DONE],
          ['a{}', DONE],
          ['a{}b', DONE],
          ['A', FAILED],
        ],
      ],
      [
        '^[0-9]{0,3}$',
        [
          ['', DONE],
          ['1', DONE],
          ['123', DONE],
          ['1234', FAILED],
          ['a', FAILED],
        ],
      ],
      [
        '^[A-Za-z][A-Za-z0-9_]*$',
        [
          ['myVar_1', DONE],
          ['1abc', FAILED],
          ['', MORE],
        ],
      ],
    ];

    table.forEach(([source, cases]) => {
      describe(source, () => {
        cases.forEach(([value, expected]) => {
          it(`classifies "${value}" as ${expected}`, () => {
            expect(classify(source, value)).toBe(expected);
          });
        });
      });
    });

    it('returns null for a malformed regex (unterminated class)', () => {
      expect(createIncrementalMatcher('[A-Z')).toBeNull();
    });

    it('returns null for a malformed regex (unterminated group)', () => {
      expect(createIncrementalMatcher('(abc')).toBeNull();
    });

    it('returns null for unsupported syntax (lookahead) gracefully or matches without crashing', () => {
      // Lookaheads are valid regex, so the native check passes; we just must not throw.
      const matcher = createIncrementalMatcher('(?=.*[0-9])[a-z]+');
      expect(() => matcher && matcher('abc')).not.toThrow();
    });
  });

  describe('escape sequences', () => {
    const classify = (source: string, value: string): MatchState | null => {
      const matcher = createIncrementalMatcher(stripAnchors(source));
      return matcher ? matcher(value) : null;
    };

    it('matches \\D as any non-digit', () => {
      expect(classify('^\\D$', 'a')).toBe(DONE);
      expect(classify('^\\D$', '-')).toBe(DONE);
      expect(classify('^\\D$', '5')).toBe(FAILED);
    });

    it('matches \\w and \\W as word and non-word characters', () => {
      expect(classify('^\\w+$', 'ab_9')).toBe(DONE);
      expect(classify('^\\w+$', 'a-')).toBe(FAILED);
      expect(classify('^\\W$', '-')).toBe(DONE);
      expect(classify('^\\W$', 'a')).toBe(FAILED);
    });

    it('matches \\s and \\S as whitespace and non-whitespace', () => {
      expect(classify('^\\s$', ' ')).toBe(DONE);
      expect(classify('^\\s$', 'x')).toBe(FAILED);
      expect(classify('^\\S$', 'x')).toBe(DONE);
      expect(classify('^\\S$', '\t')).toBe(FAILED);
    });

    it('matches \\n, \\t and \\r as the control characters they name', () => {
      expect(classify('^a\\nb$', 'a\nb')).toBe(DONE);
      expect(classify('^a\\tb$', 'a\tb')).toBe(DONE);
      expect(classify('^a\\rb$', 'a\rb')).toBe(DONE);
      expect(classify('^a\\nb$', 'anb')).toBe(FAILED);
    });

    it('matches an escaped metacharacter literally', () => {
      expect(classify('^\\(\\d\\)$', '(1)')).toBe(DONE);
      expect(classify('^\\(\\d\\)$', '1')).toBe(FAILED);
      expect(classify('^a\\.b$', 'a.b')).toBe(DONE);
      expect(classify('^a\\.b$', 'axb')).toBe(FAILED);
    });

    it('treats a lone . as any character except a newline', () => {
      expect(classify('^a.b$', 'axb')).toBe(DONE);
      expect(classify('^a.b$', 'a\nb')).toBe(FAILED);
    });
  });

  describe('character classes', () => {
    const classify = (source: string, value: string): MatchState | null => {
      const matcher = createIncrementalMatcher(stripAnchors(source));
      return matcher ? matcher(value) : null;
    };

    it('rejects the listed characters in a negated class and accepts everything else', () => {
      expect(classify('^[^0-9]+$', 'ab-')).toBe(DONE);
      expect(classify('^[^0-9]+$', 'a1')).toBe(FAILED);
      expect(classify('^[^abc]$', 'b')).toBe(FAILED);
      expect(classify('^[^abc]$', 'd')).toBe(DONE);
    });

    it('expands \\d, \\w and \\s inside a class', () => {
      expect(classify('^[\\d-]+$', '12-34')).toBe(DONE);
      expect(classify('^[\\d-]+$', '1a')).toBe(FAILED);
      expect(classify('^[\\w.]+$', 'a_b.c')).toBe(DONE);
      expect(classify('^[\\w.]+$', 'a b')).toBe(FAILED);
      expect(classify('^[\\s,]+$', ' ,\t')).toBe(DONE);
      expect(classify('^[\\s,]+$', 'x')).toBe(FAILED);
    });

    it('reads escaped literals inside a class', () => {
      expect(classify('^[\\]\\-]+$', ']-')).toBe(DONE);
      expect(classify('^[\\]\\-]+$', 'a')).toBe(FAILED);
      expect(classify('^[\\n]$', '\n')).toBe(DONE);
      expect(classify('^[\\n]$', 'n')).toBe(FAILED);
      expect(classify('^[\\t\\r]$', '\r')).toBe(DONE);
    });

    it('keeps a trailing - in a class as a literal', () => {
      expect(classify('^[a-]+$', 'a-a')).toBe(DONE);
      expect(classify('^[a-]+$', 'b')).toBe(FAILED);
    });
  });

  describe('groups, anchors and quantifier edge cases', () => {
    const classify = (source: string, value: string): MatchState | null => {
      const matcher = createIncrementalMatcher(stripAnchors(source));
      return matcher ? matcher(value) : null;
    };

    it('treats a non-capturing group like a plain group', () => {
      expect(classify('^(?:ab)+$', 'abab')).toBe(DONE);
      expect(classify('^(?:ab)+$', 'aba')).toBe(MORE);
      expect(classify('^(?:ab)+$', 'ac')).toBe(FAILED);
    });

    it('accepts anchors that survive stripping, inside a group or with surrounding whitespace', () => {
      const matcher = createIncrementalMatcher('^[0-9]+$');
      expect(matcher('12')).toBe(DONE);
      expect(matcher('a')).toBe(FAILED);
      expect(classify('^(^ab$)$', 'ab')).toBe(DONE);
      expect(classify('^(^ab$)$', 'a')).toBe(MORE);
    });

    it('lets a repeated group carry an anchor and an optional tail', () => {
      // Repeating a bounded group clones its already-expanded optional chain.
      expect(classify('^(a{1,2}){2}$', 'aa')).toBe(DONE);
      expect(classify('^(a{1,2}){2}$', 'aaaa')).toBe(DONE);
      expect(classify('^(a{1,2}){2}$', 'aaaaa')).toBe(FAILED);
      expect(classify('^(a$){2}$', 'aa')).toBe(DONE);
    });

    it('lets an empty alternative match the empty string', () => {
      expect(classify('^(ab|)$', '')).toBe(DONE);
      expect(classify('^(ab|)$', 'ab')).toBe(DONE);
      expect(classify('^(ab|)$', 'x')).toBe(FAILED);
      expect(classify('^()$', '')).toBe(DONE);
    });

    it('treats a { that does not open a quantifier as a literal', () => {
      expect(classify('^a{x}$', 'a{x}')).toBe(DONE);
      expect(classify('^a{x}$', 'aa')).toBe(FAILED);
    });

    it('ignores the lazy modifier on quantifiers', () => {
      expect(classify('^a+?b$', 'aab')).toBe(DONE);
      expect(classify('^a*?b$', 'b')).toBe(DONE);
      expect(classify('^a??b$', 'ab')).toBe(DONE);
      expect(classify('^a{1,2}?b$', 'aab')).toBe(DONE);
      expect(classify('^a{1,2}?b$', 'aaab')).toBe(FAILED);
    });

    it('reads {n,} as at least n and {,m} as at most m', () => {
      expect(classify('^a{2,}$', 'a')).toBe(MORE);
      expect(classify('^a{2,}$', 'aaaa')).toBe(DONE);
      expect(classify('^a{,2}$', '')).toBe(DONE);
      expect(classify('^a{,2}$', 'aa')).toBe(DONE);
      expect(classify('^a{,2}$', 'aaa')).toBe(FAILED);
    });

    it('returns null for an octal-style back-reference escape', () => {
      expect(createIncrementalMatcher('(a)\\1')).toBeNull();
    });
  });

  describe('stripAnchors', () => {
    it('removes leading ^ and trailing $', () => {
      expect(stripAnchors('^[0-9]+$')).toBe('[0-9]+');
    });
    it('leaves an unanchored pattern unchanged', () => {
      expect(stripAnchors('[0-9]+')).toBe('[0-9]+');
    });
  });
});
