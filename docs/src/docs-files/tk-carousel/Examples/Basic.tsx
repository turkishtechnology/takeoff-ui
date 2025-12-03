import { TkCarousel } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Basic = () => {
  const reactCode = `<TkCarousel>
  <img src="https://picsum.photos/800/400?random=1" alt="Slide 1" />
  <img src="https://picsum.photos/800/400?random=2" alt="Slide 2" />
  <img src="https://picsum.photos/800/400?random=3" alt="Slide 3" />
</TkCarousel>`;

  const vueCode = `<TkCarousel>
  <img src="https://picsum.photos/800/400?random=1" alt="Slide 1" />
  <img src="https://picsum.photos/800/400?random=2" alt="Slide 2" />
  <img src="https://picsum.photos/800/400?random=3" alt="Slide 3" />
</TkCarousel>`;

  const angularCode = `<tk-carousel>
  <img src="https://picsum.photos/800/400?random=1" alt="Slide 1" />
  <img src="https://picsum.photos/800/400?random=2" alt="Slide 2" />
  <img src="https://picsum.photos/800/400?random=3" alt="Slide 3" />
</tk-carousel>`;

  const demo = (
      <TkCarousel>
          <img src="https://picsum.photos/800/400?random=1" alt="Slide 1" />
          <img src="https://picsum.photos/800/400?random=2" alt="Slide 2" />
          <img src="https://picsum.photos/800/400?random=3" alt="Slide 3" />
      </TkCarousel>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Basic;
