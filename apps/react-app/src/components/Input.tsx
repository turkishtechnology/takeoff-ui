import { TkCard, TkInput } from '@takeoff-ui/react';
import { useState } from 'react';

function Input() {
  const [value, setValue] = useState('');
  return (
    <TkCard>
      {value}
      <TkInput
        // label="Test Label"
        // showAsterisk
        value={value}
        onTkChange={e => {
          console.log('change', e);
          setValue(e.detail);
        }}
        clearable
        // onTkBlur={() => {
        //   console.log('blur');
        // }}
        // maskOptions={{
        //   date: true,
        //   delimiter: '-',
        //   datePattern: ['Y', 'm', 'd'],
        // }}
        onTkClearClick={() => setValue('')}

        // onTkFocus={() => {
        //   console.log('focus');
        // }}
      />
      {/* <input value={value} onChange={(e) => setValue(e.target.value)} /> */}
    </TkCard>
  );
}

export default Input;
