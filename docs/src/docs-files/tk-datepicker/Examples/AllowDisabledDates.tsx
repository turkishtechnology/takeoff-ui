import React, { useState } from 'react';
import { TkDatepicker } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
const AllowDisabledDates = () => {
  const [selectedDate1, setSelectedDate1] = useState('');
  const [selectedDate2, setSelectedDate2] = useState('');

  const getCurrentMonthDates = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    return [new Date(currentYear, currentMonth, 10), new Date(currentYear, currentMonth, 15), new Date(currentYear, currentMonth, 20)].map(date =>
      date.toLocaleDateString('en-GB'),
    );
  };
  const dates = getCurrentMonthDates();
  const reactCode = `const [selectedDate1, setSelectedDate1] = useState("");
const [selectedDate2, setSelectedDate2] = useState("");
<TkDatepicker
   label="Only specific dates are selectable"
   placeholder="Choose a date"
   dateFormat="dd/MM/yyyy"
   allowedDates={["${dates[0]}", "${dates[1]}", "${dates[2]}"]}
   value={selectedDate1}
   onTkChange={(event) => setSelectedDate1(event.detail)}
/>
<TkDatepicker
   label="Specific dates are disabled"
   placeholder="Choose a date"
   dateFormat="dd/MM/yyyy"
   disabledDates={["${dates[0]}", "${dates[1]}", "${dates[2]}"]}
   value={selectedDate2}
   onTkChange={(event) => setSelectedDate2(event.detail)}
/>`;
  const vueCode = `const selectedDate1 = ref("");
const selectedDate2 = ref("");
<TkDatepicker
   label="Only specific dates are selectable"
   placeholder="Choose a date"
   dateFormat="dd/MM/yyyy"
   :allowedDates="['${dates[0]}', '${dates[1]}', '${dates[2]}']"
   v-model="selectedDate1"
/>
<TkDatepicker
   label="Specific dates are disabled"
   placeholder="Choose a date"
   dateFormat="dd/MM/yyyy"
   :disabledDates="['${dates[0]}', '${dates[1]}', '${dates[2]}']"
   v-model="selectedDate2"
/>`;
  const demo = (
    <div className="flex flex-wrap justify-center items-center gap-2">
      <TkDatepicker
        label="Only specific dates are selectable"
        placeholder="Choose a date"
        dateFormat="dd/MM/yyyy"
        allowedDates={dates}
        value={selectedDate1}
        onTkChange={event => setSelectedDate1(event.detail as string)}
      />
      <TkDatepicker
        label="Specific dates are disabled"
        placeholder="Choose a date"
        dateFormat="dd/MM/yyyy"
        disabledDates={dates}
        value={selectedDate2}
        onTkChange={event => setSelectedDate2(event.detail as string)}
      />
    </div>
  );
  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};
export default AllowDisabledDates;
