import React, { useState } from 'react';
import { TkDatepicker, TkRadio, TkRadioGroup } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const TimeOnly = () => {
  const [selectedTime, setSelectedTime] = useState('');
  const handleDateChange = event => {
    setSelectedTime(event.detail);
  };
  const [timeFormat, setTimeFormat] = useState<'12' | '24'>('12');
  const handleTimeFormatChange = event => {
    setTimeFormat(event.detail as '12' | '24');
  };
  const [type, setType] = useState<'basic' | 'divided' | 'light' | 'dark' | 'primary'>('basic');
  const handleTypeChange = event => {
    setType(event.detail as 'basic' | 'divided' | 'light' | 'dark' | 'primary');
  };
  const reactCode = `const [selectedTime, setSelectedTime] = useState("");
<TkDatepicker
    label="Select Time"
    headerType="${type}"
    timeOnly
    value={selectedTime}
    onTkChange={(event) => setSelectedTime(event.detail)}
    timeFormat="${timeFormat}"
/>`;

  const vueCode = `const selectedTime = ref("");
<TkDatepicker
    label="Select Time"
    timeOnly
    headerType="${type}"
    v-model="selectedTime"
    timeFormat="${timeFormat}"
/>`;

  const demo = (
    <div className="flex flex-col gap-4 justify-center">
      <div className="w-66">
        <TkRadioGroup value={timeFormat} onTkChange={handleTimeFormatChange} label="Time Format">
          <TkRadio label="12" value="12" />
          <TkRadio label="24" value="24" />
        </TkRadioGroup>
      </div>
      <div className="w-66">
        <TkRadioGroup value={type} onTkChange={handleTypeChange} label="Header Type">
          <TkRadio label="Basic" value="basic" />
          <TkRadio label="Divided" value="divided" />
          <TkRadio label="Light" value="light" />
          <TkRadio label="Dark" value="dark" />
          <TkRadio label="Primary" value="primary" />
        </TkRadioGroup>
      </div>
      <div className="w-66">
        <TkDatepicker label="Select Time" timeOnly value={selectedTime} onTkChange={handleDateChange} timeFormat={timeFormat} headerType={type} />
      </div>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''} />;
};

export default TimeOnly;
