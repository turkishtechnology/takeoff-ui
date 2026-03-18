# New Component

Component adı: `${component-name}`

Açıklama: ${description}

## Adım 1: Dizin & Dosyaları Oluştur

`component-file-structure` instructions'ına göre dizin yapısını oluştur. Child
component gerekip gerekmediğine bileşenin doğasına göre karar ver.

## Adım 2: TSX Dosyası

`stencil-components` instructions'ına göre `tk-${component-name}.tsx` dosyasını
yaz.

- Type oluşturmadan önce `/global/interfaces/` içerisinde benzer bir type var
  ise onu kullan.

- TSX içerisinde: @Element() el: HTMLElement; olarak tanımla.

- Bileşen API oluştururken mevcuttaki bileşenlerin API'ları ile paralele ilerle.

- `component-file-structure` instructions'ındaki kurallara göre `interfaces.ts`,
  `defaults.ts`, `helpers.ts` ve child component dosyalarını oluştur.

## Adım 3: SCSS Dosyası

`styling` instructions'ına göre `tk-${component-name}.scss` dosyasını yaz.

## Adım 4: Unit Test

`component-tests` instructions'ına göre `test/tk-${component-name}.spec.tsx`
dosyasını yaz.

## Adım 5: Child Component

Child component varsa Adım 2–4'ü child component için tekrarla.

## Adım 6: Stencil Config

Component two-way binding gerektiriyorsa (form elemanı, v-model desteği vb.)
`packages/core/stencil.config.ts` içindeki `vueComponentModels` ve
`angularValueAccessorBindings` dizilerine yeni component'i ekle.

## Adım 7: Build & Doğrulama

```bash
cd packages/core && pnpm run build
```

Build başarılı olduktan sonra TSX'teki `@Element() el: HTMLElement;` tanımını
`@Element() el: HTMLTk${ComponentName}Element;` olarak güncelle.

```bash
pnpm run test
pnpm run format
```
