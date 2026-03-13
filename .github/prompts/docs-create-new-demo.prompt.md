# Yeni Bileşen Demo Oluşturma Promptu

Aşağıdaki adımları takip ederek yeni bir bileşen için demo oluşturabilirsin:

1. Hangi bileşen için demo oluşturmak istediğini belirt (örn: tk-button).
2. Demo için kısa bir açıklama yaz (amaç, kullanım senaryosu).
3. Demo dosyasının adı ve konumu:
   - `docs/src/docs-files/tk-[ComponentName]/Examples/[DemoName].tsx`
4. Demo içeriğinde aşağıdakiler olmalı:
   - Bileşenin temel kullanımı
   - Gerekirse props ile özelleştirilmiş örnekler
   - Açıklama satırları ile kodun ne yaptığı belirtilmeli
5. Playground config dosyasına demo eklenmeli:
   - `docs/src/docs-files/tk-[ComponentName]/[ComponentName]PlaygroundConfig.json`
   - Demo başlığı, açıklaması ve dosya yolu config'e eklenmeli
6. Demo ile ilgili açıklama ve kullanım örneği `body.mdx` dosyasına eklenmeli.

Örnek:

- Demo adı: "Primary Button"
- Açıklama: "Temel bir tk-button örneği, primary stil ile."
- Dosya: `docs/src/docs-files/tk-button/Examples/PrimaryButton.tsx`
- Playground config'e ekle:
  ```json
  {
    "title": "Primary Button",
    "description": "Temel bir tk-button örneği, primary stil ile.",
    "file": "Examples/PrimaryButton.tsx"
  }
  ```

Demo oluştururken yukarıdaki adımları ve dosya yapısını takip et. Açıklamalar ve
kod örnekleri anlaşılır olmalı.
