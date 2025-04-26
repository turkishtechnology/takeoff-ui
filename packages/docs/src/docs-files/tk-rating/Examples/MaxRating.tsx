import { TkRating } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const MaxRating = () => {
  const reactCode = `<TkRating type="star" value={2.5} showRatingValue maxRating={3} />
<TkRating type="star" value={4} showRatingValue maxRating={6} />
<TkRating type="star" value={5.5} showRatingValue maxRating={10} />`;

  const vueCode = `<TkRating
  type="star"
  :value="2"
  :showRatingValue.prop="true"
  :maxRating="3"
/>
<TkRating
  type="star"
  :value="2.5"
  :showRatingValue.prop="true"
  :maxRating="5"
/>
<TkRating
  type="star"
  :value="3.5"
  :showRatingValue.prop="true"
  :maxRating="10"
/>`;

  const demo = (
    <div
      style={{
        overflow: 'overlay',
      }}
      className="flex flex-col gap-4"
    >
      <TkRating type="star" value={2.5} showRatingValue maxRating={3} />
      <TkRating type="star" value={4} showRatingValue maxRating={6} />
      <TkRating type="star" value={5.5} showRatingValue maxRating={10} />
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

export default MaxRating;
