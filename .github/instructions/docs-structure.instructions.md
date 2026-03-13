---
applyTo:
  - docs/src/docs-files/*/Examples/*.tsx
  - docs/src/docs-files/**/body.mdx
  - docs/src/docs-files/**/[component]PlaygroundConfig.json
---

# Takeoff UI Docs Structure

Bu dosya, komponent dokümantasyonu için `docs/src/docs-files/*` altındaki
`Examples/*.tsx`, `body.mdx` ve playground JSON dosyalarının nasıl yazılması
gerektiğini açıklar.

## Genel yapı

- Docusaurus tabanlı dokümantasyon `docs/` klasöründe yer alır.
- Ana dokümantasyon sayfaları `docs/docs/` altındadır. Örn:
  `docs/docs/Introduction.mdx`, `docs/docs/Installation.mdx`,
  `docs/docs/CONTRIBUTING.mdx`.
- Bileşen dokümantasyonları `docs/docs/Components/` altında yer alır. Örn:
  `docs/docs/Components/Button.mdx`, `docs/docs/Components/Accordion.mdx`.
- Dokümantasyona özel React bileşenleri (playground, feature demos, landings
  vb.) `docs/src/Components` altında tutulur.
- Dokümantasyon stilleri `docs/src/css/` klasöründedir.
- Statik datalar `docs/src/data/` klasöründe tutulur.
- Bileşen dokümantasyonunda kullanılan alanlar
  `docs/src/docs-files/tk-[ComponentName]/` altında bulunur.
- Dokümantasyonun build çıktısı `docs/build/` klasöründe yer alır.
- Görseller ve statik dosyalar `docs/static/` altında tutulur.
- Docusaurus yapılandırmaları `docs/docusaurus.config.ts` dosyasında yer alır.

## Bileşen dokümantasyonu yapısı

Her bileşen için `docs/docs/Components/[ComponentName].mdx` dosyası oluşturulur.
Bu dosyada aşağıdaki bölümler bulunur:

- **Sidebar position**: Bileşenin dokümantasyonda hangi sırada görüneceğini
  belirten `sidebar_position` meta verisi.
- **HeadContent**: Bileşenin genel tanıtımı ve framework’lere özel import
  örnekleri. `docs/src/docs-files/tk-[ComponentName]/head.mdx` dosyasından gelir
  ve `generate-mdx` komutu ile otomatik oluşturulur.
- **BodyContent**: Playground, kullanım örnekleri ve açıklamaları içerir.
  `docs/src/docs-files/tk-[ComponentName]/body.mdx` dosyasından gelir ve
  geliştirici tarafından elle yazılır.
- **API**: Bileşenin props ve özelliklerinin detaylı açıklaması.
  `docs/src/docs-files/tk-[ComponentName]/api.mdx` dosyasından gelir ve
  `generate-mdx` komutu ile otomatik oluşturulur.
- **Alt bileşen API’leri**: Örneğin Accordion için `AccordionItem` gibi alt
  bileşenlerin API dokümantasyonu. Bunlar da `generate-mdx` ile otomatik
  oluşturulur.

## `tk-[ComponentName]` klasör yapısı

Her bileşen için `docs/src/docs-files/tk-[ComponentName]/` klasöründe şu
dosyalar bulunur:

- **`Examples/` klasörü**: Bileşenin kullanım örneklerini içeren TSX dosyaları.
- **`[ComponentName]PlaygroundConfig.json`**: Bileşene özgü playground
  yapılandırmasını içeren JSON dosyası.
- **`api.mdx`**: Bileşenin API dokümantasyonunu içerir. `generate-mdx` ile
  otomatik oluşturulur, elle düzenlenmez.
- **`head.mdx`**: Bileşenin tanıtımını ve import örneklerini içerir.
  `generate-mdx` ile otomatik oluşturulur, elle düzenlenmez.
- **`body.mdx`**: Bileşenin playground ve kullanım örneklerini içeren ana içerik
  dosyası. Geliştirici tarafından yazılır ve düzenlenir.
- **Alt bileşen klasörleri**: Alt bileşenler için yalnızca `api.mdx` ve
  `head.mdx` dosyaları bulunur; `body.mdx` yoktur.

## `body.mdx` içeriği

`body.mdx`, komponent dokümanının “kullanım” tarafını tanımlar:

- **Playground**: Bileşenin interaktif olarak deneyimlenebileceği alan.
  Playground config dosyasındaki örnekler burada gösterilir.
- **Kullanım örnekleri**: Bileşenin farklı kullanım senaryolarını gösteren
  örnekler. Bu örnekler `Examples` klasöründeki TSX dosyalarından import edilir
  ve `body.mdx` içinde kullanılır.
- **Açıklamalar**: Bileşenin özellikleri, kullanım ipuçları ve dikkat edilmesi
  gereken noktalar burada yer alır.
- **Uyarılar / bilgilendirici bileşenler**: Belirli özellikler veya kullanım
  durumları hakkında kullanıcıyı bilgilendirmek için `Alert` ve benzeri
  bileşenler kullanılabilir.

Örnekler her bileşen için aynı sırada gösterilir: **Basic → Sizes → Variants →
...**

## Examples TSX dosyası kontratı

`docs/src/docs-files/tk-[ComponentName]/Examples/*.tsx` dosyaları, aşağıdaki
alanları kullanır:

