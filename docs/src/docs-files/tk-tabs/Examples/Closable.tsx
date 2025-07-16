import { TkTabs, TkTabsItem } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const Closable = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabChange = (event) => {
    setActiveTab(event.detail);
  };
  const reactCode = `const [activeTab, setActiveTab] = useState<number>(0);
const handleTabChange = (event) => {
    setActiveTab(event.detail);
};

  <TkTabs isClosable activeIndex={activeTab}
  onTkTabClick={handleTabChange}>
  <TkTabsItem label="Tab label" icon="flight">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate nequequas!</p>
  </TkTabsItem>
  <TkTabsItem label="Tab label" icon="flight">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate nequequas!</p>
  </TkTabsItem>
  <TkTabsItem label="Tab label" icon="flight">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate nequequas!</p>
  </TkTabsItem>
</TkTabs>`;

  const vueCode = `<template>
  <TkTabs :isClosable.prop="true" :active-index="activeTab"
    @tk-tab-click="handleTabChange">
    <TkTabsItem label="Tab label" icon="flight">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate nequequas!</p>
    </TkTabsItem>
    <TkTabsItem label="Tab label" icon="flight">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate nequequas!</p>
    </TkTabsItem>
    <TkTabsItem label="Tab label" icon="flight">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate nequequas!</p>
    </TkTabsItem>
  </TkTabs>
</template>

<script setup>
import { ref } from 'vue';

const activeTab = ref(0);
const handleTabChange = (event) => {
  activeTab.value = event.detail;
};
</script>`;

  const demo = (
    <TkTabs activeIndex={activeTab} onTkTabClick={handleTabChange} isClosable>
      <TkTabsItem label="Tab label" icon="flight">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
          sed consequuntur error repudiandae numquam deserunt quisquam repellat
          libero asperiores earum nam nobis, culpa ratione quam perferendis
          esse, cupiditate nequequas! 1
        </p>
      </TkTabsItem>
      <TkTabsItem label="Tab label" icon="flight">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
          sed consequuntur error repudiandae numquam deserunt quisquam repellat
          libero asperiores earum nam nobis, culpa ratione quam perferendis
          esse, cupiditate nequequas! 2
        </p>
      </TkTabsItem>
      <TkTabsItem label="Tab label" icon="flight">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
          sed consequuntur error repudiandae numquam deserunt quisquam repellat
          libero asperiores earum nam nobis, culpa ratione quam perferendis
          esse, cupiditate nequequas! 3
        </p>
      </TkTabsItem>
    </TkTabs>
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

export default Closable;
