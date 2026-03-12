---
applyTo: 'packages/core/**/*.spec.tsx,packages/core/**/*.e2e.ts'
---

# Test Standartları

## Test Türleri

- **Unit testler** (\*.spec.tsx): `newSpecPage()` ile virtual DOM, component
  props/states
- **E2E testler** (\*.e2e.ts): `newE2EPage()` ile gerçek tarayıcı, kullanıcı
  etkileşimleri

## Konum

Test dosyaları component dizini altında: `components/tk-[component]/test/`

## Best Practices

- **DOM sorguları**: `data-testid` tercih et. Örn:
  `page.find('[data-testid="submit-button"]')`
- **Async**: `page.waitForChanges()` kullan. `waitForTimeout` kullanma
- **Event testi**: Kullanıcı etkileşimini simüle et (click, vb.). `callMethod`
  tercih etme
- **Shadow DOM**: `tk-component >>> [data-testid="element"]` syntax'ı
  kullanılabilir

## Coverage Hedefleri

- Lines: 90%
- Functions: 90%
- Branches: 80%
- Statements: 90%

## Örnek Unit Test

```typescript
it('renders with default props', async () => {
  const page = await newSpecPage({
    components: [TkComponent],
    html: `<tk-component></tk-component>`,
  });
  expect(page.root).toBeTruthy();
});
```

## Örnek E2E Event Test

```typescript
const eventSpy = await page.spyOnEvent('tkChange');
const element = await page.find('[data-testid="interactive-element"]');
await element.click();
expect(eventSpy).toHaveReceivedEvent();
```
