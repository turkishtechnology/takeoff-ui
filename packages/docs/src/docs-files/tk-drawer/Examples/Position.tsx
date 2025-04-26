import { TkDrawer, TkButton } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

type Position = 'left' | 'top' | 'right' | 'bottom';
const Example = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [position, setPosition] = useState<Position>('left');

  function handleClick(position: Position) {
    setPosition(position);
    setShowDrawer(true);
  }

  return (
    <>
      <div className="flex gap-2 flex-wrap justify-center">
        <TkButton
          icon="keyboard_arrow_down"
          onTkClick={() => handleClick('top')}
        />
        <TkButton
          icon="keyboard_arrow_left"
          onTkClick={() => handleClick('right')}
        />
        <TkButton
          icon="keyboard_arrow_up"
          onTkClick={() => handleClick('bottom')}
        />
        <TkButton
          icon="keyboard_arrow_right"
          onTkClick={() => handleClick('left')}
        />
      </div>
      <TkDrawer
        header="Header Text"
        open={showDrawer}
        position={position}
        onTkDrawerClose={() => setShowDrawer(false)}
      >
        <div slot="content">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
            sed consequuntur error repudiandae numquam deserunt quisquam
            repellat libero asperiores earum nam nobis, culpa ratione quam
            perferendis esse, cupiditate neque quas!
          </p>
        </div>
      </TkDrawer>
    </>
  );
};

const Position = () => {
  const reactCode = `<TkButton icon="keyboard_arrow_down" onTkClick={() => handleClick("top")} />
<TkButton icon="keyboard_arrow_left" onTkClick={() => handleClick("right")} />
<TkButton icon="keyboard_arrow_up" onTkClick={() => handleClick("bottom")} />
<TkButton icon="keyboard_arrow_right" onTkClick={() => handleClick("left")} />
<TkDrawer
  header="Header Text"
  open={showDrawer}
  position={position}
  onTkDrawerClose={() => setShowDrawer(false)}
>
  <div slot="content">
    <span>Content Slot</span>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
        quas!
      </p>
  </div>
</TkDrawer>`;

  const vueCode = `<script setup>
import { TkDrawer, TkButton } from '@takeoff-ui/vue';
import { ref } from 'vue';

const showDrawer = ref(false);
const position = ref('');

const handleClick = (positionValue) => {
  position.value = positionValue;
  showDrawer.value = true;
};
</script>

<template>
  <div>
    <TkButton icon="keyboard_arrow_down" @tkClick="handleClick('top')" />
    <TkButton icon="keyboard_arrow_left" @tkClick="handleClick('right')" />
    <TkButton icon="keyboard_arrow_up" @tkClick="handleClick('bottom')" />
    <TkButton icon="keyboard_arrow_right" @tkClick="handleClick('left')" />
    <TkDrawer
      header="Header Text"
      :open="showDrawer"
      :position="position"
      @tkDrawerClose="() => (showDrawer = false)"
    >
      <div slot="content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
          sed consequuntur error repudiandae numquam deserunt quisquam repellat
          libero asperiores earum nam nobis, culpa ratione quam perferendis
          esse, cupiditate neque quas!
        </p>
      </div>
    </TkDrawer>
  </div>
</template>
`;

  const demo = <Example />;

  return (
    <FeatureDemo
      demo={demo}
      reactCode={reactCode}
      vueCode={vueCode}
      angularCode={''}
    ></FeatureDemo>
  );
};

export default Position;
