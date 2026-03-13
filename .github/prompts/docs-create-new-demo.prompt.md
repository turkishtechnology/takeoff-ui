# Yeni Bileşen Demo Oluşturma Promptu

Bu prompt, Takeoff UI dokümantasyonunda **yeni bir demo** oluşturmak için
`docs-structure.instructions.md` içindeki kurallara uygun şekilde **TSX demo
dosyası + playground config girdisi + `body.mdx` düzenlenmesi** üretmeni sağlar.

Bu prompt çalıştırılırken kullanıcıdan şu parametreler alınır:

- `componentName`: Örn. `tk-avatar`, `avatar`
- `feature`: Örn. `sizes`, `with-icon`, `loading`

## Girişte belirtilecek bilgiler

Kullanıcı yeni bir demo istediğinde, aşağıdaki bilgileri netleştir:

1. **Bileşen adı**:
   - Örn: `tk-button`, `tk-avatar`, `tk-table`
   - İlgili klasör: `docs/src/docs-files/tk-[ComponentName]/`
2. **Demo adı ve amacı**:
   - Kısa bir isim (örn: `PrimaryButton`, `WithIcon`, `FilterAndSort`)
   - Kısa açıklama (kullanım senaryosu, neyi göstermeyi hedefliyor)
   - Alabileceği değerler
3. **Demo dosya yolu**:
   - `docs/src/docs-files/tk-[ComponentName]/Examples/[DemoName].tsx`
4. **Vurgulanacak özellikler**:
   - Hangi props’lar veya kullanım varyasyonları gösterilecek?
   - Örneğin: state kullanımı, ikonlu buton, farklı boyutlar, vs.

Bu bilgiler netleştikten sonra aşağıdaki adımlara göre çıktı üret.

## Kullanıcıdan alınacak parametreler

- Bileşen adı: `{{componentName}}`
- Vurgulanacak özellik / senaryo: `{{feature}}`

## Yapılacak işler

`docs-structure.instructions.md` kurallarına uygun olarak, verilen örneklerle
paralel şekilde aşağıdaki çıktıları üret:

1. `docs/src/docs-files/tk-{{componentName}}/Examples/` altında, `{{feature}}`
   özelliğini gösteren yeni bir TSX demo dosyası tasarla, dosya yapısını doğru
   kurguladığından emin ol.
2. `docs/src/docs-files/tk-{{componentName}}/body.mdx` içinde bu yeni demoyu,
   `{{feature}}` özelliğini açıklayan kısa bir metin ile birlikte ekle.
3. `generate-mdx` komutunun build sırasında otomatik çalıştığını ve `head.mdx`
   ile `api.mdx` dosyalarının **elle düzenlenmemesi** gerektiğini hatırlat.
