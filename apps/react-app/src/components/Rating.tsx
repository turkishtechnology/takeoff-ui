import { TkCard, TkRating } from '@takeoff-ui/react';

function Rating() {
  return (
    <>
      <TkCard>
        <TkRating
          type="star"
          value={3.5}
          onTkItemClick={(e) => console.log(e.detail)}
        />
        <TkRating
          type="heart"
          value={3}
          onTkItemClick={(e) => console.log(e.detail)}
        />
        <TkRating
          type="dot"
          value={3}
          onTkItemClick={(e) => console.log(e.detail)}
        />
        <TkRating
          type="number"
          value={3}
          onTkItemClick={(e) => console.log(e.detail)}
        />
      </TkCard>
    </>
  );
}

export default Rating;
