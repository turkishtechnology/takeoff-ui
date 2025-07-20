import { TkCard, TkPhoneInput } from '@takeoff-ui/react';
import { useState } from 'react';

function PhoneInput() {
  const [value, setValue] = useState({
    rawValue: '',
    maskedValue: '',
    country: {},
  });

  return (
    <TkCard>
      <div>{value.maskedValue}</div>

      <TkPhoneInput
        //label="Enter phone number"
        //showAsterisk
        defaultCountry="TR"
        onTkChange={(e) => {
          console.log('change', e.detail);
          setValue(e.detail);
        }}
      />
    </TkCard>
  );
}

export default PhoneInput;
