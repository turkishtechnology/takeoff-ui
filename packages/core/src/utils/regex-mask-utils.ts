/**
 * Incremental regex matching for input masks.
 *
 * A regex such as `/^[A-Z]{2}[0-9]{4}$/` describes the *final* value, not the
 * intermediate states a user types through. Validating partial input against a
 * full-match regex is impossible with the native `RegExp` engine (e.g. `"A"` and
 * `"1"` both fail `^[A-Z]{2}[0-9]{4}$`, but only `"1"` should be rejected).
 *
 * This module compiles the pattern into a small Thompson NFA and simulates it one
 * character at a time, so it can tell whether the value so far is a complete match
 * (`DONE`), a valid prefix that could still grow (`MORE`), or impossible (`FAILED`).
 *
 * Supported syntax: literals, `.`, escapes (`\d \D \w \W \s \S` and literal
 * escapes), character classes `[...]` / `[^...]` with ranges, groups `(...)` and
 * `(?:...)`, alternation `|`, quantifiers `* + ? {n} {n,} {n,m}`, and anchors
 * `^ $`. Lookarounds and back-references are not supported; patterns using them
 * (or any pattern the native `RegExp` rejects) fall back to no masking.
 */

/** The value is a complete match for the pattern. */
export const DONE = 'DONE';
/** The value is a valid prefix; more characters could complete it. */
export const MORE = 'MORE';
/** The value can never match the pattern, no matter what is appended. */
export const FAILED = 'FAILED';

export type MatchState = typeof DONE | typeof MORE | typeof FAILED;

type CharTest = (ch: string) => boolean;

/**
 * Thrown when the pattern uses constructs that cannot be modeled by a finite
 * automaton (lookarounds, back-references). Callers treat it as "disable masking".
 */
class UnsupportedRegexError extends Error {}

interface CharNode {
  type: 'char';
  match: CharTest;
}
interface AnchorNode {
  type: 'anchor';
}
interface SeqNode {
  type: 'seq';
  items: AstNode[];
}
interface AltNode {
  type: 'alt';
  opts: AstNode[];
}
interface RepNode {
  type: 'rep';
  node: AstNode;
  min: number;
  max: number;
}
interface OptNode {
  type: 'opt';
  node: AstNode;
}
interface StarNode {
  type: 'star';
  node: AstNode;
}
type AstNode = CharNode | AnchorNode | SeqNode | AltNode | RepNode | OptNode | StarNode;

interface NfaState {
  eps: NfaState[];
  cons: CharTest | null;
  to: NfaState | null;
  accept: boolean;
}

/** Upper bound on bounded quantifiers ({n,m}); guards against state explosion. */
const MAX_QUANTIFIER = 1000;

