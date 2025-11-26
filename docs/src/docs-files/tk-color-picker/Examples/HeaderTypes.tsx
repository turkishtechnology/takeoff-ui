import React, { useState, useEffect } from 'react';
import { TkColorPicker, TkButton, TkRadio, TkRadioGroup } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const HeaderTypes = () => {
  const [color, setColor] = useState('#326FD1');
  const [headerType, setHeaderType] = useState<'basic' | 'divided' | 'light' | 'dark' | 'primary'>('basic');
  const [codeSampleReact, setCodeSampleReact] = useState('');
  const [codeSampleVue, setCodeSampleVue] = useState('');
  const [codeSampleAngular, setCodeSampleAngular] = useState('');

  const headerTypes = [
    { label: 'Basic', value: 'basic' },
    { label: 'Divided', value: 'divided' },
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
    { label: 'Primary', value: 'primary' },
  ];

  const handleHeaderTypeChange = (event: CustomEvent) => {
    setHeaderType(event.detail);
  };

  useEffect(() => {
    const reactCode = `const [color, setColor] = useState('#326FD1');

<TkColorPicker
  inline
  headerType="${headerType}"
  value={color}
  panelTitle="${headerType.charAt(0).toUpperCase() + headerType.slice(1)} Header"
  onTkInput={(e) => setColor(e.detail)}
>
  <div slot="footer-actions">
    <TkButton label='Apply' variant="primary" size="small" />
  </div>
</TkColorPicker>`;

    const vueCode = `<script setup>
import { TkColorPicker, TkButton } from '@takeoff-ui/vue';
import { ref } from 'vue';

const color = ref('#326FD1');
</script>

<template>
  <TkColorPicker
    inline
    headerType="${headerType}"
    v-model="color"
    panelTitle="${headerType.charAt(0).toUpperCase() + headerType.slice(1)} Header"
  >
    <div slot="footer-actions">
      <TkButton label='Apply' variant="primary" size="small" />
    </div>
  </TkColorPicker>
</template>`;

    const angularCode = `<tk-color-picker
  inline
  headerType="${headerType}"
  [value]="color"
  panelTitle="${headerType.charAt(0).toUpperCase() + headerType.slice(1)} Header"
  (tkInput)="onColorInput($event)">
  <div slot="footer-actions">
    <tk-button label='Apply' variant="primary" size="small"></tk-button>
  </div>
</tk-color-picker>`;

    setCodeSampleReact(reactCode);
    setCodeSampleVue(vueCode);
    setCodeSampleAngular(angularCode);
  }, [headerType]);

  const demo = (
    <div className="flex flex-col gap-4">
      <TkRadioGroup label="Header Type" value={headerType} onTkChange={handleHeaderTypeChange}>
        {headerTypes.map((radio, index) => (
          <TkRadio label={radio.label} key={index} value={radio.value} />
        ))}
      </TkRadioGroup>
      <div className="flex justify-center">
        <TkColorPicker
          inline
          headerType={headerType}
          value={color}
          panelTitle={`${headerType.charAt(0).toUpperCase() + headerType.slice(1)} Header`}
          onTkInput={e => setColor(e.detail)}
        >
          <div slot="footer-actions">
            <TkButton label="Apply" variant="primary" size="small" />
          </div>
        </TkColorPicker>
      </div>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={codeSampleReact} vueCode={codeSampleVue} angularCode={codeSampleAngular} />;
};

export default HeaderTypes;