| Alan          | Zorunlu | Açıklama                                                       |
| ------------- | ------- | -------------------------------------------------------------- |
| `featureDemo` | Evet    | Sayfada render edilen ana React bileşeni                       |
| `demo`        | Hayır   | Kısa, odaklı kullanım örneği bileşeni                          |
| `reactCode`   | Evet    | `Demo`daki örneğin React’ta çalışacak halinin string karşılığı |
| `vueCode`     | Evet    | Aynı örneğin Vue implementasyon kodu (string)                  |
| `angularCode` | Evet    | Aynı örneğin Angular implementasyon kodu (string)              |
| `Example`     | Hayır   | Daha uzun / karmaşık senaryolar için ek bileşen                |

Return type olarak kesinlikle featureDemo'ya dönmelidir. FeatureDemo içerisinde:
(demo veya Example), reactCode, vueCode ve angularCode alanlarının tümü
kullanılarak gösterilmelidir.

### Örnek TSX dosyası

Aşağıda `tk-avatar` bileşeni için bir `Sizes.tsx` örneği bulunmaktadır:

```tsx
import { TkAvatar } from '@takeoff-ui/react';
import React from 'react';
import FeatureDemo from '../../../components/FeatureDemo';

const Sizes = () => {
  const reactCode = `<TkAvatar size="xlarge" rounded label="XL" />
<TkAvatar size="large" rounded label="L" />
<TkAvatar size="base" rounded label="M" />
<TkAvatar size="small" rounded label="S" />
<TkAvatar size="xsmall" rounded label="XS" />`;

  const vueCode = `<TkAvatar size="xlarge" rounded label="XL" />
<TkAvatar size="large" rounded label="L" />
<TkAvatar size="base" rounded label="M" />
<TkAvatar size="small" rounded label="S" />
<TkAvatar size="xsmall" rounded label="XS" />`;

  const angularCode = `<tk-avatar size="xlarge" rounded label="XL" />
<tk-avatar size="large" rounded label="L" />
<tk-avatar size="base" rounded label="M" />
<tk-avatar size="small" rounded label="S" />
<tk-avatar size="xsmall" rounded label="XS" />`;

  const demo = (
    <div className="flex justify-center items-end gap-2 flex-wrap">
      <TkAvatar size="xlarge" rounded label="XL" />
      <TkAvatar size="large" rounded label="L" />
      <TkAvatar size="base" rounded label="M" />
      <TkAvatar size="small" rounded label="S" />
      <TkAvatar size="xsmall" rounded label="XS" />
    </div>
  );

  return (
    <FeatureDemo
      demo={demo}
      reactCode={reactCode}
      vueCode={vueCode}
      angularCode={angularCode}
    ></FeatureDemo>
  );
};

export default Sizes;
```

Gerekirse daha kapsamlı senaryolar için ek bir `Example` bileşeni tanımlanabilir
ve `featureDemo` içinde kullanılır.

### Örnek [component]PlaygroundConfig.json dosyası

```js
{
  "name": "TkAvatar",
  "componentName": "TkAvatar",
  "hasChildren": false,
  "props": [
    {
      "key": "size",
      "label": "Size",
      "type": "select",
      "defaultValue": "base",
      "options": [
        { "label": "XSmall", "value": "xsmall" },
        { "label": "Small", "value": "small" },
        { "label": "Base", "value": "base" },
        { "label": "Large", "value": "large" },
        { "label": "XLarge", "value": "xlarge" }
      ]
    },
    {
      "key": "variant",
      "label": "Variant",
      "type": "select",
      "defaultValue": "primary",
      "options": [
        { "label": "Primary", "value": "primary" },
        { "label": "Light", "value": "light" },
        { "label": "Success", "value": "success" },
        { "label": "Info", "value": "info" },
        { "label": "Warning", "value": "warning" },
        { "label": "Danger", "value": "danger" }
      ],
      "tooltip": "This feature works only when the `background` prop set to `solid`."
    },
    {
      "key": "background",
      "label": "Background",
      "type": "select",
      "defaultValue": "brand",
      "options": [
        { "label": "Brand", "value": "brand" },
        { "label": "Solid", "value": "solid" }
      ]
    },
    {
      "key": "label",
      "label": "Label",
      "type": "text",
      "defaultValue": "TK"
    },
    {
      "key": "rounded",
      "label": "Rounded",
      "type": "checkbox",
      "defaultValue": false
    },
  ]
}

```

### Örnek body.mdx dosyası

```tsx
import Basic from './Examples/Basic';
import Sizes from './Examples/Sizes';
import Variants from './Examples/Variants';
import AvatarGroupDemo from './Examples/AvatarGroupDemo';
import { TkAlert, TkAvatar } from '@takeoff-ui/react';
import Playground from '../../components/Playground';
import avatarConfigData from './avatarPlaygroundConfig.json';

### Playground

<Playground
  configs={[avatarConfigData]}
  componentMap={{ TkAvatar: TkAvatar }}
/>

## Basic

A simple `TkAvatar` displaying initials or a default icon.

<Basic />

## Sizes

Demonstrates various avatar sizes available via the `size` property.

<Sizes />

## Variants

Showcases different variant levels (variants) of the avatar using the `variant`
property.

<TkAlert
  header="Note"
  variant="warning"
  message="This feature works in conjunction with the `background` prop set to `solid`."
  filledlight
/>
<br />
<Variants />

## Avatar Group

Shows how to group multiple avatars together using the `TkAvatarGroup`
component.

<AvatarGroupDemo />

```
