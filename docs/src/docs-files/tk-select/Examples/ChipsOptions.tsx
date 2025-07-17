import { TkSelect } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const ChipOptions = () => {
  const reactCode = `<TkSelect
    label="Test Chip Options"
    options={['Apple', 'Banana', 'Cherry']}
    multiple
    value={value}
    onTkChange={(e) => setValue(e.detail)}
    chipOptions={{
      icon: 'star',
      type: 'outlined',
      size: 'large',
      variant: 'success',
      chipStyle: { color: 'purple' },
      labelStyle: { letterSpacing: '2px', fontStyle: 'italic' },
    }}
/>`;

  const vueCode = `<TkSelect
    label="Test Chip Options"
    :options.prop="['Apple', 'Banana', 'Cherry']"
    multiple
    v-model="value"
    :chipOptions="{
      icon: 'star',
      type: 'outlined',
      size: 'large',
      variant: 'success',
      chipStyle: { color: 'purple' },
      labelStyle: { letterSpacing: '2px', fontStyle: 'italic' },
    }"
/>`;

  const [value, setValue] = useState();

  const demo = (
    <div className="max-w-[215px]">
      <TkSelect
        label="Test Chip Options"
        options={['Apple', 'Banana', 'Cherry']}
        multiple
        value={value}
        onTkChange={(e) => setValue(e.detail)}
        chipOptions={{
          icon: 'star',
          type: 'outlined',
          size: 'large',
          variant: 'success',
          chipStyle: { color: 'purple' },
          labelStyle: { letterSpacing: '2px', fontStyle: 'italic' },
        }}
      />
    </div>
  );

  return (
    <FeatureDemo
      demo={demo}
      reactCode={reactCode}
      vueCode={vueCode}
      angularCode={''}
    ></FeatureDemo>
  );
};

export default ChipOptions;
