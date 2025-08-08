import React, { useState } from 'react';
import { TkDatepicker } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const RangeMode = () => {
  const [dateRange, setDateRange] = useState({
    start: '2024-02-10',
    end: '2024-02-20',
  });

  const handleDateChange = event => {
    setDateRange(event.detail);
  };
  const reactCode = `const [dateRange, setDateRange] = useState({
  start: "2024-02-10",
  end: "2024-02-20",
});  

<TkDatepicker
    mode="range"
    label="Select Date Range"
    placeholder="Start date - End date"
    value={dateRange}
    onTkChange={(event) => setDateRange(event.detail)}
    inline
/>`;

  const vueCode = `const dateRange = ref({
  start: "2024-02-10",
  end: "2024-02-20",
});

<TkDatepicker
    mode="range"
    label="Select Date Range"
    placeholder="Start date - End date"
    v-model="dateRange"
    inline
/>`;

  const demo = (
    <div className="flex items-center justify-center overflow-auto">
      <div className="flex flex-col items-start justify-center gap-2">
        <TkDatepicker mode="range" label="Select Date Range" placeholder="Start date - End date" inline value={dateRange} onTkChange={handleDateChange} />
        <p>
          Selected range: {dateRange.start} - {dateRange.end}
        </p>
      </div>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default RangeMode;
