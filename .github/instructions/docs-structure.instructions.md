---
applyTo:
  - docs/src/docs-files/**
  - docs/docs/Components/**
---

# Takeoff UI Docs Structure

## Genel yapı

- Bileşen dokümantasyonları `docs/docs/Components/` altında yer alır. Örn:
  `docs/docs/Components/Button.mdx`, `docs/docs/Components/Accordion.mdx`.
- Bileşen dokümantasyonunda kullanılan alanlar
  `docs/src/docs-files/tk-[component-name]/` altında bulunur.

## Bileşen dokümantasyonu yapısı

Her bileşen için `docs/docs/Components/[ComponentName].mdx` dosyası oluşturulur.
Bu dosyada aşağıdaki bölümler bulunur:

- **Sidebar position**: Bileşenin dokümantasyonda hangi sırada görüneceğini
  belirten `sidebar_position` meta verisi.

- **HeadContent**: Bileşenin genel tanıtımı ve framework’lere özel import
  örnekleri

- **BodyContent**: Playground, kullanım örnekleri ve açıklamaları içerir.

- **API**: Bileşenin props ve özelliklerinin detaylı açıklaması.

- **Alt bileşen API'leri**: Alt bileşenleri olan bileşenlerde kullanılır. Alt
  bileşenlerin API'ları burada yer alır.

### `generate-docs` komutu

`docs/src/docs-files/tk-[component-name]/` içinde yer alan `head.mdx` ve
`api.mdx` dosyaları otomatik olarak üretilir. `head.mdx` içerisindeki açıklama
kısmı hariç bu dosyalar kesinlikle elle düzenlenmez.

## `tk-[component-name]` klasör yapısı

Her bileşen için `docs/src/docs-files/tk-[component-name]/` klasöründe şu
dosyalar bulunur:

- **`Examples/` klasörü**: Bileşenin kullanım örneklerini içeren TSX dosyaları.

- **`[componentName]PlaygroundConfig.json`**: Bileşene özgü playground
  yapılandırmasını içeren JSON dosyası

- **`api.mdx`**: Bileşenin API dokümantasyonunu içerir.

- **`head.mdx`**: Bileşenin tanıtımını ve import örneklerini içerir.

- **`body.mdx`**: Bileşenin playground ve kullanım örneklerini içeren ana içerik
  dosyası.

- **Alt bileşen klasörleri**: Alt bileşenler için yalnızca `api.mdx` ve
  `head.mdx` dosyaları bulunur; `body.mdx` yoktur.

## `body.mdx` içeriği

`body.mdx`, komponent dokümanının "kullanım" tarafını tanımlar:

- **Playground**: Bileşenin interaktif olarak deneyimlenebileceği alan.
  Playground config dosyasındaki örnekler burada gösterilir.

- **Kullanım örnekleri**: Bileşenin farklı kullanım senaryolarını gösteren
  örnekler. Bu örnekler `Examples` klasöründeki TSX dosyalarından import edilir
  ve `body.mdx` içinde doğrudan çağrılır; `<FeatureDemo>` kullanılmaz.

- **Açıklamalar**: Bileşenin özellikleri, kullanım ipuçları ve dikkat edilmesi
  gereken noktalar burada yer alır.

- **Uyarılar / bilgilendirici bileşenler**: Belirli özellikler veya kullanım
  durumları hakkında kullanıcıyı bilgilendirmek için `TkAlert` ve benzeri
  bileşenler kullanılabilir. Uyarı ile ilgili örnek arasında `<br />` etiketi
  kullanılarak boşluk bırakılır.

### body.mdx'de sıralama

body.mdx dosyası şu sırada yapılandırılır:

- En üstte import'lar yer alır (Examples, Playground, config JSON,
  `@takeoff-ui/react` component'leri).
- Import'ların ardından `### Playground` bölümü gelir; her zaman ilk içerik
  bölümüdür.
- Playground'dan sonra kullanım örnekleri sıralanır. Genel sıralama: Basic →
  (Her bileşende ortak olan prop'ların örnekleri) → Diğer prop'lar → Daha
  karmaşık senaryolar → Alt bileşen örnekleri.

## Examples içindeki TSX dosyaları

`docs/src/docs-files/tk-[component-name]/Examples/*.tsx` dosyaları, aşağıdaki
alanları kullanır:

| Alan          | Zorunlu | Açıklama                                                    |
| ------------- | ------- | ----------------------------------------------------------- |
| `featureDemo` | Evet    | Sayfada render edilen ana React bileşeni                    |
| `demo`        | Hayır   | Kısa, odaklı kullanım örneği bileşeni (`@takeoff-ui/react`) |
| `reactCode`   | Evet    | `demo`'daki örneğin React karşılığı (string)                |
| `vueCode`     | Evet    | Aynı örneğin Vue karşılığı (string)                         |
| `angularCode` | Evet    | Aynı örneğin Angular karşılığı (string)                     |
| `Example`     | Hayır   | Daha uzun / karmaşık senaryolar için ek bileşen             |

- Default export zorunludur.
- Harici hook (`useState`, `useEffect` vb.) gerekirse eklenebilir.
- `angularCode` içinde camelCase prop'lar dash-case'e dönüştürülür
  (`badgeStatus` → `badge-status`, `[dot]="true"` gibi binding söz dizimi).
- `featureDemo`ya return ederek tüm örnekler `demo`, `reactCode`, `vueCode` ve
  `angularCode` alanlarını içermelidir.

## Dosya isimlendirme kuralları

| Dosya                          | Format                             | Örnek                          |
| ------------------------------ | ---------------------------------- | ------------------------------ |
| PlaygroundConfig JSON          | `[camelCase]PlaygroundConfig.json` | `dialogPlaygroundConfig.json`  |
| Example TSX                    | PascalCase, prop veya özellik adı  | `Variant.tsx`, `FullWidth.tsx` |
| Component MDX                  | PascalCase                         | `Button.mdx`                   |
| docs-files klasörü             | `tk-[dash-case]`                   | `tk-button`, `tk-color-picker` |
| Alt bileşen docs-files klasörü | `tk-[parent]-[child]`              | `tk-accordion-item`            |
