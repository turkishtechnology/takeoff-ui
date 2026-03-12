# Takeoff UI - Proje Yapısı

Takeoff UI, Stencil ile geliştirilmiş web components kütüphanesidir. React, Vue
ve Angular için wrapper paketleri sunar.

## Paket Sorumlulukları

- **packages/core**: Tüm Stencil component geliştirmesi burada yapılır. Ana
  geliştirme paketidir.
- **packages/react**, **packages/vue**, **packages/angular**: Stencil
  output-target ile otomatik üretilen wrapper paketlerdir. Manuel değişiklik
  yapılmaz.
- **docs/**: Docusaurus dokümantasyonu. Playground config'ler ve MDX içerikleri
  burada.

## Build ve Test Komutları

- **Bootstrap**: `pnpm install` (Node >= 20.12.2, pnpm >= 8.0.0)
- **Core build**: `pnpm run build --filter=@takeoff-ui/core` veya
  `cd packages/core && pnpm run build`
- **Core test**: `cd packages/core && pnpm run test`
- **Core test (coverage)**: `cd packages/core && pnpm run test.coverage`
- **Lint**: `pnpm run lint`
- **Format**: `pnpm run format`

## Proje Layout

- `packages/core/src/components/`: Stencil component'leri (tk-button,
  tk-accordion, vb.)
- `packages/core/src/utils/`: Birden fazla component tarafından kullanılan
  yardımcılar
- `packages/core/src/global/interfaces/`: Paylaşılan type ve interface'ler
- `packages/core/src/global/sass/abstracts/_variables.scss`: Figma design
  token'ları

## Önemli Notlar

- Yeni component eklerken `stencil generate` kullanılabilir.
- Component geliştirmesi sadece packages/core içinde yapılır.
- Wrapper paketlerde (react, vue, angular) asla manuel değişiklik yapma.
