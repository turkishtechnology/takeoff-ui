---
applyTo: '**/*.scss'
---

# Stil Standartları

## Design Variables

Figma variable'ları kullan. Kaynak:
`packages/core/src/global/sass/abstracts/_variables.scss`

- Fallbacksiz kullanım: `var(--primary-sub-base)`, `var(--neutral-100)`,
  `var(--desktop-body-m-base-size)`
- Yeni renk veya spacing eklerken \_variables.scss'e ekle

## Class İsimlendirme

- Component class'ları `tk-` prefix ile: `.tk-button`, `.tk-accordion`,
  `.tk-accordion-item`
- Modifier'lar: `.tk-button--large`, `.tk-component-active`
- Shadow olmayan componentlerde class isimleri açıklayıcı olmalı (stil
  ezilmemesi için)

## Örnek

```scss
.tk-component {
  color: var(--static-white);
  &.tk-component-large {
    font-size: var(--desktop-body-m-base-size);
  }
  &.tk-component-active {
    background: var(--primary-sub-base);
  }
}
```
