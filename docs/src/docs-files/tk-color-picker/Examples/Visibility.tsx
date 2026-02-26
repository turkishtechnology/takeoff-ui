import React, { useState, useEffect } from 'react';
import { TkColorPicker, TkCheckbox } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const Visibility = () => {
  const [showAlphaSlider, setShowAlphaSlider] = useState(true);
  const [showPresets, setShowPresets] = useState(true);
  const [showFormatSelector, setShowFormatSelector] = useState(true);

  const [codeSampleReact, setCodeSampleReact] = useState('');
  const [codeSampleVue, setCodeSampleVue] = useState('');
  const [codeSampleAngular, setCodeSampleAngular] = useState('');

  const presetColors = ['#E63946', '#F1FAEE', '#A8DADC', '#457B9D', '#1D3557', '#F4A261', '#2A9D8F', '#E9C46A', '#264653', '#E76F51'];

  useEffect(() => {
    const props: string[] = [];
    const vueProps: string[] = [];
    const angularProps: string[] = [];

    if (!showAlphaSlider) {
      props.push('showAlphaSlider={false}');
      vueProps.push(':showAlphaSlider="false"');
      angularProps.push('[show-alpha-slider]="false"');
    }
    if (!showPresets) {
      props.push('showPresets={false}');
      vueProps.push(':showPresets="false"');
      angularProps.push('[show-presets]="false"');
    }
    if (!showFormatSelector) {
      props.push('showFormatSelector={false}');
      vueProps.push(':showFormatSelector="false"');
      angularProps.push('[show-format-selector]="false"');
    }

    const propsStr = props.length > 0 ? '\n  ' + props.join('\n  ') : '';
    const vuePropsStr = vueProps.length > 0 ? '\n  ' + vueProps.join('\n  ') : '';
    const angularPropsStr = angularProps.length > 0 ? '\n  ' + angularProps.join('\n  ') : '';

    const reactCode = `<TkColorPicker
  inline ${propsStr}
/>`;

    const vueCode = `<TkColorPicker 
  inline ${vuePropsStr} 
/>`;

    const angularCode = `<tk-color-picker
  inline ${angularPropsStr}
></tk-color-picker>`;

    setCodeSampleReact(reactCode);
    setCodeSampleVue(vueCode);
    setCodeSampleAngular(angularCode);
  }, [showAlphaSlider, showPresets, showFormatSelector]);

  const demo = (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        <TkCheckbox label="Alpha Slider" value={showAlphaSlider} onTkChange={e => setShowAlphaSlider(e.detail)} />
        <TkCheckbox label="Presets" value={showPresets} onTkChange={e => setShowPresets(e.detail)} />
        <TkCheckbox label="Format Selector" value={showFormatSelector} onTkChange={e => setShowFormatSelector(e.detail)} />
      </div>
      <div className="flex justify-center items-center">
        <TkColorPicker inline showAlphaSlider={showAlphaSlider} showPresets={showPresets} showFormatSelector={showFormatSelector} presets={presetColors} />
      </div>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={codeSampleReact} vueCode={codeSampleVue} angularCode={codeSampleAngular} />;
};

export default Visibility;
