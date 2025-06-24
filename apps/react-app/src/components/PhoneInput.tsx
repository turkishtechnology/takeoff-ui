import { TkCard, TkPhoneInput } from '@takeoff-ui/react';
import { useState } from 'react';

function PhoneInput() {
  const [value, setValue] = useState([
    { label: '', id: '', dialCode: '', mask: '' },
  ]);

  return (
    <TkCard>
      {value.map((item, index) => (
        <div key={index}>{item.label}</div>
      ))}
      <TkPhoneInput
        placeholder="Enter phone number"
        initialCountry="TR"
        onTkChange={(e) => {
          console.log('change', e);
          setValue(e.detail);
        }}
      />
    </TkCard>
  );
}

export default PhoneInput;
