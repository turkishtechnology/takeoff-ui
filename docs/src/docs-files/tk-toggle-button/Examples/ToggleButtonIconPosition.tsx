// @ts-nocheck
import { useState, useEffect } from 'react';
import {
  TkToggleButtonGroup,
  TkToggleButton,
  TkRadioGroup,
  TkRadio,
  TkCheckbox,
} from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const ToggleButtonIconPosition = () => {
  const directionOptions = ['horizontal', 'vertical'];
  const iconPositionOptions = ['left', 'right'];
  const [iconPosition, setIconPosition] = useState<'left' | 'right'>('left');

  const [rounded, setRounded] = useState(false);
  const [value, setValue] = useState('1');
  const reactCode = `<TkToggleButtonGroup value="1" type="basic" onTkChange={(e) => setValue(e.detail)}>
    <TkToggleButton type="outlined" variant="neutral" key="1" value="1" label="One"/>
    <TkToggleButton type="outlined" variant="neutral" key="2" value="2" label="Two"/>
    <TkToggleButton type="outlined" variant="neutral" key="3" value="3" label="Three"/>
   </TkToggleButtonGroup >`;

  const options = [
    { label: 'One', value: '1' },
    { label: 'Two', value: '2' },
    { label: 'Three', value: '3' },
  ];

  const demo = (
    <div className="flex flex-col gap-8 items-start w-full">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-wrap gap-4">
          <TkRadioGroup
            label="Position"
            value={iconPosition}
            onTkChange={(e) => setIconPosition(e.detail)}
          >
            {iconPositionOptions.map((v) => (
              <TkRadio
                key={v}
                label={v.charAt(0).toUpperCase() + v.slice(1)}
                value={v}
              />
            ))}
          </TkRadioGroup>
        </div>
        <div className="w-full">
          <TkToggleButtonGroup
            value={value}
            type={groupType}
            direction={direction}
            rounded={rounded}
            onTkChange={(e) => setValue(e.detail)}
          >
            {options.map((opt) => (
              <TkToggleButton
                key={opt.value}
                value={opt.value}
                type={buttonType}
                variant={buttonVariant}
                icon={{ name: 'bolt', fill: true }}
                iconPosition={iconPosition}
                size="large"
                label={opt.label}
              />
            ))}
          </TkToggleButtonGroup>
        </div>
      </div>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} />;
};

export default ToggleButtonIconPosition;
