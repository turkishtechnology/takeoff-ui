import React, { useState } from 'react';
import { TkDialog, TkButton, TkRadioGroup, TkRadio } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const Variants = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [variant, setVariant] = useState<
    'info' | 'success' | 'warning' | 'danger'
  >('info');
  const variantOptions = [
    { label: 'Success', value: 'success' },
    { label: 'Info', value: 'info' },
    { label: 'Warning', value: 'warning' },
    { label: 'Danger', value: 'danger' },
  ];

  const reactCode = `<TkButton label="Open Dialog" onTkClick={() => setShowDialog(true)} />
<TkDialog
     header="Dialog Variants"
     subheader="This is a ${variant} dialog"
     visible={showDialog}
     onTkVisibleChange={(e) => setShowDialog(e.detail)}
     variant={"${variant}"}
     containerStyle={{ width: "450px" }}
>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
        quas!
    </p>
</TkDialog>`;

  const vueCode = `<script setup>
import { TkDialog, TkButton } from '@takeoff-ui/vue';
import { ref } from 'vue';

const showDialog = ref(false);
const setShowDialog = (value) => {
  showDialog.value = true;
};
</script>

<template>
  <>
    <TkButton label="Open Dialog" @tkClick="showDialog = true" />
    <TkDialog header="Dialog Variants" subheader="This is a info dialog" :visible.prop="showDialog" variant="success"
      @tk-visible-change="(e) => {
        showDialog = e.detail;
      }"
      :containerStyle="{ width: '450px' }">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam
        deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate
        neque
        quas!
      </p>
    </TkDialog>
  </>
</template>`;

  const demo = (
    <>
      <div style={{ overflow: 'overlay' }} className="mb-4">
        <TkRadioGroup value={variant} onTkChange={(e) => setVariant(e.detail)}>
          {variantOptions.map((radio, index) => {
            return (
              <TkRadio label={radio.label} key={index} value={radio.value} />
            );
          })}
        </TkRadioGroup>
      </div>
      <TkButton label="Open Dialog" onTkClick={() => setShowDialog(true)} />
      <TkDialog
        header="Dialog Variants"
        subheader={`This is a ${variant} dialog`}
        visible={showDialog}
        onTkVisibleChange={(e) => setShowDialog(e.detail)}
        variant={variant}
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

  return (
    <FeatureDemo
      demo={demo}
      reactCode={reactCode}
      vueCode={vueCode}
      angularCode={''}
    ></FeatureDemo>
  );
};

export default Variants;
