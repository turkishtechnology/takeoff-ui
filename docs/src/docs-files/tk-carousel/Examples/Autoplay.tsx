import { TkCarousel } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Autoplay = () => {
  const reactCode = `<TkCarousel autoplay={true} autoplayDelay={1000} itemsPerView={3}>
  <img src="https://picsum.photos/800/400?random=1" alt="Slide 1" />
  <img src="https://picsum.photos/800/400?random=2" alt="Slide 2" />
  <img src="https://picsum.photos/800/400?random=3" alt="Slide 3" />
  <img src="https://picsum.photos/800/400?random=4" alt="Slide 4" />
  <img src="https://picsum.photos/800/400?random=5" alt="Slide 5" />
  <img src="https://picsum.photos/800/400?random=6" alt="Slide 6" />
</TkCarousel>`;

  const vueCode = `<TkCarousel :autoplay="true" :autoplayDelay="1000" :itemsPerView="3">
  <img src="https://picsum.photos/800/400?random=1" alt="Slide 1" />
  <img src="https://picsum.photos/800/400?random=2" alt="Slide 2" />
  <img src="https://picsum.photos/800/400?random=3" alt="Slide 3" />
  <img src="https://picsum.photos/800/400?random=4" alt="Slide 4" />
  <img src="https://picsum.photos/800/400?random=5" alt="Slide 5" />
  <img src="https://picsum.photos/800/400?random=6" alt="Slide 6" />
</TkCarousel>`;

  const angularCode = `<tk-carousel [autoplay]="true" [autoplay-delay]="1000" [items-per-view]="3">
  <img src="https://picsum.photos/800/400?random=1" alt="Slide 1" />
  <img src="https://picsum.photos/800/400?random=2" alt="Slide 2" />
  <img src="https://picsum.photos/800/400?random=3" alt="Slide 3" />
  <img src="https://picsum.photos/800/400?random=4" alt="Slide 4" />
  <img src="https://picsum.photos/800/400?random=5" alt="Slide 5" />
  <img src="https://picsum.photos/800/400?random=6" alt="Slide 6" />
</tk-carousel>`;

  const demo = (
    <TkCarousel autoplay={true} autoplayDelay={1000} itemsPerView={3}>
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

export default Autoplay;
