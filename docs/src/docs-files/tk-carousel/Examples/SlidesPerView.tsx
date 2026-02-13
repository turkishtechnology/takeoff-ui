import { TkCarousel } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const SlidesPerView = () => {
  const reactCode = `<TkCarousel itemsPerView={2}>
  <img src="https://picsum.photos/800/400?random=1" alt="Slide 1" />
  <img src="https://picsum.photos/800/400?random=2" alt="Slide 2" />
  <img src="https://picsum.photos/800/400?random=3" alt="Slide 3" />
  <img src="https://picsum.photos/800/400?random=4" alt="Slide 4" />
  <img src="https://picsum.photos/800/400?random=5" alt="Slide 5" />
  <img src="https://picsum.photos/800/400?random=6" alt="Slide 6" />
</TkCarousel>`;

  const vueCode = `<TkCarousel :itemsPerView="2">
  <img src="https://picsum.photos/800/400?random=1" alt="Slide 1" />
  <img src="https://picsum.photos/800/400?random=2" alt="Slide 2" />
  <img src="https://picsum.photos/800/400?random=3" alt="Slide 3" />
  <img src="https://picsum.photos/800/400?random=4" alt="Slide 4" />
  <img src="https://picsum.photos/800/400?random=5" alt="Slide 5" />
  <img src="https://picsum.photos/800/400?random=6" alt="Slide 6" />
</TkCarousel>`;

  const angularCode = `<tk-carousel [items-per-view]="2">
  <img src="https://picsum.photos/800/400?random=1" alt="Slide 1" />
  <img src="https://picsum.photos/800/400?random=2" alt="Slide 2" />
  <img src="https://picsum.photos/800/400?random=3" alt="Slide 3" />
  <img src="https://picsum.photos/800/400?random=4" alt="Slide 4" />
  <img src="https://picsum.photos/800/400?random=5" alt="Slide 5" />
  <img src="https://picsum.photos/800/400?random=6" alt="Slide 6" />
</tk-carousel>`;

  const demo = (
    <TkCarousel itemsPerView={2}>
      <img src="https://picsum.photos/800/400?random=1" alt="Slide 1" />
      <img src="https://picsum.photos/800/400?random=2" alt="Slide 2" />
      <img src="https://picsum.photos/800/400?random=3" alt="Slide 3" />
      <img src="https://picsum.photos/800/400?random=4" alt="Slide 4" />
      <img src="https://picsum.photos/800/400?random=5" alt="Slide 5" />
      <img src="https://picsum.photos/800/400?random=6" alt="Slide 6" />
    </TkCarousel>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default SlidesPerView;
