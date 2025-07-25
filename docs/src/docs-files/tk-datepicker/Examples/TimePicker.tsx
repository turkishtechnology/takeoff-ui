import React, { useState } from 'react';
import { TkDatepicker } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const TimePicker = () => {
  const [selectedDateTime, setSelectedDateTime] = useState('');
  const handleDateChange = event => {
    setSelectedDateTime(event.detail);
  };

  const reactCode = `const [selectedDateTime, setSelectedDateTime] = useState("");
<TkDatepicker
    label="Select Date & Time"
    placeholder="YYYY-MM-DD HH:mm"
    showTimePicker
    value={selectedDateTime}
    onTkChange={(event) => setSelectedDateTime(event.detail)}
/>`;

  const vueCode = `const selectedDateTime = ref("");
<TkDatepicker
    label="Select Date & Time"
    placeholder="YYYY-MM-DD HH:mm"
    showTimePicker
    v-model="selectedDateTime"
/>`;

  const demo = (
    <div className="flex justify-center">
      <div className="w-66">
        <TkDatepicker label="Select Date & Time" placeholder="YYYY-MM-DD HH:mm" showTimePicker value={selectedDateTime} onTkChange={handleDateChange} />
      </div>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''} />;
};

export default TimePicker;
