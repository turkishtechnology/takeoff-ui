import { TkColorPicker } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const Disabled = () => {
  const demo = (
    <div className="flex flex-col sm:flex-row gap-6 justify-center items-start">
      <TkColorPicker label="Disabled" placeholder="Select Color" hint="Hint text" disabled />
      <TkColorPicker label="Readonly" placeholder="Select Color" hint="Hint text" readonly />
      <TkColorPicker label="Error" placeholder="Select Color" error="Error text" invalid />
    </div>
  );

  const reactCode = `<TkColorPicker label="Disabled" placeholder="Select Color" hint="Hint text" disabled />
<TkColorPicker label="Readonly" placeholder="Select Color" hint="Hint text" readonly />
<TkColorPicker label="Error" placeholder="Select Color" error="Error text" invalid />`;

  const vueCode = `<TkColorPicker label="Disabled" placeholder="Select Color" hint="Hint text" disabled />
<TkColorPicker label="Readonly" placeholder="Select Color" hint="Hint text" readonly />
<TkColorPicker label="Error" placeholder="Select Color" error="Error text" invalid />`;

  const angularCode = `<tk-color-picker label="Disabled" placeholder="Select Color" hint="Hint text" disabled></tk-color-picker>
<tk-color-picker label="Readonly" placeholder="Select Color" hint="Hint text" readonly></tk-color-picker>
<tk-color-picker label="Error" placeholder="Select Color" error="Error text" invalid></tk-color-picker>`;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode} />;
};

export default Disabled;
