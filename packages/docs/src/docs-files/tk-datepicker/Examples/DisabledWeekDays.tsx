import React, { useState } from 'react';
import { TkDatepicker } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const DisabledWeekDays = () => {
  const [selectedDate1, setSelectedDate1] = useState('');
  const [selectedDate2, setSelectedDate2] = useState('');

  const handleDateChange1 = (event) => {
    setSelectedDate1(event.detail);
  };

  const handleDateChange2 = (event) => {
    setSelectedDate2(event.detail);
  };

  // Weekend days (Saturday and Sunday)
  const weekendDays = [0, 6]; // 0 is Sunday, 6 is Saturday

  // Weekdays (Monday to Friday)
  const weekdays = [1, 2, 3, 4, 5]; // 1 is Monday, 5 is Friday

  const reactCode = `const [selectedDate1, setSelectedDate1] = useState('');
const [selectedDate2, setSelectedDate2] = useState('');

// Weekend days (Saturday and Sunday)
const weekendDays = [0, 6]; // 0 is Sunday, 6 is Saturday
  
// Weekdays (Monday to Friday)
const weekdays = [1, 2, 3, 4, 5]; // 1 is Monday, 5 is Friday

<TkDatepicker
  label="Weekends Disabled"
  placeholder="Select a weekday"
  dateFormat="dd/MM/yyyy"
  disabledWeekDays={weekendDays}
  value={selectedDate1}
  onTkChange={(event) => setSelectedDate1(event.detail)}
/>

<TkDatepicker
  label="Only Weekends Allowed"
  placeholder="Select a weekend day"
  dateFormat="dd/MM/yyyy"
  disabledWeekDays={weekdays}
  value={selectedDate2}
  onTkChange={(event) => setSelectedDate2(event.detail)}
/>`;

  const vueCode = `const selectedDate1 = ref('');
const selectedDate2 = ref('');

// Weekend days (Saturday and Sunday)
const weekendDays = [0, 6]; // 0 is Sunday, 6 is Saturday
  
// Weekdays (Monday to Friday)
const weekdays = [1, 2, 3, 4, 5]; // 1 is Monday, 5 is Friday

<TkDatepicker
  label="Weekends Disabled"
  placeholder="Select a weekday"
  dateFormat="dd/MM/yyyy"
  :disabledWeekDays="weekendDays"
  v-model="selectedDate1"
/>

<TkDatepicker
  label="Only Weekends Allowed"
  placeholder="Select a weekend day"
  dateFormat="dd/MM/yyyy"
  :disabledWeekDays="weekdays"
  v-model="selectedDate2"
/>`;

  const demo = (
    <div className="flex flex-wrap justify-center items-center gap-2">
      <TkDatepicker
        label="Weekends Disabled"
        placeholder="Select a weekday"
        dateFormat="dd/MM/yyyy"
        disabledWeekDays={weekendDays}
        value={selectedDate1}
        onTkChange={handleDateChange1}
      />
      <TkDatepicker
        label="Only Weekends Allowed"
        placeholder="Select a weekend day"
        dateFormat="dd/MM/yyyy"
        disabledWeekDays={weekdays}
        value={selectedDate2}
        onTkChange={handleDateChange2}
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

export default DisabledWeekDays;
