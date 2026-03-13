# Yeni Bileşen Demo Oluşturma Promptu

Bu prompt, Takeoff UI dokümantasyonunda **yeni bir demo** oluşturmak için
`docs-structure.instructions.md` içindeki kurallara uygun şekilde **TSX demo
dosyası + playground config girdisi + `body.mdx` içeriği** üretmeni sağlar.

## Girişte belirtilecek bilgiler

Kullanıcı yeni bir demo istediğinde, aşağıdaki bilgileri netleştir:

1. **Bileşen adı**:  
   - Örn: `tk-button`, `tk-avatar`, `tk-table`  
   - İlgili klasör: `docs/src/docs-files/tk-[ComponentName]/`
2. **Demo adı ve amacı**:  
   - Kısa bir isim (örn: `PrimaryButton`, `WithIcon`, `FilterAndSort`)  
   - Kısa açıklama (kullanım senaryosu, neyi göstermeyi hedefliyor)
3. **Demo dosya yolu**:  
   - `docs/src/docs-files/tk-[ComponentName]/Examples/[DemoName].tsx`
4. **Vurgulanacak özellikler**:  
   - Hangi props’lar veya kullanım varyasyonları gösterilecek?
   - Örneğin: state kullanımı, ikonlu buton, farklı boyutlar, vs.


Bu bilgiler netleştikten sonra aşağıdaki adımlara göre çıktı üret.

## Üreteceğin çıktılar

Her yeni demo için **üç ayrı çıktı** üret:

1. **TSX demo dosyası**  
   - Yol: `docs/src/docs-files/tk-[ComponentName]/Examples/[DemoName].tsx`
   - `docs-structure.instructions.md` içindeki **Examples TSX kontratına**
     uymalı:
     - En az bir `featureDemo` export’u olmalı.
     - `reactCode`, `vueCode`, `angularCode` string’i olmalı.
2. **Playground config girdisi (JSON snippet)**  
   - Dosya: `docs/src/docs-files/tk-[ComponentName]/[ComponentName]PlaygroundConfig.json`
   - Demo başlığı, açıklaması ve `Examples/[DemoName].tsx` yolunu içeren bir
     JSON objesi olarak snippet üret.
3. **`body.mdx` için içerik snippet’i**  
   - `body.mdx` içine eklenecek:
     - Gerekli import satırları
     - Demo başlığı
     - Kısa açıklama
     - Demo bileşeninin kullanımı (örneğin `<PrimaryButtonDemo />` ya da
       ilgili `featureDemo` kullanımı)

Her çıktıyı **ayrı kod bloğu** olarak ver: önce TSX, sonra JSON, sonra MDX.

Gerçek isimleri ve açıklamayı, ürettiğin TSX dosyasındaki export’larla ve
senaryoyla uyumlu tut.

## Örnek akış

Yeni bir bileşen için tipik akış:

1. `docs/src/docs-files/tk-[ComponentName]/` klasörünü oluştur.
2. `Examples/` klasöründe en az bir örnek dosyası (`Basic.tsx`) oluştur ve
   yukarıdaki kontrata uygun hale getir.
3. `[ComponentName]PlaygroundConfig.json` dosyasını oluştur ve playground’da
   gösterilecek örnekleri sırayla tanımla.
4. `generate-mdx` komutunu çalıştır (Proje build alındığında otomatik çalışır).
5. Oluşan `head.mdx` ve `api.mdx` dosyalarını **elle düzenleme**.
6. `body.mdx` dosyasını aç, playground call’ları, örnek import’larını ve
   açıklamaları buraya ekle.
