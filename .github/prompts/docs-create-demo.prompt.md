---
instructions:
  - docs-structure.instructions.md
---

# Yeni Demo

Mevcut bir demoya yeni bir kullanım ekler, bileşene yeni bir demo ekler ya da
bileşenin doküman iskeletini sıfırdan kurar.

## Kullanıcı girdisinden çıkarım

Kullanıcının mesajından aşağıdaki iki bilgi çıkarılır:

- **componentName** — Stencil bileşen adı (ör. `tk-avatar`, `avatar`, `button`)
- **feature** — Eklenecek özellik / demo adı (ör. `WithBadges`, `Sizes`)

## Bağlam toplama

Kod yazmaya başlamadan önce bileşen kaynağı okunur:

- `packages/core/src/components/{{componentName}}/{{componentName}}.tsx`

## Ön kontrol — ne yapılacağına karar ver

### Doküman iskeleti var mı?

`docs/docs/Components/{{ComponentName}}.mdx` dosyasını kontrol et (PascalCase;
ör. `Avatar.mdx`).

- **Yoksa** → Bileşen ilk kez belgeleniyor. "Sıfırdan bileşen iskeleti kur"
  bölümüne git.
- **Varsa** → sonraki kontrole geç.

### Eşleşen örnek TSX var mı?

`docs/src/docs-files/{{componentName}}/Examples/` klasörünü listele.

- Aynı kavramı karşılayan bir örnek olabilir (ör. `{{feature}}` = `WithBadges`
  iken `Badges.tsx` veya `Badge.tsx` zaten varsa bu dosya eşleşir).
- **Eşleşen TSX varsa** → "Mevcut örneği güncelle" bölümüne git.
- **Eşleşen TSX yoksa** → "Yeni örnek ekle" bölümüne git.

## Mevcut örneği güncelle

`{{feature}}.tsx` zaten mevcut olduğunda yeni bir dosya oluşturulmaz. Mevcut TSX
dosyası açılır ve istenen değişiklik (yeni varyant, ek prop gösterimi vb.)
dosyanın içindeki `demo`, `reactCode`, `vueCode`, `angularCode` değişkenlerine
eklenir.

## Yeni örnek ekle

### Adım 1 — Örnek TSX dosyasını oluştur

`docs/src/docs-files/{{componentName}}/Examples/{{feature}}.tsx` dosyası
oluşturulur ve içi doldurulur.

### Adım 2 — body.mdx'i güncelle

## Sıfırdan bileşen iskeleti kur

Aşağıdaki adımlar sırasıyla uygulanır:

1. `docs/docs/Components/{{ComponentName}}.mdx` ana sayfa dosyasını oluştur

2. `docs/src/docs-files/{{componentName}}/` klasörünü oluştur

3. `docs/` dizininde `pnpm run generate-docs` komutunu çalıştır; `head.mdx` ve
   `api.mdx` otomatik olarak oluşur. Ardından `head.mdx` içindeki bileşen
   açıklaması paragrafını bileşenin amacına uygun şekilde doldur.

4. `body.mdx` dosyasını oluştur.

5. PlaygroundConfig JSON dosyasını oluştur.

6. `Examples/` alt klasörünü oluştur.

7. İlk demo TSX dosyasını oluştur — Basic kullanım olmalı ("Yeni örnek ekle" →
   Adım 1).

8. body.mdx'e import, başlık ve bileşen çağrısını ekle ("Yeni örnek ekle" → Adım
   2).

9. Ana dizinde `pnpm run format` çalıştırarak formatlama yap.
