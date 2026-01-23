import { TkSelect } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import { useState } from 'react';

const State = () => {
  const reactCode = `<TkSelect label="Error" options={options} value={value} error="Bu alan zorunludur" invalid/>
<TkSelect label="Readonly" options={options} value={value} readonly />
<TkSelect label="Disabled" options={options} value={value} disabled />`;

  const vueCode = `<TkSelect label="Error"  options={options} value={value} error="Bu alan zorunludur" invalid/>
<TkSelect label="Readonly" options={options} value={value} readonly />
<TkSelect label="Disabled" options={options} value={value} disabled />`;
  const options = [
    { value: 'female', label: 'Female' },
    { value: 'male', label: 'Male' },
    { value: 'other', label: 'Other' },
  ];
  const [value, setValue] = useState(options[0]);
  const [errvalue, setErrvalue] = useState(options[0]);
  const demo = (
    <div className="flex justify-center gap-2 flex-wrap">
      <TkSelect label="Error" options={options} error="Bu alan zorunludur" invalid />
      <TkSelect label="Readonly" options={options} value={value} readonly />
      <TkSelect label="Disabled" options={options} value={value} disabled />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default State;
