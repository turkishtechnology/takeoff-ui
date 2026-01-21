import { TkCard, TkDialog, TkDropdown, TkTooltip, TkSelect, TkDatepicker, TkColorPicker, TkPhoneInput, TkCurrencyInput, TkTable, TkPopover, TkButton } from '@takeoff-ui/react';
import { useState } from 'react';

function FloatingElements() {
  const [selectedAction, setSelectedAction] = useState('Düzenle');
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedColor, setSelectedColor] = useState('#3b82f6');
  const [phoneValue, setPhoneValue] = useState({});

  const actionOptions = [
    { value: 'edit', label: 'Düzenle' },
    { value: 'delete', label: 'Sil' },
    { value: 'share', label: 'Paylaş' },
  ];

  const countries = ['Türkiye', 'Amerika', 'İngiltere', 'Almanya', 'Fransa', 'İspanya', 'İtalya', 'Japonya'];

  const tableData = [
    { id: 1, product: 'Laptop', price: '15.000 ₺', stock: 45, category: 'Elektronik' },
    { id: 2, product: 'Telefon', price: '8.500 ₺', stock: 120, category: 'Elektronik' },
    { id: 3, product: 'Kulaklık', price: '350 ₺', stock: 200, category: 'Aksesuar' },
  ];

  return (
    <TkCard>
      <div slot="header">
        <h1 className="p-3 text-3xl font-semibold text-slate-500">Floating Elements Test</h1>
      </div>

      <p>
        floatingElementAutoUpdate kullanan tüm componentlerin scroll davranışını test edebilirsiniz. Aşağıdaki container'ı scroll ederek floating elementlerin pozisyonlarının nasıl
        güncellendiğini gözlemleyin.
      </p>

      <div className="mt-4 flex gap-3">
        <TkButton label="📱 Dialog İçinde Test Et" onClick={() => setDialogVisible(true)} />
        <div className="text-sm text-gray-600 flex items-center">
          <span>💡 İpucu: Container'ı scroll ederken floating elementleri açık tutun</span>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4 mt-4"></div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-slate-600 mb-4">📍 Floating Element Componentleri</h2>
        <p className="text-sm text-gray-600 mb-4">Bu componentler floatingElementAutoUpdate kullanarak scroll sırasında pozisyonlarını otomatik günceller</p>
        <div style={{ maxHeight: '600px', maxWidth: '500px', overflow: 'auto', padding: '20px', border: '2px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#f9fafb' }}>
          <div className="space-y-8" style={{ minWidth: '800px' }}>
            <div>
              <h3 className="text-xl font-medium mb-3">1. 🎯 Dropdown - Aksiyon Menüsü</h3>
              <p className="text-sm text-gray-600 mb-2">Bir aksiyon seçin (scroll sırasında pozisyon korunur)</p>
              <TkDropdown
                position="bottom-end"
                options={actionOptions}
                style={{ width: '200px' }}
                onTkItemClick={(e: any) => {
                  setSelectedAction(e.detail.label);
                }}
              >
                <TkButton label={`${selectedAction} ▼`} slot="trigger" size="small" />
              </TkDropdown>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-3">2. 💬 Tooltip - Bilgi Baloncuğu</h3>
              <p className="text-sm text-gray-600 mb-2">Butona hover yapın, scroll ederken tooltip pozisyonunu inceleyin</p>
              <TkTooltip icon="info" header="Önemli Bilgi" description="Bu tooltip scroll sırasında bile doğru pozisyonda kalır!" variant="dark">
                <TkButton label="ℹ️ Bilgi Al" slot="trigger" />
              </TkTooltip>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-3">3. 🌍 Select - Ülke Seçimi</h3>
              <p className="text-sm text-gray-600 mb-2">Listeden bir ülke seçin</p>
              <TkSelect label="Ülke" options={countries} value={selectedCountry} onTkChange={(e: any) => setSelectedCountry(e.detail)} />
            </div>

            <div>
              <h3 className="text-xl font-medium mb-3">4. 📅 Datepicker - Tarih Seçici</h3>
              <p className="text-sm text-gray-600 mb-2">Bir tarih seçin, takvim scroll sırasında konumunu korur</p>
              <TkDatepicker label="Doğum Tarihi" value={selectedDate} onTkChange={(e: any) => setSelectedDate(e.detail)} />
            </div>

            <div>
              <h3 className="text-xl font-medium mb-3">5. 🎨 ColorPicker - Renk Seçici</h3>
              <p className="text-sm text-gray-600 mb-2">
                Tema renginizi seçin: <strong>{selectedColor}</strong>
              </p>
              <TkColorPicker value={selectedColor} onTkChange={(e: any) => setSelectedColor(e.detail)} />
            </div>

            <div>
              <h3 className="text-xl font-medium mb-3">6. 📞 PhoneInput - Telefon Numarası</h3>
              <p className="text-sm text-gray-600 mb-2">Ülke kodu seçici dropdown da floating pozisyonlanır</p>
              <TkPhoneInput label="İletişim Numarası" defaultCountry="TR" value={phoneValue} onTkChange={(e: any) => setPhoneValue(e.detail)} />
            </div>

            <div>
              <h3 className="text-xl font-medium mb-3">7. 💰 CurrencyInput - Para Birimi</h3>
              <p className="text-sm text-gray-600 mb-2">Para birimi seçici açılır menü pozisyonlanır</p>
              <TkCurrencyInput label="Tutar" />
            </div>

            <div>
              <h3 className="text-xl font-medium mb-3">8. 🔍 Table - Filtreleme Paneli</h3>
              <p className="text-sm text-gray-600 mb-2">Sütun başlığındaki filtre ikonuna tıklayın, panel floating olarak açılır</p>
              <TkTable
                data={tableData}
                columns={[
                  { field: 'id', header: 'ID', searchable: true },
                  { field: 'product', header: 'Ürün', searchable: true },
                  { field: 'price', header: 'Fiyat', searchable: true },
                  { field: 'stock', header: 'Stok', searchable: true },
                  { field: 'category', header: 'Kategori', searchable: true },
                ]}
              />
            </div>

            <div>
              <h3 className="text-xl font-medium mb-3">9. 💭 Popover - Detaylı Bilgi</h3>
              <p className="text-sm text-gray-600 mb-2">Butona tıklayın, popover açılır ve scroll sırasında pozisyonu güncellenir</p>
              <TkPopover type="basic">
                <TkButton label="📋 Detayları Gör" slot="trigger" />
                <div slot="content" className="p-4" style={{ minWidth: '250px' }}>
                  <h4 className="font-semibold mb-2">🎯 Özellik Detayları</h4>
                  <ul className="text-sm space-y-1">
                    <li>✅ Otomatik pozisyon güncelleme</li>
                    <li>✅ Scroll ile senkronizasyon</li>
                    <li>✅ Viewport dışına çıkınca gizleme</li>
                    <li>✅ Boundary kontrolü</li>
                  </ul>
                </div>
              </TkPopover>
            </div>
          </div>
        </div>
      </div>
      <TkDialog visible={dialogVisible} header="🪟 Dialog içinde Floating Elements Test" containerStyle={{ width: '700px' }} onTkVisibleChange={e => setDialogVisible(e.detail)}>
        <div style={{ maxHeight: '600px', overflow: 'auto', padding: '20px', backgroundColor: '#fefefe' }}>
          <p className="text-sm text-gray-600 mb-4">Dialog içinde bile floating elementler doğru pozisyonlanır ve scroll ile güncellenir!</p>
          <div className="space-y-8" style={{ minWidth: '900px' }}>
            <div>
              <h3 className="text-xl font-medium mb-3">1. 🎯 Dropdown</h3>
              <TkDropdown position="bottom-end" options={actionOptions} style={{ width: '200px' }}>
                <TkButton label="Aksiyon Seç ▼" slot="trigger" size="small" />
              </TkDropdown>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-3">2. 💬 Tooltip</h3>
              <TkTooltip icon="info" header="Dialog İçi Tooltip" description="Dialog container'ı içinde de çalışır!" variant="dark">
                <TkButton label="ℹ️ Bilgi" slot="trigger" />
              </TkTooltip>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-3">3. 🌍 Select</h3>
              <TkSelect label="Ülke Seç" options={countries} />
            </div>

            <div>
              <h3 className="text-xl font-medium mb-3">4. 📅 Datepicker</h3>
              <TkDatepicker label="Tarih" />
            </div>

            <div>
              <h3 className="text-xl font-medium mb-3">5. 🎨 ColorPicker</h3>
              <TkColorPicker value="#ef4444" />
            </div>

            <div>
              <h3 className="text-xl font-medium mb-3">6. 📞 PhoneInput</h3>
              <TkPhoneInput label="Telefon" defaultCountry="US" />
            </div>

            <div>
              <h3 className="text-xl font-medium mb-3">7. 💰 CurrencyInput</h3>
              <TkCurrencyInput label="Miktar" />
            </div>

            <div>
              <h3 className="text-xl font-medium mb-3">8. 🔍 Table</h3>
              <TkTable
                data={tableData}
                columns={[
                  { field: 'id', header: 'ID', searchable: true },
                  { field: 'product', header: 'Ürün', searchable: true },
                  { field: 'price', header: 'Fiyat', searchable: true },
                ]}
              />
            </div>

            <div>
              <h3 className="text-xl font-medium mb-3">9. 💭 Popover</h3>
              <TkPopover type="dark">
                <TkButton label="📋 Detay" slot="trigger" />
                <div slot="content" className="p-4 text-white" style={{ minWidth: '200px' }}>
                  <h4 className="font-semibold mb-2">Dialog İçi Popover</h4>
                  <p className="text-sm">Dialog scroll ederken bile pozisyon korunur! 🎯</p>
                </div>
              </TkPopover>
            </div>
          </div>
        </div>
      </TkDialog>
    </TkCard>
  );
}
export default FloatingElements;
