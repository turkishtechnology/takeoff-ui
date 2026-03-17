# New Component

Component adı: `{{component-name}}`

Önce `packages/core/src/components/` altında aynı işlevi karşılayan bir
component olup olmadığını kontrol et. Varsa oluşturma, kullanıcıyı bilgilendir.

## Adım 1: Dizin & Dosyaları Oluştur

`component-file-structure` instructions'ına göre dizin yapısını oluştur. Child
component gerekip gerekmediğine bileşenin doğasına göre karar ver.

## Adım 2: TSX Dosyası

`stencil-components` instructions'ına göre `tk-{{component-name}}.tsx` dosyasını
yaz.

## Adım 3: SCSS Dosyası

`styling` instructions'ına göre `tk-{{component-name}}.scss` dosyasını yaz.

## Adım 4: Unit Test

`component-tests` instructions'ına göre `test/tk-{{component-name}}.spec.tsx`
dosyasını yaz.

## Adım 5: Ek Dosyalar (gerekirse)

`component-file-structure` instructions'ındaki kurallara göre `interfaces.ts`,
`defaults.ts`, `helpers.ts` ve child component dosyalarını oluştur.

## Adım 6: Doğrulama

```bash
pnpm run build
```
