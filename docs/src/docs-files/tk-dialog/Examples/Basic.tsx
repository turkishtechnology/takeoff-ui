import React, { useState } from 'react';
import { TkDialog, TkButton } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const Example = () => {
  const [showDialog, setShowDialog] = useState(false);

  function handleClick() {
    setShowDialog(true);
  }

  return (
    <>
      <TkButton label="Open Dialog" onTkClick={handleClick} />
      <TkDialog
        header="Welcome"
        subheader="Basic Dialog Example"
        visible={showDialog}
        onTkVisibleChange={(e) => setShowDialog(e.detail)}
        containerStyle={{ width: '450px' }}
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
          sed consequuntur error repudiandae numquam deserunt quisquam repellat
          libero asperiores earum nam nobis, culpa ratione quam perferendis
          esse, cupiditate neque quas!
        </p>
      </TkDialog>
    </>
  );
};

const Basic = () => {
  const reactCode = `const [showDialog, setShowDialog] = useState(false);

  function handleClick() {
  setShowDialog(true);
}

return (
  <>
    <TkButton label="Open Dialog" onTkClick={handleClick} />
    <TkDialog
      header="Welcome"
      subheader="Basic Dialog Example"
      visible={showDialog}
      onTkVisibleChange={(e) => setShowDialog(e.detail)}
      containerStyle={{ width: "450px" }}
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
        sed consequuntur error repudiandae numquam deserunt quisquam repellat
        libero asperiores earum nam nobis, culpa ratione quam perferendis
        esse, cupiditate neque quas!
      </p>
    </TkDialog>
  </>
);`;

  const vueCode = `<script setup>
import { TkDialog, TkButton } from '@takeoff-ui/vue';
import { ref } from 'vue';

const showDialog = ref(false);
const handleClick = () => {
  showDialog.value = true;
};
</script>

<template>
  <>
    <TkButton label="Open Dialog" @tk-click="handleClick" />
    <TkDialog
      header="Welcome"
      subheader="Basic Dialog Example"
      :visible.prop="showDialog"
      @tk-visible-change="(e) => {
        showDialog = e.detail;
      }"
      containerStyle="{ width: '450px' }"
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed
        consequuntur error repudiandae numquam deserunt quisquam repellat libero
        asperiores earum nam nobis, culpa ratione quam perferendis esse,
        cupiditate neque quas!
      </p>
    </TkDialog>
  </>
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

export default Basic;
