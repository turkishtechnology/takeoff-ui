import { TkRating } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const State = () => {
  const reactCode = `<TkRating type="star" value={3.5} showRatingValue disabled />
<TkRating type="star" value={3.5} showRatingValue readonly />`;

  const vueCode = `<TkRating type="star" value="3.5" :showRatingValue.prop="true" disabled />
<TkRating type="star" value="3.5" :showRatingValue.prop="true" readonly />`;

  const angularCode = `<tk-rating type="star" [value]="3.5" showRatingValue disabled />
  <tk-rating type="star" [value]="3.5" showRatingValue readonly />`;

  const demo = (
    <div
      style={{
        overflow: 'overlay',
      }}
      className="flex flex-wrap flex-col gap-4"
    >
      <div className="flex flex-col gap-1">
        <label>Disabled</label>
        <TkRating type="star" value={3.5} showRatingValue disabled />
      </div>
      <div className="flex flex-col gap-1">
        <label>Readonly</label>
        <TkRating type="star" value={3.5} showRatingValue readonly />
      </div>
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

export default State;