// ── Parser: regex source → AST ──────────────────────────────────────────────
const parse = (src: string): AstNode => {
  let i = 0;
  const peek = () => src[i];
  const next = () => src[i++];
  const eof = () => i >= src.length;

  const parseAlt = (): AstNode => {
    const opts: AstNode[] = [parseSeq()];
    while (peek() === '|') {
      next();
      opts.push(parseSeq());
    }
    return opts.length === 1 ? opts[0] : { type: 'alt', opts };
  };

  const parseSeq = (): AstNode => {
    const items: AstNode[] = [];
    while (!eof() && peek() !== '|' && peek() !== ')') {
      items.push(parseQuant());
    }
    return { type: 'seq', items };
  };

  const lazy = () => {
    if (peek() === '?') next();
  };

  const parseQuant = (): AstNode => {
    const node = parseAtom();
    const c = peek();
    if (c === '*') {
      next();
      lazy();
      return { type: 'rep', node, min: 0, max: Infinity };
    }
    if (c === '+') {
      next();
      lazy();
      return { type: 'rep', node, min: 1, max: Infinity };
    }
    if (c === '?') {
      next();
      lazy();
      return { type: 'rep', node, min: 0, max: 1 };
    }
    if (c === '{') {
      const save = i;
      const m = src.slice(i).match(/^\{(\d*)(?:,(\d*))?\}/);
      if (m) {
        i += m[0].length;
        lazy();
        const min = m[1] === '' ? 0 : Number(m[1]);
        const max = m[2] === undefined ? (m[1] === '' ? Infinity : min) : m[2] === '' ? Infinity : Number(m[2]);
        return { type: 'rep', node, min, max };
      }
      i = save; // not a quantifier; treat '{' as a literal handled by parseAtom next time
    }
    return node;
  };

  const parseEsc = (e: string): CharNode => {
    // Back-references (\1..\9, \k<name>) require memory of captured text and cannot
    // be modeled by a finite automaton.
    if (e >= '1' && e <= '9') throw new UnsupportedRegexError('back-reference is not supported');
    if (e === 'k') throw new UnsupportedRegexError('named back-reference is not supported');
    const classes: Record<string, CharTest> = {
      d: ch => ch >= '0' && ch <= '9',
      D: ch => !(ch >= '0' && ch <= '9'),
      w: ch => /[A-Za-z0-9_]/.test(ch),
      W: ch => !/[A-Za-z0-9_]/.test(ch),
      s: ch => /\s/.test(ch),
      S: ch => !/\s/.test(ch),
    };
    if (classes[e]) return { type: 'char', match: classes[e] };
    const lit = ({ n: '\n', t: '\t', r: '\r' } as Record<string, string>)[e] ?? e;
    return { type: 'char', match: ch => ch === lit };
  };

  const parseClass = (): CharNode => {
    next(); // consume '['
    let neg = false;
    if (peek() === '^') {
      neg = true;
      next();
    }
    const tests: CharTest[] = [];
    while (!eof() && peek() !== ']') {
      let ch = next();
      if (ch === '\\') {
        const e = next();
        const classes: Record<string, CharTest> = {
          d: c => c >= '0' && c <= '9',
          w: c => /[A-Za-z0-9_]/.test(c),
          s: c => /\s/.test(c),
        };
        if (classes[e]) {
          tests.push(classes[e]);
          continue;
        }
        ch = ({ n: '\n', t: '\t', r: '\r' } as Record<string, string>)[e] ?? e;
      }
      if (peek() === '-' && src[i + 1] !== ']' && i + 1 < src.length) {
        next(); // consume '-'
        const end = next();
        const lo = ch;
        const hi = end;
        tests.push(c => c >= lo && c <= hi);
      } else {
        const only = ch;
        tests.push(c => c === only);
      }
    }
    next(); // consume ']'
    return {
      type: 'char',
      match: c => {
        const hit = tests.some(t => t(c));
        return neg ? !hit : hit;
      },
    };
  };

  const parseAtom = (): AstNode => {
    const c = peek();
    if (c === '(') {
      next();
      if (peek() === '?') {
        const flag = src[i + 1];
        if (flag === ':') {
          i += 2; // non-capturing group (?:...)
        } else if (flag === '<' && src[i + 2] !== '=' && src[i + 2] !== '!') {
          // Named capturing group (?<name>...) — skip up to and including '>'.
          i += 2;
          while (!eof() && peek() !== '>') next();
          next(); // consume '>'
        } else {
          // Lookahead (?=, (?!, lookbehind (?<=, (?<! — cannot be modeled by an NFA.
          throw new UnsupportedRegexError('lookaround is not supported');
        }
      }
      const inner = parseAlt();
      next(); // consume ')'
      return inner;
    }
    if (c === '[') return parseClass();
    if (c === '^' || c === '$') {
      next();
      return { type: 'anchor' };
    }
    if (c === '.') {
      next();
      return { type: 'char', match: ch => ch !== '\n' };
    }
    if (c === '\\') {
      next();
      return parseEsc(next());
    }
    next();
    return { type: 'char', match: ch => ch === c };
  };

  return parseAlt();
};

// ── Normalizer: expand bounded reps into explicit optional chains ───────────
const cloneNode = (n: AstNode): AstNode => {
  switch (n.type) {
    case 'char':
      return { type: 'char', match: n.match };
    case 'anchor':
      return { type: 'anchor' };
    case 'seq':
      return { type: 'seq', items: n.items.map(cloneNode) };
    case 'alt':
      return { type: 'alt', opts: n.opts.map(cloneNode) };
    case 'rep':
      return { type: 'rep', node: cloneNode(n.node), min: n.min, max: n.max };
    case 'opt':
      return { type: 'opt', node: cloneNode(n.node) };
    case 'star':
      return { type: 'star', node: cloneNode(n.node) };
  }
};

const expand = (node: AstNode): AstNode => {
  switch (node.type) {
    case 'seq':
      return { type: 'seq', items: node.items.map(expand) };
    case 'alt':
      return { type: 'alt', opts: node.opts.map(expand) };
    case 'opt':
      return { type: 'opt', node: expand(node.node) };
    case 'star':
      return { type: 'star', node: expand(node.node) };
    case 'rep': {
      const inner = expand(node.node);
      const min = Math.min(node.min, MAX_QUANTIFIER);
      const items: AstNode[] = [];
      for (let k = 0; k < min; k++) items.push(cloneNode(inner));
      if (node.max === Infinity) {
        items.push({ type: 'star', node: cloneNode(inner) });
      } else {
        // (max - min) nested-optional copies: ( inner ( inner ( ... )? )? )?
        const span = Math.min(node.max, MAX_QUANTIFIER) - min;
        let opt: AstNode | null = null;
        for (let k = 0; k < span; k++) {
          const seqItems: AstNode[] = [cloneNode(inner)];
          if (opt) seqItems.push(opt);
          opt = { type: 'opt', node: { type: 'seq', items: seqItems } };
        }
        if (opt) items.push(opt);
      }
      return { type: 'seq', items };
    }
    default:
      return node;
  }
};

