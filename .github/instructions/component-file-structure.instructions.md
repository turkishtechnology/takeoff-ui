---
applyTo: 'packages/core/**/*'
---

# Component Dosya Yapısı

## Genel Dizin Yapısı

```
packages/core/src/
├── utils/                    # Birden fazla component tarafından kullanılan yardımcılar
│   └── icon-utils.ts
├── global/
│   ├── interfaces/           # Paylaşılan type/interface'ler
│   └── sass/abstracts/_variables.scss
└── components/
    └── tk-[component]/
        ├── tk-[component].tsx
        ├── tk-[component].scss
        ├── interfaces.ts     # Sadece bu component'e özel
        ├── defaults.ts      # Uzun varsayılan değerler
        ├── helpers.ts       # Sadece bu component'e özel yardımcılar
        ├── tk-[component]-item/   # Child/group bileşenler
        └── test/
            ├── tk-[component].spec.tsx
            └── tk-[component].e2e.tsx
```

## Kurallar

- **utils/**: Birden fazla component'in kullandığı metodlar (örn: icon-utils.ts)
- **global/interfaces/**: Birden fazla component'in paylaştığı type ve
  interface'ler
- **components/tk-[component]/interfaces.ts**: Sadece o component'e özel export
  edilen type'lar ve interface'ler
- **components/tk-[component]/defaults.ts**: Uzun varsayılan değerler
- **components/tk-[component]/helpers.ts**: Sadece o component'te kullanılan
  yardımcı metodlar
- **Child bileşenler**: `tk-[component]-item/tk-[component]-item.tsx` formatında
  aynı dizinde
- **Test dosyaları**: `test/tk-[component].spec.tsx` ve
  `test/tk-[component].e2e.tsx`
