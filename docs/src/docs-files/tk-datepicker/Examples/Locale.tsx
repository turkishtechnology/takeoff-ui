import React, { useState } from 'react';
import { TkDatepicker } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const Locale = () => {
  const [enDate, setEnDate] = useState('');
  const [trDate, setTrDate] = useState('');

  const handleEnDateChange = event => {
    setEnDate(event.detail);
  };

  const handleTrDateChange = event => {
    setTrDate(event.detail);
  };

  const reactCode = `const [enDate, setEnDate] = useState("");
const [trDate, setTrDate] = useState("");

<TkDatepicker
    label="English (US)"
    placeholder="Select date"
    locale="en-US"
    dateFormat="MMM d, yyyy"
    value={enDate}
    onTkChange={handleEnDateChange}
/>
<TkDatepicker
    label="Turkish"
    placeholder="Tarih seçin"
    locale="tr-TR"
    value={trDate}
    onTkChange={handleTrDateChange}
/>`;

  const vueCode = `const enDate = ref();
const trDate = ref();

<TkDatepicker
    label="English (US)"
    placeholder="Select date"
    locale="en-US"
    dateFormat="MMM d, yyyy"
    v-model="enDate"
/>
<TkDatepicker
    label="Turkish"
    placeholder="Tarih seçin"
    locale="tr-TR"
    v-model="trDate"
/>`;

  const demo = (
    <div className="flex flex-wrap justify-center gap-2">
      <div>
        <TkDatepicker label="English (US)" placeholder="Select date" locale="en-US" value={enDate} onTkChange={handleEnDateChange} />
      </div>
      <div>
        <TkDatepicker label="Turkish" placeholder="Tarih seçin" locale="tr-TR" value={trDate} onTkChange={handleTrDateChange} />
      </div>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default Locale;
