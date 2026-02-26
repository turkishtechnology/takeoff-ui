import { TkCarousel } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const ShowIndicatorAndArrows = () => {
  const reactCode = `<TkCarousel showIndicators={false} showArrows={false} autoplay={true} itemsPerView={3}>
  <img src="https://picsum.photos/800/400?random=1" alt="Slide 1" />
  <img src="https://picsum.photos/800/400?random=2" alt="Slide 2" />
  <img src="https://picsum.photos/800/400?random=3" alt="Slide 3" />
  <img src="https://picsum.photos/800/400?random=4" alt="Slide 4" />
</TkCarousel>`;

  const vueCode = `<TkCarousel :showIndicators="false" :showArrows="false" :autoplay="true" :itemsPerView="3">
  <img src="https://picsum.photos/800/400?random=1" alt="Slide 1" />
  <img src="https://picsum.photos/800/400?random=2" alt="Slide 2" />
  <img src="https://picsum.photos/800/400?random=3" alt="Slide 3" />
  <img src="https://picsum.photos/800/400?random=4" alt="Slide 4" />
</TkCarousel>`;

  const angularCode = `<tk-carousel [show-indicators]="false" [show-arrows]="false" [autoplay]="true" [items-per-view]="3">
  <img src="https://picsum.photos/800/400?random=1" alt="Slide 1" />
  <img src="https://picsum.photos/800/400?random=2" alt="Slide 2" />
  <img src="https://picsum.photos/800/400?random=3" alt="Slide 3" />
  <img src="https://picsum.photos/800/400?random=4" alt="Slide 4" />
</tk-carousel>`;

  const demo = (
    <TkCarousel showIndicators={false} showArrows={false} autoplay={true} itemsPerView={3}>
      <img src="https://picsum.photos/800/400?random=1" alt="Slide 1" />
      <img src="https://picsum.photos/800/400?random=2" alt="Slide 2" />
      <img src="https://picsum.photos/800/400?random=3" alt="Slide 3" />
      <img src="https://picsum.photos/800/400?random=4" alt="Slide 4" />
    </TkCarousel>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default ShowIndicatorAndArrows;
