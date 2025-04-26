import { TkRating } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Type = () => {
  const reactCode = `<TkRating type="star" value={2} />
<TkRating type="heart" value={2.5} />
<TkRating type="dot" value={4} />`;

  const vueCode = `<TkRating type="star" :value="2" />
<TkRating type="heart" :value="2.5" />
<TkRating type="dot" :value="4" />`;

  const demo = (
    <div
      style={{
        overflow: 'overlay',
      }}
      className="flex flex-col gap-4"
    >
      <TkRating type="star" value={2} />
      <TkRating type="heart" value={2.5} />
      <TkRating type="dot" value={3.5} />
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

export default Type;
