# Bugfix Prompt

Fix the reported bug with the smallest safe change needed.

## Approach

- Do not rewrite or refactor unrelated code.
- Do not make an architectural change unless the bug cannot be fixed without it.
- Prefer the narrowest fix in the existing implementation.
- Keep public API and existing behavior unchanged unless the bug specifically
  requires a change.
- Follow the existing patterns already used in this repository.
- Ask a clarifying question only if a few valid alternative fixes exist or key
  details are missing and a safe fix cannot be chosen confidently.

## Check What Should Change

Review only the files that are relevant to the bug:

- Component implementation files in `packages/core`
- Related type files only if the bug touches types or component contracts
- Related test files and add or update tests when the bug should be covered
- Docs only if the bug fix changes documented behavior, usage, or examples

## Repository Notes

- Component development happens in `packages/core`
- Do not manually edit generated wrapper packages unless the task explicitly
  requires it

## After The Change

Run only the checks that apply here:

- `pnpm run lint`
- `pnpm run check-types`
- `pnpm run test`

If the bug is limited to a smaller area, prefer the narrowest relevant
verification, but do not skip tests that validate the fix.
