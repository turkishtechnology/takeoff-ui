import React, { useState } from 'react';
import { TkDatepicker, TkRadioGroup, TkRadio } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const TimePicker = () => {
  const [selectedDateTime, setSelectedDateTime] = useState('');
  const handleDateChange = event => {
    setSelectedDateTime(event.detail);
  };

  const [timeFormat, setTimeFormat] = useState<'12' | '24'>('12');
  const handleTimeFormatChange = event => {
    setTimeFormat(event.detail as '12' | '24');
  };

  const reactCode = `const [selectedDateTime, setSelectedDateTime] = useState("");
const [timeFormat, setTimeFormat] = useState<'12' | '24'>('12');
<TkDatepicker
    label="Select Date & Time"
    placeholder="YYYY-MM-DD HH:mm"
    showTimePicker
    value={selectedDateTime}
    onTkChange={(event) => setSelectedDateTime(event.detail)}
    timeFormat={timeFormat}
/>`;

  const vueCode = `const selectedDateTime = ref("");
const timeFormat = ref<'12' | '24'>('12');
<TkDatepicker
    label="Select Date & Time"
    placeholder="YYYY-MM-DD HH:mm"
    show-time-picker
    v-model="selectedDateTime"
    :time-format="timeFormat"
/>`;

  const demo = (
    <div className="flex flex-col gap-4">
      <div className="w-48">
        <TkRadioGroup value={timeFormat} onTkChange={handleTimeFormatChange} label="Time Format">
          <TkRadio label="12" value="12" />
          <TkRadio label="24" value="24" />
        </TkRadioGroup>
      </div>
      <div className="w-48">
        <TkDatepicker label="Select Date & Time" placeholder="YYYY-MM-DD HH:mm" showTimePicker value={selectedDateTime} onTkChange={handleDateChange} timeFormat={timeFormat} />
      </div>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''} />;
};

export default TimePicker;
