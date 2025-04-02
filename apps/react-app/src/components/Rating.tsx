import { TkCard, TkRating } from '@takeoff-ui/react';

function Rating() {
  return (
    <TkCard>
      <TkRating readonly={true} value={3} />
      <TkRating disabled={true} value={3} />
      <TkRating value={3} />
    </TkCard>
  );
}

export default Rating;
