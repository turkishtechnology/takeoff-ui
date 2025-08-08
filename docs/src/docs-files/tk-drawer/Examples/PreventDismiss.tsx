import React, { useState } from 'react';
import { TkDrawer, TkButton, TkCheckbox } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const Example = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [preventDismiss, setPreventDismiss] = useState(false);

  return (
    <>
      <div className="mb-4">
        <TkCheckbox label="Prevent Dismiss by Clicking Outside" value={preventDismiss} onTkChange={e => setPreventDismiss(e.detail)} />
      </div>
      <TkButton label="Open Drawer" onTkClick={() => setShowDrawer(true)} />
      <TkDrawer header="Prevent Dismiss Drawer" open={showDrawer} preventDismiss={preventDismiss} onTkDrawerClose={() => setShowDrawer(false)}>
        <div slot="content">
          <p>{preventDismiss ? 'Clicking outside the drawer will not close it. Please use the close button.' : 'Clicking outside the drawer will close it.'}</p>
        </div>
      </TkDrawer>
    </>
  );
};

const PreventDismiss = () => {
  const reactCode = `const [showDrawer, setShowDrawer] = useState(false);
const [preventDismiss, setPreventDismiss] = useState(false);
return (
  <>
    <div className="mb-4">
      <TkCheckbox
        label="Prevent Dismiss by Clicking Outside"
        value={preventDismiss}
        onTkChange={(e) => setPreventDismiss(e.detail)}
      />
    </div>
    <TkButton label="Open Drawer" onTkClick={() => setShowDrawer(true)} />
    <TkDrawer
      header="Prevent Dismiss Drawer"
      open={showDrawer}
      preventDismiss={preventDismiss}
      onTkDrawerClose={() => setShowDrawer(false)}
    >
      <div slot="content">
        <p>
          {preventDismiss
            ? "Clicking outside the drawer will not close it. Please use the close button."
            : "Clicking outside the drawer will close it."}
        </p>
      </div>
    </TkDrawer>
  </>
);`;

  const vueCode = `<script setup>
import { TkDrawer, TkButton, TkCheckbox } from '@takeoff-ui/vue';
import { ref } from 'vue';

const preventDismiss = ref(false);
const showDrawer = ref(false);
</script>

<template>
  <div>
    <div>
      <TkCheckbox
        label="Prevent Dismiss by Clicking Outside"
        v-model="preventDismiss"
      />
    </div>
    <TkButton label="Open Drawer" @tkClick="() => (showDrawer = true)" />

    <TkDrawer
      header="Prevent Dismiss Drawer"
      :open="showDrawer"
      :preventDismiss="preventDismiss"
      @tkDrawerClose="showDrawer = false"
    >
      <div slot="content">
        <p v-if="preventDismiss">
          Clicking outside the drawer will not close it. Please use the close
          button.
        </p>
        <p v-else>Clicking outside the drawer will close it.</p>
      </div>
    </TkDrawer>
  </div>
</template>

`;

  const demo = <Example />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};
export default PreventDismiss;
