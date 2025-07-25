import { TkCard, TkCurrencyInput } from '@takeoff-ui/react';
import { useState } from 'react';

function CurrencyInput() {
  const [value, setValue] = useState({
    value: 0,
    formattedValue: '',
    currency: {},
  });

  return (
    <TkCard>
      <div>{value.value}</div>
      <div>{value.formattedValue}</div>
      <TkCurrencyInput
        label="Currency Input"
        showAsterisk
        onTkChange={e => {
          console.log('change', e.detail);
          setValue(e.detail);
        }}
      />
    </TkCard>
  );
}

export default CurrencyInput;
