import React, { useState } from 'react';
import { TkDialog, TkButton, TkRadioGroup, TkRadio } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const HeaderTypes = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [headerType, setHeaderType] = useState<'basic' | 'divided' | 'light' | 'dark' | 'primary'>('basic');
  const headerTypeOptions = [
    { label: 'Basic', value: 'basic' },
    { label: 'Divided', value: 'divided' },
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
    { label: 'Primary', value: 'primary' },
  ];

  const reactCode = `<TkButton label="Open Dialog" onTkClick={() => setShowDialog(true)} />
<TkDialog
     header="Header Types"
     subheader="This dialog uses the ${headerType} header type"
     visible={showDialog}
     onTkVisibleChange={(e) => setShowDialog(e.detail)}
     headerType={"${headerType}"}
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
const headerType = ref('${headerType}');
const setShowDialog = (value) => {
  showDialog.value = value;
};
</script>

<template>
  <>
    <TkButton label="Open Dialog" @tk-click="setShowDialog(true)" />
    <TkDialog
      header="Header Types"
      subheader="This dialog uses the ${headerType} header type"
      v-model="showDialog"
      :headerType.prop="headerType"
      :containerStyle="{ width: '450px' }"
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

  const demo = (
    <>
      <div style={{ overflow: 'overlay' }} className="mb-4">
        <TkRadioGroup value={headerType} onTkChange={e => setHeaderType(e.detail)}>
          {headerTypeOptions.map((radio, index) => {
            return <TkRadio label={radio.label} key={index} value={radio.value} />;
          })}
        </TkRadioGroup>
      </div>
      <TkButton label="Open Dialog" onTkClick={() => setShowDialog(true)} />
      <TkDialog
        header="Header Types"
        subheader={`This dialog uses the ${headerType} header type`}
        visible={showDialog}
        onTkVisibleChange={e => setShowDialog(e.detail)}
        headerType={headerType}
        containerStyle={{ width: '450px' }}
      >
        <p>This example demonstrates the different header types available for the TkDialog component.</p>
      </TkDialog>
    </>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default HeaderTypes;
