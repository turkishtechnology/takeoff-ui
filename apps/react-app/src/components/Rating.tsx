import { TkCard, TkRating } from '@takeoff-ui/react';
import { useState } from 'react';

function Rating() {
  const [value, setValue] = useState(3.5);
  return (
    <>
      <TkCard>
        <TkRating type="star" value={value} onTkChange={e => setValue(e.detail)} />
        <TkRating type="heart" value={value} onTkChange={e => setValue(e.detail)} />
        <TkRating type="dot" value={value} onTkChange={e => setValue(e.detail)} />
        <TkRating type="number" value={value} onTkChange={e => setValue(e.detail)} />
      </TkCard>
    </>
  );
}

export default Rating;
