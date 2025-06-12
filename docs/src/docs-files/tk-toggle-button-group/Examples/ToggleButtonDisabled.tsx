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

const ToggleButtonVariant = () => {
  const directionOptions = ['horizontal', 'vertical'];
  const groupTypeOptions = ['basic', 'divided', 'light'];
  const buttonTypeOptions = [
    'filled',
    'outlined',
    'text',
    'raised',
    'filled-light',
  ];
  const buttonVariantOptions = ['primary', 'neutral'];
  const [disabled, setDisabled] = useState(false);

  const [groupType, setGroupType] = useState<'basic' | 'divided' | 'light'>(
    'basic',
  );
  const [buttonType, setButtonType] = useState<
    'filled' | 'outlined' | 'text' | 'raised' | 'filled-light'
  >('filled');
  const [buttonVariant, setButtonVariant] = useState<'primary' | 'neutral'>(
    'neutral',
  );
  const [direction, setDirection] = useState<'horizontal' | 'vertical'>(
    'horizontal',
  );
  const [rounded, setRounded] = useState(false);
  const [value, setValue] = useState('1');
  const reactCode = `<TkToggleButtonGroup value="1" type="basic" onTkChange={(e) => setValue(e.detail)}>
    <TkToggleButton ${disabled ? 'disabled' : ''} type="outlined" variant="neutral" key="1" value="1" icon="{ name: 'bolt', fill: true }" iconPosition="right" size="large" label="One"/>
    <TkToggleButton ${disabled ? 'disabled' : ''} type="outlined" variant="neutral" key="2" value="2" icon="{ name: 'bolt', fill: true }" iconPosition="right" size="large" label="Two"/>
    <TkToggleButton ${disabled ? 'disabled' : ''} type="outlined" variant="neutral" key="3" value="3" icon="{ name: 'bolt', fill: true }" iconPosition="right" size="large" label="Three"/>
   </TkToggleButtonGroup >`;
  const vueCode = `<TkToggleButtonGroup :value="1" type="basic" @tk-change="(e) => toggleButtonDemo.value = e.detail">
    <TkToggleButton ${disabled ? ':disabled="true"' : ''} type="outlined" variant="neutral" :key="1" :value="1" :icon="{ name: 'bolt', fill: true }" icon-position="right" size="large" label="One"/>
    <TkToggleButton ${disabled ? ':disabled="true"' : ''} type="outlined" variant="neutral" :key="2" :value="2" :icon="{ name: 'bolt', fill: true }" icon-position="right" size="large" label="Two"/>
    <TkToggleButton ${disabled ? ':disabled="true"' : ''} type="outlined" variant="neutral" :key="3" :value="3" :icon="{ name: 'bolt', fill: true }" icon-position="right" size="large" label="Three"/>
  </TkToggleButtonGroup>`;
  const options = [
    { label: 'One', value: '1' },
    { label: 'Two', value: '2' },
    { label: 'Three', value: '3' },
  ];

  const demo = (
    <div className="flex flex-col gap-8 items-start w-full">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-wrap gap-4">
          <TkCheckbox
            label="Disabled"
            value={disabled}
            onTkChange={() => setDisabled((prev) => !prev)}
          />
        </div>
        <div className="w-full">
          <TkToggleButtonGroup
            value={value}
            type={groupType}
            direction={direction}
            rounded={rounded}
            onTkChange={(e) => {
              setValue(e.detail);
            }}
          >
            {options.map((opt) => (
              <TkToggleButton
                disabled={disabled}
                key={opt.value}
                value={opt.value}
                type={buttonType}
                variant={buttonVariant}
                icon={{ name: 'bolt', fill: true }}
                iconPosition="right"
                size="large"
                label={opt.label}
              />
            ))}
          </TkToggleButtonGroup>
        </div>
      </div>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} />;
};

export default ToggleButtonVariant;
