import { TkColorPicker } from '@takeoff-ui/react';
import { useState } from 'react';

const ColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState('#3b82f6');

  return (
    <>
      <TkColorPicker value={selectedColor} onTkChange={e => setSelectedColor(e.detail)} />
      <div className="text-sm">
        <span className="font-medium">Selected Color:</span> <code className="bg-gray-100 px-2 py-1 rounded">{selectedColor}</code>
      </div>
    </>
  );
};

export default ColorPicker;
