---
applyTo: 'packages/core/**/*.spec.tsx,packages/core/**/*.e2e.ts'
---

# Test Standards

## Test Types

- **Unit tests** (\*.spec.tsx): with `newSpecPage()` virtual DOM, component
  props/states
- **E2E tests** (\*.e2e.ts): Real browser, user interactions with 'newE2EPage()`

## Location

Test files are under the component directory: `components/tk-[component]/test/`

## Best Practices

- **DOM queries**: Prefer `data-testid`. e.g:
  `page.find('[data-testid="submit-button"]')`
- **Async**: Use `page.waitForChanges()`. Don't use `waitForTimeout`
- **Event tests**: Simulate user interaction (click, etc.). Don't use
  `callMethod`
- **Shadow DOM**: `tk-component >>> [data-testid="element"]` syntax can be used.

## Targeted Coverage

- Lines: 90%
- Functions: 90%
- Branches: 80%
- Statements: 90%

## Example Unit Test

```typescript
it('renders with default props', async () => {
  const page = await newSpecPage({
    components: [TkComponent],
    html: `<tk-component></tk-component>`,
  });
  expect(page.root).toBeTruthy();
});
```

## Example E2E Event Test

```typescript
const eventSpy = await page.spyOnEvent('tkChange');
const element = await page.find('[data-testid="interactive-element"]');
await element.click();
expect(eventSpy).toHaveReceivedEvent();
```
