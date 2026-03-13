---
applyTo:
  'docs/src/docs-files/*/Examples/*.tsx, docs/src/docs-files/**/body.mdx,
  docs/src/docs-files/**/*.json'
---

# Takeoff UI Docs Structure

- Docusaurus tabanlı dokümantasyon, `docs/` klasöründe yer alır.
- Ana dokümantasyon sayfaları `docs/docs/` altında bulunur. örn:
  `docs/docs/Introduction.mdx`, `docs/docs/Installation.mdx`,
  `docs/docs/CONTRIBUTING.mdx`.
- Bileşen dokümantasyonları `docs/docs/Components/` altında yer alır. örn:
  `docs/docs/Components/Button.mdx`, `docs/docs/Components/Accordion.mdx`.
- Dokümantasyona özel alanlar `docs/src/Components` altında tutulur. örn:
  playground config'leri, featureDemo yapısı, landings, vs.
- Dokümantasyonun stillendirmeleri `docs/src/css/` klasöründe yer alır.
- Statik datalar `docs/src/data/` klasöründe tutulur.
- Bileşen dokümantasyonunda kullanılan alanlar
  `docs/src/docs-files/tk-[ComponentName]/`.
- Dokümantasyonun build çıktısı `docs/build/` klasöründe yer alır.
- Görseller ve statik dosyalar `docs/static/` altında tutulur.
- Docusaurus yapılandırmaları `docs/docusaurus.config.ts` dosyasında yer alır.

## Bileşen Dokümantasyonu Yapısı

- Her bileşen için `docs/docs/Components/[ComponentName].mdx` dosyası
  oluşturulur.
- Bileşen dosyasında şu bölümler bulunur:
  - Sidebar Position: Bileşenin dokümantasyonda hangi sırada görüneceğini
    belirten `sidebar_position` meta verisi.
  - HeadContent: Bileşenin genel tanıtımı ve frameworklere özel import
    örnekleri. Burası `generate-mdx` komutu ile otomatik olarak oluşturulur.
  - BodyContent: Playground, kullanım örnekleri ve açıklamalar.
  - API: Bileşenin props ve özelliklerinin detaylı açıklaması. Burası
    `generate-mdx` komutu ile otomatik olarak oluşturulur.
  - Bileşenle ilgili diğer alt bileşenlerin API dokümantasyonu (örneğin
    Accordion için AccordionItem). Bu bölümler de `generate-mdx` komutu ile
    otomatik olarak oluşturulur.
- Bileşen dokümantasyonu için gerekli olan tüm içerikler
  `docs/src/docs-files/tk-[ComponentName]/` klasöründe tutulur.
- Bileşen klasöründe şu bölümler bulunur:
  - Examples klasörü: Bileşenin kullanım örneklerinin yer aldığı TSX dosyaları.
  - [ComponentName]PlaygroundConfig.json: Bileşene özgü playground
    yapılandırmasını içeren JSON dosyası.
  - api.mdx: Bileşenin API dokümantasyonunun yer aldığı MDX dosyası. Bu dosya
    `generate-mdx` komutu ile otomatik olarak oluşturulur.
  - head.mdx: Bileşenin tanıtımının ve import örneklerinin yer aldığı MDX
    dosyası. Bu dosya `generate-mdx` komutu ile otomatik olarak oluşturulur.
  - body.mdx: Bileşenin playground ve kullanım örneklerinin yer aldığı MDX
    dosyası.
  - Alt bileşenlerde sadece api.mdx ve head.mdx dosyaları bulunur.

### body.mdx İçeriği

- Playground: Bileşenin interaktif olarak deneyimlenebileceği bir alan.
  Playground config dosyasındaki örnekler burada gösterilir.
- Kullanım Örnekleri: Bileşenin farklı kullanım senaryolarını gösteren örnekler.
  Bu örnekler `Examples` klasöründe yer alan TSX dosyalarında bulunur ve
  body.mdx dosyasına import edilerek gösterilir.
- Açıklamalar: Bileşenin özellikleri, kullanım ipuçları ve diğer önemli bilgiler
  burada yer alır.
- Alerts veya diğer bilgilendirici bileşenler: Bileşenin belirli özellikleri
  veya kullanım durumları hakkında kullanıcıyı bilgilendirmek için
  kullanılabilir.
- Örnekler her bilşene için aynsı sırada gösterilir: Basic, Sizes, Variants,
  WithImages, WithBadges, WithShadow, vs. (varsa) ve son olarak da bileşenin
  grup kullanımı (örneğin AvatarGroupDemo).

#### Örnek TSX Dosyası İçeriği

- Her örnek TSX dosyası, bileşenin belirli bir kullanım senarysını gösterecek
  şekilde yapılandırılır.
- featuredemo
