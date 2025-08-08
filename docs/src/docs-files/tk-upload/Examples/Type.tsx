import { TkUpload } from '@takeoff-ui/react';
import { createToast } from '@takeoff-ui/core';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Example = () => {
  const handleChange = e => {
    createToast({
      header: 'Dosya eklendi',
      message: `${e.detail.length} dosya eklendi`,
      variant: 'success',
      type: 'outlined',
      timeout: 10000,
      removable: true,
    });
  };

  const handleUpload = e => {
    console.log(e.detail);
    createToast({
      header: 'Dosya yüklendi',
      message: 'Dosya yükleme başarılı.',
      variant: 'success',
      type: 'filled',
      timeout: 10000,
      removable: true,
    });
  };

  return (
    <div>
      <TkUpload onTkChange={handleChange} onTkUpload={handleUpload}></TkUpload>
      <TkUpload type="centered" onTkChange={handleChange} onTkUpload={handleUpload}></TkUpload>
    </div>
  );
};
const Type = () => {
  const reactCode = `const handleChange= (e) => {
    createToast({
      header: 'Dosya eklendi',
      message: \`\${e.detail.length} dosya eklendi\`,
      variant: 'success',
      type: 'outlined',
      timeout: 10000,
      removable: true,
    });
  };
  const handleUpload = (e) => {
    console.log(e.detail);
    createToast({
      header: 'Dosya yüklendi',
      message: \`\${e.detail.length} dosya yüklendi\`,
      variant: 'success',
      type: 'filled',
      timeout: 10000,
      removable: true,
    });
  };
  return (
    <div>
      <TkUpload
        onTkChange={handleChange}
        onTkUpload={handleUpload}
      ></TkUpload>
      <TkUpload
        type="centered"
        onTkChange={handleChange}
        onTkUpload={handleUpload}
      ></TkUpload>
    </div>
  );`;

  const vueCode = `<script setup>
import { TkUpload } from '@takeoff-ui/vue';
import { createToast } from '@takeoff-ui/core';

const handleChange = (e) => {
  createToast({
    header: 'Dosya eklendi',
    message: \`\${e.detail.length} dosya eklendi\`,
    variant: 'success',
    type: 'outlined',
    timeout: 10000,
    removable: true,
  });
};
  const handleUpload = (e) => {
    console.log(e.detail);
    createToast({
      header: 'Dosya yüklendi',
      message: \`\${e.detail.length} dosya yüklendi\`,
      variant: 'success',
      type: 'filled',
      timeout: 10000,
      removable: true,
    });
  };
</script>

<template>
  <TkUpload
    multiple
    @tkChange="handleChange"
    @tkUpload="handleUpload"
  >
  </TkUpload>
  <TkUpload
    multiple
    type="centered"
    @tkChange="handleChange"
    @tkUpload="handleUpload"
  >
  </TkUpload>
</template>
`;

  const demo = <Example />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default Type;
