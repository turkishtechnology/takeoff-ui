import { TkRating } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const ShowRatingValue = () => {
  const reactCode = `<TkRating type="star" value={2} showRatingValue />
<TkRating type="heart" value={2.5} showRatingValue />
<TkRating type="dot" value={3.5} showRatingValue />`;

  const vueCode = `<TkRating type="star" :value="2" :showRatingValue.prop="true" />
<TkRating type="heart" :value="2.5" :showRatingValue.prop="true" />
<TkRating type="dot" :value="3.5" :showRatingValue.prop="true" />`;

  const angularCode = `<tk-rating type="star" [value]="2" showRatingValue />
<tk-rating type="heart" [value]="2.5" showRatingValue />
<tk-rating type="dot" [value]="3.5" showRatingValue />`;

  const demo = (
    <div
      style={{
        overflow: 'overlay',
      }}
      className="flex flex-col gap-4"
    >
      <TkRating type="star" value={2} showRatingValue />
      <TkRating type="heart" value={2.5} showRatingValue />
      <TkRating type="dot" value={3.5} showRatingValue />
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

export default ShowRatingValue;
