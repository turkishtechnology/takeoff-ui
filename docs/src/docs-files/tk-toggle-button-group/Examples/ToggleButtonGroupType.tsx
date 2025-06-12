// @ts-nocheck
import { useState, useEffect } from 'react';
import {
  TkToggleButtonGroup,
  TkToggleButton,
  TkRadioGroup,
  TkRadio,
} from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const ToggleButtonGroupType = () => {
  const groupTypeOptions = ['basic', 'divided', 'light'];
  const [groupType, setGroupType] = useState('basic');
  const [value, setValue] = useState('1');
  const [reactCode, setReactCode] = useState('');
  const [vueCode, setVueCode] = useState('');

  const options = [
    { label: 'One', value: '1' },
    { label: 'Two', value: '2' },
    { label: 'Three', value: '3' },
  ];

  // Only update the code string when `groupType` changes
  useEffect(() => {
    const reactCode = `<TkToggleButtonGroup value="1" type="${groupType}" onTkChange={(e) => setValue(e.detail)}>
  <TkToggleButton type="outlined" variant="neutral" key="1" value="1" label="One" />
  <TkToggleButton type="outlined" variant="neutral" key="2" value="2" label="Two" />
  <TkToggleButton type="outlined" variant="neutral" key="3" value="3" label="Three" />
</TkToggleButtonGroup>`;

    const vueCode = `<TkToggleButtonGroup :value="1" type="${groupType}" @tk-change="(e) => value = e.detail">
  <TkToggleButton type="outlined" variant="neutral" :key="1" :value="1" label="One" />
  <TkToggleButton type="outlined" variant="neutral" :key="2" :value="2" label="Two" />
  <TkToggleButton type="outlined" variant="neutral" :key="3" :value="3" label="Three" />
</TkToggleButtonGroup>`;

    setReactCode(reactCode);
    setVueCode(vueCode);
  }, [groupType]);

  const demo = (
    <div className="flex flex-col gap-4 w-full">
      <TkRadioGroup
        label="Group Type"
        value={groupType}
        onTkChange={(e) => setGroupType(e.detail)}
      >
        {groupTypeOptions.map((t) => (
          <TkRadio
            key={t}
            label={t.charAt(0).toUpperCase() + t.slice(1)}
            value={t}
          />
        ))}
      </TkRadioGroup>

      <TkToggleButtonGroup
        value={value}
        type={groupType}
        onTkChange={(e) => setValue(e.detail)}
      >
        {options.map((opt) => (
          <TkToggleButton
            key={opt.value}
            value={opt.value}
            type="outlined"
            variant="neutral"
            label={opt.label}
          />
        ))}
      </TkToggleButtonGroup>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} />;
};

export default ToggleButtonGroupType;
