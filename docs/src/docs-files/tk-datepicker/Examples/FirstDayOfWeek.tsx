import React, { useState } from 'react';
import { TkDatepicker } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const FirstDayOfWeek = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const handleDateChange = event => {
    setSelectedDate(event.detail);
  };

  const reactCode = `const [selectedDate, setSelectedDate] = useState("");
<TkDatepicker
    label="Default for First Day of Week"
    placeholder="Choose a date"
    dateFormat="dd/MM/yyyy"
    value={selectedDate}
    onTkChange={(event) => setSelectedDate(event.detail)}
/>
 <TkDatepicker
    label="Thursday for First Day of Week"
    placeholder="Choose a date"
    dateFormat="dd/MM/yyyy"
    value={selectedDate}
    onTkChange={(event) => setSelectedDate(event.detail)}
    firstDayOfWeekIndex={3}
/>`;

  const vueCode = `<TkDatepicker 
    label="Default for First Day of Week" 
    placeholder="Choose a date" 
    dateFormat="dd/MM/yyyy"
    v-model="selectedDate"
/>
<TkDatepicker 
    label="Thursday for First Day of Week" 
    placeholder="Choose a date" 
    dateFormat="dd/MM/yyyy"
    :firstDayOfWeekIndex.prop="3" 
    v-model="selectedDate" 
/>
`;

  const demo = (
    <div className="flex flex-wrap justify-center items-center gap-2">
      <TkDatepicker label="Default for First Day of Week" placeholder="Choose a date" dateFormat="dd/MM/yyyy" value={selectedDate} onTkChange={handleDateChange} />
      <TkDatepicker
        label="Thursday for First Day of Week"
        placeholder="Choose a date"
        dateFormat="dd/MM/yyyy"
        value={selectedDate}
        onTkChange={handleDateChange}
        firstDayOfWeekIndex={3}
      />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};
export default FirstDayOfWeek;
