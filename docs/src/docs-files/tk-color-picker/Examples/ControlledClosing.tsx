import React, { useRef, useState } from 'react';
import { TkColorPicker, TkButton } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const ControlledClosing = () => {
  const [color, setColor] = useState('#326FD1');
  const pickerRef = useRef<HTMLTkColorPickerElement>(null);

  const handleApply = () => {
    pickerRef.current?.apply();
  };

  const handleCancel = () => {
    pickerRef.current?.cancel();
  };

  const demo = (
    <div className="flex justify-center items-center">
      <TkColorPicker
        ref={pickerRef}
        label="Select Color"
        value={color}
        preventDismiss
        showCloseButton={false}
        onTkChange={e => setColor(e.detail)}
      >
        <div slot="footer-actions">
          <TkButton label='Cancel' variant="secondary" size="small" onTkClick={handleCancel}>
          </TkButton>
          <TkButton label='Apply' variant="primary" size="small" onTkClick={handleApply}>
          </TkButton>
        </div>
      </TkColorPicker>
    </div>
  );

  const reactCode = `const [color, setColor] = useState('#326FD1');
const pickerRef = useRef<HTMLTkColorPickerElement>(null);

const handleApply = () => {
  pickerRef.current?.apply();
};

const handleCancel = () => {
  pickerRef.current?.cancel();
};

<TkColorPicker
  ref={pickerRef}
  label="Select Color"
  value={color}
  preventDismiss
  showCloseButton={false}
  onTkChange={(e) => setColor(e.detail)}
>
  <div slot="footer-actions">
    <TkButton label='Cancel' variant="secondary" size="small" onTkClick={handleCancel}>
    </TkButton>
    <TkButton label='Apply' variant="primary" size="small" onTkClick={handleApply}>
    </TkButton>
  </div>
</TkColorPicker>`;

  const vueCode = `<script setup>
import { TkColorPicker, TkButton } from '@takeoff-ui/vue';
import { ref } from 'vue';

const color = ref('#326FD1');
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
    label="Select Color"
    v-model="color"
    preventDismiss
    :showCloseButton="false"
  >
    <div slot="footer-actions">
      <TkButton label='Cancel' variant="secondary" size="small" @tk-click="handleCancel">
      </TkButton>
      <TkButton label='Apply' variant="primary" size="small" @tk-click="handleApply">
      </TkButton>
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
  label="Select Color"
  [value]="color"
  [preventDismiss]="true"
  [showCloseButton]="false"
  (tkChange)="onColorChange($event)">
  <div slot="footer-actions">
    <tk-button label='Cancel' variant="secondary" size="small" (tkClick)="handleCancel()">
    </tk-button>
    <tk-button label='Apply' variant="primary" size="small" (tkClick)="handleApply()">
    </tk-button>
  </div>
</tk-color-picker>`;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode} />;
};

export default ControlledClosing;
