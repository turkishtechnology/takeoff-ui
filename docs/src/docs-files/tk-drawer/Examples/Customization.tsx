import React, { useState } from 'react';
import { TkDrawer, TkButton, TkRadioGroup, TkRadio } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const Example = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [width, setWidth] = useState('400px');

  const widthOptions = [
    { label: 'Small (300px)', value: '300px' },
    { label: 'Medium (400px)', value: '400px' },
    { label: 'Large (600px)', value: '600px' },
    { label: 'Extra Large (800px)', value: '800px' },
  ];

  return (
    <>
      <div className="flex flex-col gap-4 mb-4">
        <TkRadioGroup label="Drawer Width" value={width} onTkChange={e => setWidth(e.detail)}>
          {widthOptions.map((option, index) => (
            <TkRadio key={index} label={option.label} value={option.value} />
          ))}
        </TkRadioGroup>

        <TkButton label="Open Drawer" onTkClick={() => setShowDrawer(true)} />
      </div>

      <TkDrawer header="Custom Width Drawer" open={showDrawer} onTkDrawerClose={() => setShowDrawer(false)} containerStyle={{ width }}>
        <div slot="content">
          <p className="mt-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam
            nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
          </p>
        </div>
      </TkDrawer>
    </>
  );
};

const Customization = () => {
  const reactCode = `const [width, setWidth] = useState("400px");
  
<TkButton label="Open Drawer" onTkClick={() => setShowDrawer(true)} />
<TkDrawer
  header="Custom Width Drawer"
  open={showDrawer}
  onTkDrawerClose={() => setShowDrawer(false)}
  containerStyle={{ width }}
>
  <div slot="content">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
        sed consequuntur error repudiandae numquam deserunt quisquam repellat
        libero asperiores earum nam nobis, culpa ratione quam perferendis
        esse, cupiditate neque quas!
    </p>
  </div>
</TkDrawer>`;

  const vueCode = `<script setup>
import { ref } from 'vue';

const showDrawer = ref(false);
const width = ref('400px');
</script>

<template>
  <TkDrawer
    header="Custom Width Drawer"
    :open="showDrawer"
    @tkDrawerClose="showDrawer = false"
    :containerStyle="{ width }"
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
</template>`;

  const demo = <Example />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''} />;
};

export default Customization;
