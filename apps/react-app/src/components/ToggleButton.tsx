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
        rounded
        direction="horizontal"
        type="basic"
        value={groupValue}
        onTkChange={(e) => {
          console.log('e', e);
          setGroupValue(e.detail);
        }}
      >
        {options.map((opt) => (
          <TkToggleButton
            icon={{ name: 'bolt', fill: true }}
            iconPosition="right"
            variant="neutral"
            type="outlined"
            size="large"
            key={opt.value}
            value={opt.value}
            label={opt.label}
          />
        ))}
      </TkToggleButtonGroup>
      <div style={{ marginTop: 16, fontWeight: 'bold' }}>
        Selected value: {groupValue}
      </div>
    </div>
  );
}

export default ToggleButton;
