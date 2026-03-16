# Yeni Demo

Mevcut bir bileşene yeni bir demo (FeatureDemo + örnek TSX) ekler veya yeni bir
bileşenin doküman iskeletini sıfırdan kurar.

## Kullanıcı girdisinden çıkarım

Kullanıcının mesajından aşağıdaki iki bilgi çıkarılır:

- **componentName** — Stencil bileşen adı (ör. `tk-avatar`, `avatar`, `button`)
- **feature** — Eklenecek özellik / demo adı (ör. `WithBadges`, `Sizes`)

### Örnekler

| Kullanıcı mesajı                                | componentName   | feature             |
| ----------------------------------------------- | --------------- | ------------------- |
| "avatar bileşenine badge demo'su ekle"          | `tk-avatar`     | `WithBadges`        |
| "tk-button'a size varyantlarını belgele"        | `tk-button`     | `Sizes`             |
| "datepicker için yeni doküman iskeleti oluştur" | `tk-datepicker` | _(kullanıcıya sor)_ |

- `feature` mesajdan net çıkarılamıyorsa kullanıcıya sorulur.
- `componentName` mesajdan net çıkarılamıyorsa kullanıcıya sorulur.

### componentName normalizasyonu

Değer `tk-` ile başlamıyorsa başına `tk-` eklenir (ör. `avatar` → `tk-avatar`).
Zaten `tk-` ile başlıyorsa olduğu gibi kullanılır. Belgenin geri kalanındaki tüm
`{{componentName}}` yer tutucuları bu normalize değeri ifade eder.

## Bağlam toplama

Kod yazmaya başlamadan önce bileşen kaynağı okunur:

- `packages/core/src/components/{{componentName}}/{{componentName}}.tsx`

## Ön kontrol — ne yapılacağına karar ver

### Kontrol 1 — Doküman dosyası var mı?

`docs/docs/Components/{{ComponentName}}.mdx` dosyasını kontrol et (PascalCase;
ör. `Avatar.mdx`).

- **Yoksa** → Bileşen ilk kez belgeleniyor. "Sıfırdan bileşen iskeleti kur"
  bölümüne git.
- **Varsa** → Kontrol 2'ye geç.

### Kontrol 2 — Feature ile eşleşen örnek TSX var mı?

`docs/src/docs-files/{{componentName}}/Examples/` klasörünü listele.

- Aynı kavramı karşılayan bir örnek olabilir (ör. `{{feature}}` = `WithBadges`
  iken `Badges.tsx` veya `Badge.tsx` zaten varsa bu dosya eşleşir).
- **Eşleşen TSX varsa** → "Mevcut örneği güncelle" bölümüne git.
- **Eşleşen TSX yoksa** → "Yeni örnek ekle" bölümüne git.

---

## Mevcut örneği güncelle

`{{feature}}.tsx` zaten mevcut olduğunda yeni bir dosya oluşturulmaz. Mevcut TSX
dosyası açılır ve istenen değişiklik (yeni varyant, ek prop gösterimi vb.)
dosyanın içindeki `demo`, `reactCode`, `vueCode`, `angularCode` değişkenlerine
eklenir.

Kurallar:

- Genel yapı bozulmaz.
- Yeni eklenen öğeler, mevcut öğelerin hemen altına yerleştirilir.

---

## Yeni örnek ekle

### Adım 1 — Örnek TSX dosyasını oluştur

`docs/src/docs-files/{{componentName}}/Examples/{{feature}}.tsx` dosyası
oluşturulur.

Her örnek TSX dosyası `FeatureDemo` bileşenini kendi içinde kullanır.

Kurallar:

- Fonksiyon adı = dosya adı (PascalCase).
- Default export zorunludur.
- `demo` değişkeni gerçek React bileşenlerini içerir (`@takeoff-ui/react`).
- `reactCode`, `vueCode`, `angularCode` string template olarak yazılır.
- **Angular kod bloğunda** camelCase prop'lar dash-case'e dönüştürülür
  (`badgeStatus` → `badge-status`, `[dot]="true"` gibi binding söz dizimi).
- Harici hook (useState, useEffect vb.) gerekirse eklenebilir.

### Adım 2 — body.mdx'i güncelle

- Import satırı, mevcut import'ların hemen altına eklenir.
- Başlık + açıklama + bileşen çağrısı, mevcut demoların altına eklenir.
- body.mdx'te `<FeatureDemo>` kullanılmaz; TSX dosyası doğrudan çağrılır.

---

## Sıfırdan bileşen iskeleti kur

Sırasıyla:

1. `docs/docs/Components/{{ComponentName}}.mdx` ana sayfa dosyasını oluştur.

2. `docs/src/docs-files/{{componentName}}/` klasörünü oluştur.

3. `docs/` dizininde `pnpm run generate-docs` komutunu çalıştır; `head.mdx` ve
   `api.mdx` otomatik oluşur. Ardından `head.mdx` içindeki bileşen açıklaması
   paragrafını bileşenin amacına uygun şekilde doldur.

4. `body.mdx` dosyasını oluştur. İlk satırlarda Playground import'u ve
   konfigürasyonu yer almalı.

5. PlaygroundConfig JSON dosyasını oluştur
   (`{{componentName}}PlaygroundConfig.json`). Referans →
   `docs/src/components/Playground/Playground.types.ts`

6. `Examples/` alt klasörünü oluştur.

7. İlk demo TSX dosyasını oluştur — basic kullanım olmalı ("Yeni örnek ekle" →
   Adım 1).

8. body.mdx'e import, başlık ve bileşen çağrısını ekle ("Yeni örnek ekle" → Adım
   2).

9. Ana dizinde `pnpm run format` çalıştırarak formatlama yap.
