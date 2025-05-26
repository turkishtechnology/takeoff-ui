import { useState } from 'react';
import { TkCard, TkToggleButton, TkToggleButtonGroup } from '@takeoff-ui/react';

const options = [
  { value: 'option1', label: 'button' },
  { value: 'option2', label: 'button' },
  { value: 'option3', label: 'button' },
  { value: 'option4', label: 'button' },
  //{ value: 'option5', label: 'button' },
];

function ToggleButton() {
  const [groupValue, setGroupValue] = useState(options[0].value);

  return (
    <div>
      <TkToggleButtonGroup
        type="light"
        value={groupValue}
        onTkChange={(e) => {
          setGroupValue(e.detail);
          console.log('groupValue', e.detail);
        }}
      >
        {options.map((opt) => (
          <TkToggleButton
            rounded
            size="base"
            key={opt.value}
            value={opt.value}
            label={opt.label}
            selected={groupValue === opt.value}
          />
        ))}
      </TkToggleButtonGroup>
    </div>
  );
}

export default ToggleButton;
