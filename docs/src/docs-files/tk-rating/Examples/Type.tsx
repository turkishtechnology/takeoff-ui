import { TkRating } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const Type = () => {
  const reactCode = `<TkRating
  type="star"
  value={value}
  onTkChange={(e) => setValue(e.detail)}
/>
<TkRating
  type="heart"
  value={value}
  onTkChange={(e) => setValue(e.detail)}
/>
<TkRating
  type="dot"
  value={value}
  onTkChange={(e) => setValue(e.detail)}
/>
<TkRating
  type="number"
  value={value}
  onTkChange={(e) => setValue(e.detail)}
/>`;

  const vueCode = `<TkRating type="star" v-model="2" />
<TkRating type="heart" v-model="2.5" />
<TkRating type="dot" v-model="4" />
<TKRating type="number" v-model="3"`;

  const angularCode = `<tk-rating type="star" [value]="2" />
<tk-rating type="heart" [value]="2.5" />
<tk-rating type="dot" [value]="4" />
<tk-rating type="number" [value]="3" />`;

  const [value, setValue] = useState(2);
  const demo = (
    <div
      style={{
        overflow: 'overlay',
      }}
      className="flex flex-col gap-4"
    >
      <TkRating
        type="star"
        value={value}
        onTkChange={(e) => setValue(e.detail)}
      />
      <TkRating
        type="heart"
        value={value}
        onTkChange={(e) => setValue(e.detail)}
      />
      <TkRating
        type="dot"
        value={value}
        onTkChange={(e) => setValue(e.detail)}
      />
      <TkRating
        type="number"
        value={value}
        onTkChange={(e) => setValue(e.detail)}
      />
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
