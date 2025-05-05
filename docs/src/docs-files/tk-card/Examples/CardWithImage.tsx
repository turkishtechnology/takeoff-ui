import React from 'react';
import { TkButton, TkCard } from '@takeoff-ui/react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import FeatureDemo from '../../../components/FeatureDemo';

const CardWithImage = () => {
  const reactCode = `<TkCard
    header="Top Image"
    image="path/to/image.jpg"
    imageOptions={{ position: 'top', windowed: true }}
    containerStyle={{ width: '312px' }}
    showAvatar
    showMenuButton
>
    <p>Card with top image in windowed mode.</p>
</TkCard>`;

  const vueCode = `<TkCard 
  header="Top Image" 
  image="path/to/image.jpg" 
  :imageOptions="{ position: 'top', windowed: true }"
  :containerStyle="{ width: '312px' }" 
  showAvatar 
  showMenuButton 
>
    <p>Card with top image in windowed mode.</p>
</TkCard>`;

  const demo = (
    <div style={{ overflow: 'overlay' }}>
      <TkCard
        header="Card Title"
        image={useBaseUrl('img/docs/tk-card/vertical_card.png')}
        imageOptions={{ position: 'top', windowed: true }}
        containerStyle={{ width: '312px' }}
        showAvatar
        showMenuButton
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div slot="footer-actions">
          <TkButton label="Cancel" variant="neutral" type="text"></TkButton>
          <TkButton label="Submit" variant="primary"></TkButton>
        </div>
      </TkCard>
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

export default CardWithImage;
