import React, { useState } from 'react';
import { TkDialog, TkButton, TkSelect } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const Blur = () => {
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
        isMaskBlur={true}
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

const DialogBlur = () => {
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
      isMaskBlur={true}
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
  showDialog.value = !showDialog.value;
};
</script>

<template>
  <div style="margin-bottom: 16px; display: flex; gap: 8px">
    <TkButton label="Open Dialog" @tk-click="handleClick" />
    <TkDialog
      header="Welcome"
      subheader="Basic Dialog Example"
      v-model="showDialog"
      :containerStyle="{ width: '450px' }"
      isMaskBlur={true}
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed
        consequuntur error repudiandae numquam deserunt quisquam repellat libero
        asperiores earum nam nobis, culpa ratione quam perferendis esse,
        cupiditate neque quas!
      </p>
    </TkDialog>
  </div>
</template>
`;

  const demo = <Blur />;

  return (
    <FeatureDemo
      demo={demo}
      reactCode={reactCode}
      vueCode={vueCode}
      angularCode={''}
    ></FeatureDemo>
  );
};

export default DialogBlur;
