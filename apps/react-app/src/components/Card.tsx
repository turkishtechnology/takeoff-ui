import { TkCard, TkButton } from '@takeoff-ui/react';

function Card() {
  return (
    <TkCard
      header="Top Image"
      image="path/to/image.jpg"
      imageOptions={{ position: 'top', windowed: true }}
      containerStyle={{ width: '312px' }}
      showAvatar
      showMenuButton
    >
      <p>Card with top image in windowed mode.</p>
      <div slot="footer-actions">
        <TkButton label="Cancel" variant="neutral" type="text"></TkButton>
        <TkButton label="Submit" variant="primary"></TkButton>
      </div>
    </TkCard>
  );
}

export default Card;
