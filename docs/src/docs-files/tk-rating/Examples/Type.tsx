import { TkRating } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Type = () => {
  const reactCode = `<TkRating type="star" value={2} />
<TkRating type="heart" value={2.5} />
<TkRating type="dot" value={4} />
<TKRating type="number" value={3}`;

  const vueCode = `<TkRating type="star" :value="2" />
<TkRating type="heart" :value="2.5" />
<TkRating type="dot" :value="4" />
<TKRating type="number" :value="3"`;

  const angularCode = `<tk-rating type="star" [value]="2" />
<tk-rating type="heart" [value]="2.5" />
<tk-rating type="dot" [value]="4" />
<tk-rating type="number" [value]="3" />`;

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
      <TkRating type="number" value={3.5} />
    </div>
  );

  return (
    <FeatureDemo
      demo={demo}
      reactCode={reactCode}
      vueCode={vueCode}
      angularCode={angularCode}
    ></FeatureDemo>
  );
};

export default Type;
