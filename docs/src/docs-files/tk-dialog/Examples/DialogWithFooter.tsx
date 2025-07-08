import React, { useState } from 'react';
import { TkDialog, TkButton } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const Example = () => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <TkButton label="Open Dialog" onTkClick={() => setShowDialog(true)} />
      <TkDialog
        header="Dialog with Footer"
        subheader="This dialog uses the footer-actions slot"
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
        <div slot="footer-actions">
          <TkButton
            label="Cancel"
            variant="neutral"
            onTkClick={() => setShowDialog(false)}
            type="text"
          />
          <TkButton label="Save" variant="primary" />
        </div>
      </TkDialog>
    </>
  );
};

const DialogWithFooter = () => {
  const reactCode = `const [showDialog, setShowDialog] = useState(false);
  
return (
  <>
    <TkButton label="Open Dialog" onTkClick={() => setShowDialog(true)} />
    <TkDialog
      header="Dialog with Footer"
      subheader="This dialog uses the footer-actions slot"
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
      <div slot="footer-actions">
        <TkButton
          label="Cancel"
          variant="neutral"
          onTkClick={() => setShowDialog(false)}
          type="text"
        />
        <TkButton label="Save" variant="primary" />
      </div>
    </TkDialog>
  </>
);`;

  const vueCode = `<script setup>
import { TkDialog, TkButton } from '@takeoff-ui/vue';
import { ref } from 'vue';

const showDialog = ref(false);
const setShowDialog = (value) => {
  showDialog.value = value;
};
</script>

<template>
  <>
    <TkButton label="Open Dialog" @tk-click="setShowDialog(true)" />
    <TkDialog
      header="Dialog with Footer"
      subheader="This dialog uses the footer-actions slot"
      :visible.prop="showDialog"
      @tk-visible-change="(e) => {
        showDialog = e.detail;
      }"
      :containerStyle="{ width: '450px' }"
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed
        consequuntur error repudiandae numquam deserunt quisquam repellat libero
        asperiores earum nam nobis, culpa ratione quam perferendis esse,
        cupiditate neque quas!
      </p>
      <div slot="footer-actions">
        <TkButton
          label="Cancel"
          variant="neutral"
          @tkClick="showDialog = false"
          type="text"
        />
        <TkButton label="Save" variant="primary" @tkClick="saveAction" />
      </div>
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
export default DialogWithFooter;
