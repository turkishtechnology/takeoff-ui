import React, { useRef, useState, useEffect } from 'react';
import { TkColorPicker, TkButton, TkRadio, TkRadioGroup } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const FooterTypes = () => {
  const [color, setColor] = useState('#C79807');
  const [footerType, setFooterType] = useState<'basic' | 'divided' | 'light'>('basic');
  const pickerRef = useRef<HTMLTkColorPickerElement>(null);
  const [codeSampleReact, setCodeSampleReact] = useState('');
  const [codeSampleVue, setCodeSampleVue] = useState('');
  const [codeSampleAngular, setCodeSampleAngular] = useState('');

  const footerTypes = [
    { label: 'Basic', value: 'basic' },
    { label: 'Divided', value: 'divided' },
    { label: 'Light', value: 'light' },
  ];

  const handleFooterTypeChange = (event: CustomEvent) => {
    setFooterType(event.detail);
  };

  const handleApply = () => {
    pickerRef.current?.apply();
  };

  const handleCancel = () => {
    pickerRef.current?.cancel();
  };

  useEffect(() => {
    const reactCode = `const [color, setColor] = useState('#C79807');
const pickerRef = useRef<HTMLTkColorPickerElement>(null);

const handleApply = () => {
  pickerRef.current?.apply();
};

const handleCancel = () => {
  pickerRef.current?.cancel();
};

<TkColorPicker
  ref={pickerRef}
  inline
  footerType="${footerType}"
  value={color}
  panelTitle="${footerType.charAt(0).toUpperCase() + footerType.slice(1)} Footer"
  onTkInput={(e) => setColor(e.detail)}
>
  <div slot="footer-actions">
    <TkButton label='Cancel' variant="secondary" size="small" onTkClick={handleCancel} />
    <TkButton label='Apply' variant="primary" size="small" onTkClick={handleApply} />
  </div>
</TkColorPicker>`;

    const vueCode = `<script setup>
import { TkColorPicker, TkButton } from '@takeoff-ui/vue';
import { ref } from 'vue';

const color = ref('#C79807');
const pickerRef = ref(null);

const handleApply = () => {
  pickerRef.value?.apply();
};

const handleCancel = () => {
  pickerRef.value?.cancel();
};
</script>

<template>
  <TkColorPicker
    ref="pickerRef"
    inline
    footerType="${footerType}"
    v-model="color"
    panelTitle="${footerType.charAt(0).toUpperCase() + footerType.slice(1)} Footer"
  >
    <div slot="footer-actions">
      <TkButton label='Cancel' variant="secondary" size="small" @tk-click="handleCancel" />
      <TkButton label='Apply' variant="primary" size="small" @tk-click="handleApply" />
    </div>
  </TkColorPicker>
</template>`;

    const angularCode = `@ViewChild('colorPicker') colorPicker: ElementRef<HTMLTkColorPickerElement>;

handleApply() {
  this.colorPicker.nativeElement.apply();
}

handleCancel() {
  this.colorPicker.nativeElement.cancel();
}

<tk-color-picker
  #colorPicker
  inline
  footerType="${footerType}"
  [value]="color"
  panelTitle="${footerType.charAt(0).toUpperCase() + footerType.slice(1)} Footer"
  (tkInput)="onColorInput($event)">
  <div slot="footer-actions">
    <tk-button label='Cancel' variant="secondary" size="small" (tkClick)="handleCancel()"></tk-button>
    <tk-button label='Apply' variant="primary" size="small" (tkClick)="handleApply()"></tk-button>
  </div>
</tk-color-picker>`;

    setCodeSampleReact(reactCode);
    setCodeSampleVue(vueCode);
    setCodeSampleAngular(angularCode);
  }, [footerType]);

  const demo = (
    <div className="flex flex-col gap-4">
      <TkRadioGroup label="Footer Type" value={footerType} onTkChange={handleFooterTypeChange}>
        {footerTypes.map((radio, index) => (
          <TkRadio label={radio.label} key={index} value={radio.value} />
        ))}
      </TkRadioGroup>
      <div className="flex justify-center">
        <TkColorPicker
          ref={pickerRef}
          inline
          footerType={footerType}
          value={color}
          panelTitle={`${footerType.charAt(0).toUpperCase() + footerType.slice(1)} Footer`}
          onTkInput={e => setColor(e.detail)}
        >
          <div slot="footer-actions">
            <TkButton label="Cancel" variant="secondary" size="small" onTkClick={handleCancel} />
            <TkButton label="Apply" variant="primary" size="small" onTkClick={handleApply} />
          </div>
        </TkColorPicker>
      </div>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={codeSampleReact} vueCode={codeSampleVue} angularCode={codeSampleAngular} />;
};

export default FooterTypes;
