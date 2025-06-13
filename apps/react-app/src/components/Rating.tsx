import { TkCard, TkRating } from '@takeoff-ui/react';

function Rating() {
  return (
    <>
      <TkCard>
        <TkRating readonly={true} value={3} />
        <TkRating disabled={true} value={3} />
        <TkRating value={2} type="number"></TkRating>
      </TkCard>
    </>
  );
}

export default Rating;
