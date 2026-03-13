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

## Örnek akış

1. Playground config dosyasına yeni demo için JSON snippet ekle.
2. İstenen özellik için Examples klasörünün içinde dosyayı oluştur (örn:
   `Loading.tsx`).
3. Yeni oluşturulan TSX dosyasını instructions.md’deki kurallara uygun şekilde
   doldur.
4. body.mdxe yeni oluşturulan demoyu instructions.md’deki kurallara uygun
   şekilde ekle.
5. `generate-mdx` komutunu çalıştır (Proje build alındığında otomatik çalışır).
6. Oluşan `head.mdx` ve `api.mdx` dosyalarını **elle düzenleme**.
