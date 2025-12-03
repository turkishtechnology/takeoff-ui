import { TkCarousel } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Circular = () => {
  const reactCode = `<TkCarousel circular={true} itemsPerView={2}>
  <img src="https://picsum.photos/800/400?random=1" alt="Slide 1" />
  <img src="https://picsum.photos/800/400?random=2" alt="Slide 2" />
  <img src="https://picsum.photos/800/400?random=3" alt="Slide 3" />
  <img src="https://picsum.photos/800/400?random=4" alt="Slide 4" />
</TkCarousel>`;

  const vueCode = `<TkCarousel :circular="true" :itemsPerView="2">
  <img src="https://picsum.photos/800/400?random=1" alt="Slide 1" />
  <img src="https://picsum.photos/800/400?random=2" alt="Slide 2" />
  <img src="https://picsum.photos/800/400?random=3" alt="Slide 3" />
  <img src="https://picsum.photos/800/400?random=4" alt="Slide 4" />
</TkCarousel>`;

  const angularCode = `<tk-carousel [circular]="true" [itemsPerView]="2">
  <img src="https://picsum.photos/800/400?random=1" alt="Slide 1" />
  <img src="https://picsum.photos/800/400?random=2" alt="Slide 2" />
  <img src="https://picsum.photos/800/400?random=3" alt="Slide 3" />
  <img src="https://picsum.photos/800/400?random=4" alt="Slide 4" />
</tk-carousel>`;

  const demo = (
      <TkCarousel circular={true} itemsPerView={2}>
          <img src="https://picsum.photos/800/400?random=1" alt="Slide 1" />
          <img src="https://picsum.photos/800/400?random=2" alt="Slide 2" />
          <img src="https://picsum.photos/800/400?random=3" alt="Slide 3" />
          <img src="https://picsum.photos/800/400?random=4" alt="Slide 4" />
      </TkCarousel>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Circular;
