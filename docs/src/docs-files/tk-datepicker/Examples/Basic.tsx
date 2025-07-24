import React, { useState } from 'react';
import { TkDatepicker } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const Basic = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const handleDateChange = event => {
    setSelectedDate(event.detail);
  };

  const reactCode = `const [selectedDate, setSelectedDate] = useState("");
<TkDatepicker
    label="Select Date"
    placeholder="Choose a date"
    dateFormat="dd/MM/yyyy"
    value={selectedDate}
    onTkChange={(event) => setSelectedDate(event.detail)}
/>`;

  const vueCode = `const selectedDate = ref("");
<TkDatepicker
    label="Select Date"
    placeholder="Choose a date"
    dateFormat="dd/MM/yyyy"
    v-model="selectedDate"
/>`;

  const demo = (
    <div className="flex justify-center items-center">
      <TkDatepicker label="Select Date" placeholder="Choose a date" dateFormat="dd/MM/yyyy" value={selectedDate} onTkChange={handleDateChange} />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};
export default Basic;
