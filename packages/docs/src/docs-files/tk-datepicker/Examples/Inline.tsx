import React, { useState } from 'react';
import { TkDatepicker } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const Inline = () => {
  const [selectedDate, setSelectedDate] = useState('2023-05-15');

  const handleDateChange = (event) => {
    setSelectedDate(event.detail);
  };

  const reactCode = `const [selectedDate, setSelectedDate] = useState("2023-05-15");

<TkDatepicker
  value={selectedDate}
  onTkChange={(event) => setSelectedDate(event.detail)}
  inline
/>`;

  const vueCode = `const selectedDate = ref("2023-05-15");

<TkDatepicker v-model="selectedDate" inline />`;

  const demo = (
    <div className="flex justify-center items-center overflow-auto">
      <div className="flex flex-col items-start justify-center gap-2">
        <TkDatepicker
          value={selectedDate}
          onTkChange={handleDateChange}
          inline
        />
        <p>Selected date: {selectedDate}</p>
      </div>
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

export default Inline;
