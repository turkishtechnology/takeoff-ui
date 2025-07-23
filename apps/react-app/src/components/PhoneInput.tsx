import { TkCard, TkPhoneInput, TkButton } from '@takeoff-ui/react';
import { useState } from 'react';

function PhoneInput() {
  const [value, setValue] = useState({});

  return (
    <TkCard>
      <div>{JSON.stringify(value)}</div>

      <TkPhoneInput
        //label="Enter phone number"
        //showAsterisk
        value={value}
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
