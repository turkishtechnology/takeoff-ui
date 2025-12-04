import React, { useState, useEffect } from 'react';
import { TkCarousel, TkRadioGroup, TkRadio } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const NavigationPlacement = () => {
  const [placement, setPlacement] = useState<'inside' | 'outside'>('inside');
  const [position, setPosition] = useState<'distributed' | 'top' | 'bottom' | 'left' | 'right'>('distributed');
  const [codeSampleReact, setCodeSampleReact] = useState('');
  const [codeSampleVue, setCodeSampleVue] = useState('');
  const [codeSampleAngular, setCodeSampleAngular] = useState('');

  const placements = [
    { label: 'Inside', value: 'inside' },
    { label: 'Outside', value: 'outside' },
  ];

  const positions = [
    { label: 'Distributed', value: 'distributed' },
    { label: 'Top', value: 'top' },
    { label: 'Bottom', value: 'bottom' },
    { label: 'Left', value: 'left' },
    { label: 'Right', value: 'right' },
  ];

  const handlePlacementChange = event => {
    setPlacement(event.detail);
  };

  const handlePositionChange = event => {
    setPosition(event.detail);
  };

  useEffect(() => {
    const attributesList = [`navigationPlacement="${placement}"`, `navigationPosition="${position}"`].filter(Boolean);
    const attributes = attributesList.join('\n  ');

    const reactCode = `<TkCarousel
  ${attributes}
>
  <img src="https://picsum.photos/800/400?random=1" alt="Slide 1" />
  <img src="https://picsum.photos/800/400?random=2" alt="Slide 2" />
  <img src="https://picsum.photos/800/400?random=3" alt="Slide 3" />
  <img src="https://picsum.photos/800/400?random=4" alt="Slide 4" />
  <img src="https://picsum.photos/800/400?random=5" alt="Slide 5" />
</TkCarousel>`;

    const vueCode = `<TkCarousel
  ${attributes}
>
  <img src="https://picsum.photos/800/400?random=1" alt="Slide 1" />
  <img src="https://picsum.photos/800/400?random=2" alt="Slide 2" />
  <img src="https://picsum.photos/800/400?random=3" alt="Slide 3" />
  <img src="https://picsum.photos/800/400?random=4" alt="Slide 4" />
  <img src="https://picsum.photos/800/400?random=5" alt="Slide 5" />
</TkCarousel>`;

    const angularCode = `<tk-carousel
  ${attributes}
>
  <img src="https://picsum.photos/800/400?random=1" alt="Slide 1" />
  <img src="https://picsum.photos/800/400?random=2" alt="Slide 2" />
  <img src="https://picsum.photos/800/400?random=3" alt="Slide 3" />
  <img src="https://picsum.photos/800/400?random=4" alt="Slide 4" />
  <img src="https://picsum.photos/800/400?random=5" alt="Slide 5" />
</tk-carousel>`;

    setCodeSampleReact(reactCode);
    setCodeSampleVue(vueCode);
    setCodeSampleAngular(angularCode);
  }, [placement, position]);

  const demo = (
    <>
      <div className="flex flex-col gap-4 mb-4">
        <div>
          <h4 className="text-sm font-semibold mb-2">Navigation Placement</h4>
          <TkRadioGroup value={placement} onTkChange={handlePlacementChange}>
            {placements.map((radio, index) => {
              return <TkRadio label={radio.label} key={index} value={radio.value} />;
            })}
          </TkRadioGroup>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-2">Navigation Position</h4>
          <TkRadioGroup value={position} onTkChange={handlePositionChange}>
            {positions.map((radio, index) => {
              return <TkRadio label={radio.label} key={index} value={radio.value} />;
            })}
          </TkRadioGroup>
        </div>
      </div>
      <TkCarousel navigationPlacement={placement} navigationPosition={position}>
        <img src="https://picsum.photos/800/400?random=1" alt="Slide 1" />
        <img src="https://picsum.photos/800/400?random=2" alt="Slide 2" />
        <img src="https://picsum.photos/800/400?random=3" alt="Slide 3" />
        <img src="https://picsum.photos/800/400?random=4" alt="Slide 4" />
        <img src="https://picsum.photos/800/400?random=5" alt="Slide 5" />
      </TkCarousel>
    </>
  );

  return <FeatureDemo demo={demo} reactCode={codeSampleReact} vueCode={codeSampleVue} angularCode={codeSampleAngular}></FeatureDemo>;
};

export default NavigationPlacement;
