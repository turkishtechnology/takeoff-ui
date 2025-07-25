import { TkCard, TkDatepicker } from '@takeoff-ui/react';
import { useState } from 'react';

function Datepicker() {
  const [value, setValue] = useState<string>('');
  return (
    <TkCard>
      <TkDatepicker
        label="Test Label"
        value={value}
        onTkChange={e => {
          console.log(e.detail);
          setValue(e.detail as string);
        }}
        disabledDates={['2021-01-01']}
      />
      <TkDatepicker label="Test Label" />
    </TkCard>
  );
}

export default Datepicker;
