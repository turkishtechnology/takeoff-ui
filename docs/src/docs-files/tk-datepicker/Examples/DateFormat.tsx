import React, { useState } from 'react';
import { TkDatepicker } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const DateFormat = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = event => {
    setSelectedDate(event.detail);
  };

  const reactCode = `<TkDatepicker
  label="Custom Format"
  placeholder="DD.MM.YYYY"
  dateFormat="dd.MM.yyyy"
  value={selectedDate}
  onTkChange={handleDateChange}
/>`;

  const vueCode = `<TkDatepicker
  label="Custom Format"
  placeholder="DD.MM.YYYY"
  dateFormat="dd.MM.yyyy"
  v-model="selectedDate"
/>`;

  const demo = (
    <div className="flex justify-center items-center">
      <TkDatepicker label="Custom Format" placeholder="DD.MM.YYYY" dateFormat="dd.MM.yyyy" value={selectedDate} onTkChange={handleDateChange} />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};
export default DateFormat;
