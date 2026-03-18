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
- Modifier'lar: `.tk-component-large`, `.tk-component-active`,
  `.tk-component-label`
- Shadow olmayan componentlerde class isimleri açıklayıcı olmalı (stil
  ezilmemesi için)

## Mixinler

- Ortak mixinler `packages/core/src/global/sass/mixins/` altındadır
- Kullanım: dosyanın en üstüne `@use '../../global/sass/mixins' as *;` ekle
- Yeni mixin eklerken `mixins/` altına `_isim.scss` dosyası oluştur ve
  `mixins/index.scss`'e `@forward` ile ekle

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
