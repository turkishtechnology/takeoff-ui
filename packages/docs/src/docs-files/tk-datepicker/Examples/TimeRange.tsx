import React, { useState } from 'react';
import { TkDatepicker } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const TimeRange = () => {
  const [dateTimeRange, setDateTimeRange] = useState({
    start: '2024-02-10 08:00',
    end: '2024-02-10 17:30',
  });

  const handleDateChange = (event) => {
    setDateTimeRange(event.detail);
  };

  const reactCode = `const [dateTimeRange, setDateTimeRange] = useState({
  start: "2024-02-10 08:00",
  end: "2024-02-10 17:30",
});

<TkDatepicker
    mode="range"
    label="Select Date & Time Range"
    placeholder="YYYY-MM-DD HH:mm - YYYY-MM-DD HH:mm"
    showTimePicker
    value={dateTimeRange}
    onTkChange={(event) => setDateTimeRange(event.detail)}
/>`;

  const vueCode = `const dateTimeRange = ref({
  start: "2024-02-10 08:00",
  end: "2024-02-10 17:30",
});

<TkDatepicker
    mode="range"
    label="Select Date & Time Range"
    placeholder="YYYY-MM-DD HH:mm - YYYY-MM-DD HH:mm"
    showTimePicker
    v-model="dateTimeRange"
/>`;

  const demo = (
    <div className="flex justify-center">
      <div className="w-72">
        <TkDatepicker
          mode="range"
          label="Select Date & Time Range"
          placeholder="YYYY-MM-DD HH:mm - YYYY-MM-DD HH:mm"
          showTimePicker
          value={dateTimeRange}
          onTkChange={handleDateChange}
        />
      </div>
    </div>
  );

  return (
    <FeatureDemo
      demo={demo}
      reactCode={reactCode}
      vueCode={vueCode}
      angularCode={''}
    />
  );
};

export default TimeRange;
