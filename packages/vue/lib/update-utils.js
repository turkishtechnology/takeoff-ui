const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, './vue-component-lib/utils.ts');

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Utils dosyası okunurken hata oluştu:', err);
    return;
  }

  const newContent = data.replace(
    'modelPropValue = (e?.target as any)[modelProp];',
    'modelPropValue = e.detail;',
  );

  fs.writeFile(filePath, newContent, 'utf8', (err) => {
    if (err) {
      console.error('Utils dosyası güncellenirken hata oluştu:', err);
      return;
    }
  });
});
