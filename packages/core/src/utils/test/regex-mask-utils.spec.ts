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

  describe('stripAnchors', () => {
    it('removes leading ^ and trailing $', () => {
      expect(stripAnchors('^[0-9]+$')).toBe('[0-9]+');
    });
    it('leaves an unanchored pattern unchanged', () => {
      expect(stripAnchors('[0-9]+')).toBe('[0-9]+');
    });
  });
});
