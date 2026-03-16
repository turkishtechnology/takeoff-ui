# Yeni Demo

Mevcut bir bileşene yeni bir demo (FeatureDemo + örnek TSX) ekler veya yeni bir
bileşenin doküman iskeletini sıfırdan kurar.

## Parametreler

| Parametre       | Açıklama                                           |
| --------------- | -------------------------------------------------- |
| `componentName` | Stencil bileşen adı, ör. `tk-avatar` veya `avatar` |
| `feature`       | Eklenecek özellik / demo adı, ör. `WithBadges`     |

## Parametre normalizasyonu

`componentName` değeri `tk-` prefix'i olmadan verilebilir (ör. `avatar`,
`button`, `accordion`). Dosya yollarında kullanmadan önce aşağıdaki
normalizasyon uygulanır:

1. Değer `tk-` ile **başlamıyorsa** → başına `tk-` ekle (ör. `avatar` →
   `tk-avatar`, `date-picker` → `tk-date-picker`).
2. Değer zaten `tk-` ile **başlıyorsa** → olduğu gibi kullan.

Normalizasyon sonrası elde edilen değer, belgenin geri kalanındaki tüm
`{{componentName}}` yer tutucularında kullanılır.

## Bağlam toplama

Kod yazmaya başlamadan önce bileşen kaynağı okunur:

- `packages/core/src/components/{{componentName}}/{{componentName}}.tsx`

## Ön kontrol — ne yapılacağına karar ver

Aşağıdaki kontroller sırayla yapılır:

### Kontrol 1 — Doküman dosyaları var mı?

Aşağıdaki iki yolu kontrol et:

1. `docs/docs/Components/{{ComponentName}}.mdx` (ana sayfa, PascalCase; ör.
   `Avatar.mdx`)
2. `docs/src/docs-files/{{componentName}}/body.mdx`

- **İkisi de yoksa** → Bileşen ilk kez belgeleniyor demektir. "Sıfırdan bileşen
  iskeleti kur" bölümüne git.
- **Ana sayfa var ama body.mdx yoksa** → "Sıfırdan bileşen iskeleti kur"
  bölümünün 2. adımından devam et.
- **İkisi de varsa** → Kontrol 2'ye geç.

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

Her örnek TSX dosyası FeatureDemo bileşenini kendi içinde kullanır.

Kurallar:

- Fonksiyon adı = dosya adı (PascalCase).
- Default export zorunludur.
- `demo` değişkeni gerçek React bileşenlerini içerir (`@takeoff-ui/react`).
- `reactCode`, `vueCode`, `angularCode` string template olarak yazılır.
- **Angular kod bloğunda** camelCase prop'lar dash-case'e dönüştürülür
  (`badgeStatus` → `badge-status`, `[dot]="true"` gibi binding söz dizimi).
- Harici hook (useState, useEffect vb.) gerekirse eklenebilir.

### Adım 2 — body.mdx'i güncelle

body.mdx dosyasının üst kısmına import satırı, uygun sıraya başlık ve bileşen
çağrısı eklenir.

```mdx
import {{feature}} from './Examples/{{feature}}';

## Alt Başlık

Özelliğin kısa açıklaması.

<{{feature}} />
```

- Import satırı, mevcut import'ların hemen altına eklenir.
- Başlık + açıklama + bileşen çağrısı, mevcut demoların altına eklenir.
- body.mdx'te `<FeatureDemo>` kullanılmaz; TSX dosyası doğrudan çağrılır.

---

## Sıfırdan bileşen iskeleti kur

`body.mdx` dosyası yoksa bileşen ilk kez belgeleniyor demektir. Bu durumda
sırasıyla:

1. `docs/src/docs-files/{{componentName}}/` klasörünü oluştur.
2. `body.mdx` dosyasını oluştur; ilk satıra bileşeni tanıtan bir paragraf yaz.
3. `Examples/` alt klasörünü oluştur.
4. İlk demo TSX dosyasını oluştur ("Yeni örnek ekle" → Adım 1).
5. body.mdx'e import, başlık ve bileşen çağrısını ekle ("Yeni örnek ekle" → Adım
   2).
6. PlaygroundConfig dosyasını oluştur. Referans →
   `docs/src/components/Playground/Playground.types.ts`
7. `pnpm run generate-mdx` komutunu çalıştır; head.mdx ve api.mdx otomatik
   oluşur.
