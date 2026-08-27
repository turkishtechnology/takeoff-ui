# Lane catalog

One agent per coherent QUESTION — never per file. Each lane below states its
question, its REQUIRED ARTEFACT (non-negotiable: never paragraphs about a
topic), and its standing questions.

## Cheat sheet — which lanes to pick

| The diff touches…                                           | Lanes                                  |
| ----------------------------------------------------------- | -------------------------------------- |
| `packages/core/src/components/**`                           | 1, plus 2 if the public contract moved |
| `packages/{react,vue,angular}/**`                           | 2                                      |
| `*.scss`, `*.css`, `packages/tailwind/**`, `global/`        | 3                                      |
| `*.e2e.ts`, `*.spec.ts`, `__tests__/`                       | 4                                      |
| `docs/**`, `*.mdx`, README                                  | 5                                      |
| `package.json`, `turbo.json`, `.github/**`, `.changeset/**` | 6                                      |
| A claim with "every", "all", "exactly one", "the only"      | 0 (always add)                         |

Lane 6 (claim audit) is run by the ORCHESTRATOR itself, always, and is not
fanned out.

---

## Lane 0 — Enumeration

**Question:** is the enumerable claim actually true across the whole population?

**Required artefact:** the full population as a list, each member marked holds /
does-not-hold, with `file:line`.

Add this lane whenever any claim in the PR description, a commit message, or a
code comment quantifies over a set: "every component", "all wrappers", "the only
place", "exactly one". These are falsified by ENUMERATION, never by reading the
mechanism's call sites. Enumerate `packages/core/src/components/*/` when the
population is components; enumerate the three wrapper packages when it is
frameworks.

---

## Lane 1 — Component contract & lifecycle

**Question:** does the component still behave correctly across its full
lifecycle, and does its public surface still mean what consumers think it means?

**Required artefact:** a table of every public `@Prop`, `@Event`, `@Method` and
slot the diff touches — old contract → new contract → who breaks.

Standing questions:

- Is a `@Prop` type widened or narrowed? A narrowing is a breaking change for
  consumers even when TypeScript in this repo still compiles.
- Is an `@Event` renamed, or is its `detail` payload shape changed? Grep the
  event name across all three wrappers and `docs/`.
- Does `disconnectedCallback` clean up everything `connectedCallback` and
  `componentDidLoad` set up — listeners, observers, timers, `document`-level
  handlers? A missing removal leaks per mount/unmount cycle.
- Do `@Watch` handlers fire on the initial render, and does the code assume they
  do (or do not)?
- Is state mutated in a way Stencil cannot see (mutating an array/object in
  place rather than reassigning)? That renders stale.
- Is a `@Prop({ mutable: true })` written from inside the component without an
  accompanying event, so the consumer's binding silently desynchronises?
- Keyboard and ARIA: is a control reachable by Tab, does a disabled control
  announce why, does focus survive re-render?

---

## Lane 2 — Framework parity

**Question:** does this change land identically in React, Vue and Angular — or
does it silently land in one?

**Required artefact:** a 3-column matrix (react / vue / angular) × the changed
contract items, each cell: propagated / missing / N-A with `file:line`.

Standing questions:

- The wrappers under `stencil-generated/`, `packages/vue/lib/components.ts` and
  the Angular `directives/` are BUILD OUTPUT (see `.gitignore`). If the PR
  hand-edits them, that edit is erased on the next build — that is a finding.
- Does a new component appear in each wrapper's public exports?
- Event naming differs per framework binding (`onTkChange` vs `@tkChange` vs
  `(tkChange)`). Does the docs example for each framework match what the wrapper
  actually emits?
- Does a new prop with a non-primitive type (object/array/function) cross the
  wrapper boundary correctly, or does it need explicit serialisation?

---

## Lane 3 — Styling, theming & tokens

**Question:** does this render correctly in every theme and density the design
system supports, and does it respect the token layer?

**Required artefact:** an inventory of every CSS custom property, class and
hardcoded value the diff adds or changes, each marked token-backed / hardcoded /
overridden.

Standing questions:

- Hardcoded hex/rgb values in component styles bypass theming. Is there an
  existing token for this value? Grep `packages/tailwind` and the global styles.
- Does a new style rule leak past its component (`:host` scoping, `::part`,
  `::slotted`)? Stencil's scoping is not shadow DOM in every mode — check the
  component's `shadow`/`scoped` setting before assuming isolation.
- Does the change hold in dark mode and RTL if the repo supports them?
- Is a `z-index` introduced without reference to the existing layering scale?
- Does a specificity bump silently override a consumer's own override?

---

## Lane 4 — Test integrity

**Question:** do these tests actually test what their names claim?

**Required artefact:** a table — test name → the branch it claims to cover → the
line that ARMS that branch → verdict (exercises it / passes vacuously).

Standing questions:

- Trace the arming condition for every new test. A test that sets state directly
  when the production path only reaches that state through a user interaction is
  passing vacuously: it would still pass with the feature deleted.
- Would this test fail if the fix were reverted? If you cannot show the line
  that would break, say so.
- Is an assertion checking a default browser behaviour rather than the new code?
- Are new e2e tests actually run by CI? Check the workflow that invokes them.
- Does the PR change behaviour with NO test, while claiming coverage?

---

## Lane 5 — Docs & public API surface

**Question:** does the documented API match the shipped API?

**Required artefact:** a table — documented item → docs location → actual code →
match / drift.

Standing questions:

- A new/changed `@Prop` with no docs page update is drift. So is a removed prop
  still documented.
- Do the framework-specific code examples in `docs/` compile against the new
  contract?
- Does the changeset (`.changeset/*.md`) describe the change at the right semver
  level — a breaking contract change under a patch bump is a release hazard.
- Are strings user-visible and localised where the repo expects it?

---

## Lane 6 — Claim audit (orchestrator runs this, always)

**Question:** which claims made by this PR are false?

**Required artefact:** a table — claim / TRUE / FALSE / OVERSTATED / evidence
`file:line`.

The PR description, commit messages and code comments are a LIST OF CLAIMS TO BE
TESTED, not context to be trusted.

Three recurring shapes to watch for:

- **Overstated scope** — "fixes X for all components" when it fixes it for one.
- **Unreachable justification** — a rationale that describes a state the code
  cannot actually be in.
- **Unsupported sequencing** — "A happens before B" with nothing enforcing the
  order.

Also check whether the PR's own artefacts disagree with each other: description
vs changeset vs test names vs the code.
