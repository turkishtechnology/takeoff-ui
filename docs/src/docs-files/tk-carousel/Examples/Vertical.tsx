import { TkCarousel } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Vertical = () => {
  const reactCode = `<TkCarousel orientation='vertical' verticalViewHeight='300px'>
  <img src="https://picsum.photos/800/400?random=1" alt="Slide 1" />
  <img src="https://picsum.photos/800/400?random=2" alt="Slide 2" />
  <img src="https://picsum.photos/800/400?random=3" alt="Slide 3" />
  <img src="https://picsum.photos/800/400?random=4" alt="Slide 4" />
  <img src="https://picsum.photos/800/400?random=5" alt="Slide 5" />
</TkCarousel>`;

  const vueCode = `<TkCarousel orientation='vertical' verticalViewHeight='300px'>
  <img src="https://picsum.photos/800/400?random=1" alt="Slide 1" />
  <img src="https://picsum.photos/800/400?random=2" alt="Slide 2" />
  <img src="https://picsum.photos/800/400?random=3" alt="Slide 3" />
  <img src="https://picsum.photos/800/400?random=4" alt="Slide 4" />
  <img src="https://picsum.photos/800/400?random=5" alt="Slide 5" />
</TkCarousel>`;

  const angularCode = `<tk-carousel orientation="vertical" vertical-view-height="300px">
  <img src="https://picsum.photos/800/400?random=1" alt="Slide 1" />
  <img src="https://picsum.photos/800/400?random=2" alt="Slide 2" />
  <img src="https://picsum.photos/800/400?random=3" alt="Slide 3" />
  <img src="https://picsum.photos/800/400?random=4" alt="Slide 4" />
  <img src="https://picsum.photos/800/400?random=5" alt="Slide 5" />
</tk-carousel>`;

  const demo = (
    <TkCarousel orientation="vertical" verticalViewHeight="300px">
      <img src="https://picsum.photos/800/400?random=1" alt="Slide 1" />
      <img src="https://picsum.photos/800/400?random=2" alt="Slide 2" />
      <img src="https://picsum.photos/800/400?random=3" alt="Slide 3" />
      <img src="https://picsum.photos/800/400?random=4" alt="Slide 4" />
      <img src="https://picsum.photos/800/400?random=5" alt="Slide 5" />
    </TkCarousel>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Vertical;
