// @ts-nocheck
import { useState, useEffect } from 'react';
import {
  TkToggleButtonGroup,
  TkToggleButton,
  TkCheckbox,
} from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const ToggleButtonGroupRounded = () => {
  const [rounded, setRounded] = useState(true);
  const [groupType, setGroupType] = useState('basic');
  const [value, setValue] = useState('1');
  const [reactCode, setReactCode] = useState('');
  const [vueCode, setVueCode] = useState('');

  const options = [
    { label: 'One', value: '1' },
    { label: 'Two', value: '2' },
    { label: 'Three', value: '3' },
  ];

  // Update code when rounded state changes
  useEffect(() => {
    const reactCode = `<TkToggleButtonGroup value="1" type="basic" ${rounded ? 'rounded' : ''} onTkChange={(e) => setValue(e.detail)}>
  <TkToggleButton type="outlined" variant="neutral" key="1" value="1" label="One"/>
  <TkToggleButton type="outlined" variant="neutral" key="2" value="2" label="Two"/>
  <TkToggleButton type="outlined" variant="neutral" key="3" value="3" label="Three"/>
</TkToggleButtonGroup>`;

    const vueCode = `<TkToggleButtonGroup value="1" type="basic" ${rounded ? ':rounded="true"' : ''} @tk-change="(e) => value = e.detail">
  <TkToggleButton type="outlined" variant="neutral" key="1" value="1" label="One"/>
  <TkToggleButton type="outlined" variant="neutral" key="2" value="2" label="Two"/>
  <TkToggleButton type="outlined" variant="neutral" key="3" value="3" label="Three"/>
</TkToggleButtonGroup>`;

    setReactCode(reactCode);
    setVueCode(vueCode);
  }, [rounded]);

  const demo = (
    <div className="flex flex-col gap-4 w-full">
      <TkCheckbox
        label="Rounded"
        value={rounded}
        onTkChange={() => setRounded((prev) => !prev)}
      />

      <TkToggleButtonGroup
        value={value}
        type={groupType}
        rounded={rounded}
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

export default ToggleButtonGroupRounded;