// ── Compiler: AST → Thompson NFA ────────────────────────────────────────────
interface Fragment {
  start: NfaState;
  outs: ((target: NfaState) => void)[];
}

const compile = (ast: AstNode): NfaState => {
  const mk = (): NfaState => ({ eps: [], cons: null, to: null, accept: false });
  const patch = (outs: Fragment['outs'], t: NfaState) => outs.forEach(set => set(t));

  const build = (n: AstNode): Fragment => {
    switch (n.type) {
      case 'char': {
        const s = mk();
        return {
          start: s,
          outs: [
            t => {
              s.cons = n.match;
              s.to = t;
            },
          ],
        };
      }
      case 'anchor': {
        const s = mk();
        return { start: s, outs: [t => s.eps.push(t)] };
      }
      case 'seq': {
        if (!n.items.length) {
          const s = mk();
          return { start: s, outs: [t => s.eps.push(t)] };
        }
        let f = build(n.items[0]);
        for (let k = 1; k < n.items.length; k++) {
          const g = build(n.items[k]);
          patch(f.outs, g.start);
          f = { start: f.start, outs: g.outs };
        }
        return f;
      }
      case 'alt': {
        const s = mk();
        const outs: Fragment['outs'] = [];
        n.opts.forEach(o => {
          const f = build(o);
          s.eps.push(f.start);
          outs.push(...f.outs);
        });
        return { start: s, outs };
      }
      case 'opt': {
        const f = build(n.node);
        const s = mk();
        s.eps.push(f.start);
        return { start: s, outs: [...f.outs, t => s.eps.push(t)] };
      }
      case 'star': {
        const s = mk();
        const f = build(n.node);
        s.eps.push(f.start);
        patch(f.outs, s);
        return { start: s, outs: [t => s.eps.push(t)] };
      }
      case 'rep': {
        // Reps are removed by expand(); compile the equivalent star as a safety net.
        return build({ type: 'star', node: n.node });
      }
    }
  };

  const f = build(ast);
  const accept = mk();
  accept.accept = true;
  patch(f.outs, accept);
  return f.start;
};

// ── Simulation ──────────────────────────────────────────────────────────────
const epsClosure = (states: Iterable<NfaState>): Set<NfaState> => {
  const stack = [...states];
  const seen = new Set<NfaState>(stack);
  while (stack.length) {
    const s = stack.pop()!;
    for (const t of s.eps) {
      if (!seen.has(t)) {
        seen.add(t);
        stack.push(t);
      }
    }
  }
  return seen;
};

const stepStates = (states: Set<NfaState>, ch: string): Set<NfaState> => {
  const nextStates = new Set<NfaState>();
  for (const s of states) {
    if (s.cons && s.to && s.cons(ch)) nextStates.add(s.to);
  }
  return epsClosure(nextStates);
};

/**
 * Builds a reusable matcher for a pattern.
 *
 * @param source - The regex source string (anchors `^ $` are accepted and treated
 *   as a single-line, fully-anchored match).
 * @returns A `classify(value)` function returning {@link MatchState}, or `null` if
 *   the pattern is unsupported/invalid (caller should skip masking in that case).
 */
export const createIncrementalMatcher = (source: string): ((value: string) => MatchState) | null => {
  // Let the native engine reject malformed patterns (unterminated classes/groups,
  // invalid escapes, lookarounds we can't model, …) so we never silently
  // misinterpret a bad regex.
  try {
    // eslint-disable-next-line no-new
    new RegExp(source);
  } catch {
    return null;
  }

  let start: NfaState;
  try {
    start = compile(expand(parse(source)));
  } catch {
    return null;
  }

  return (value: string): MatchState => {
    let current = epsClosure([start]);
    for (const ch of value) {
      current = stepStates(current, ch);
      if (current.size === 0) return FAILED;
    }
    return [...current].some(s => s.accept) ? DONE : MORE;
  };
};

/** Strips leading `^` and trailing `$` for use where anchors are implied. */
export const stripAnchors = (source: string): string => source.replace(/^\^/, '').replace(/\$$/, '');
