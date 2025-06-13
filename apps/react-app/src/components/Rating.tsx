import { TkCard, TkRating } from '@takeoff-ui/react';

function Rating() {
  return (
    <>
      <TkCard>
        <TkRating readonly={true} value={3} />
        <TkRating disabled={true} value={3} />
      </TkCard>
      <div style={{ width: '500px' }}>
        <TkRating type="number" maxRating={5}></TkRating>
      </div>
    </>
  );
}

export default Rating;
