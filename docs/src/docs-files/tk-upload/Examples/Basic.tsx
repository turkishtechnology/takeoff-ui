import { TkUpload } from '@takeoff-ui/react';
import { createToast } from '@takeoff-ui/core';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Example = () => {
  const handleFilesChanged = e => {
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

  return <TkUpload onTkChange={handleFilesChanged} onTkUpload={handleUpload}></TkUpload>;
};
const Basic = () => {
  const reactCode = `const handleFilesChanged = (e) => {
  createToast({
    header: "Dosya eklendi",
    message: \`\${e.detail.length} dosya eklendi\`,
    variant: "success",
    type: "outlined",
    timeout: 10000,
    removable: true,
  });
};
const handleUpload = (e) => {
  console.log(e.detail);
  createToast({
    header: "Dosya yüklendi",
    message: "Dosya yükleme başarılı.",
    variant: "success",
    type: "filled",
    timeout: 10000,
    removable: true,
  });
};
return (
  <TkUpload
    onTkChange={handleFilesChanged}
    onTkUpload={handleUpload}
  ></TkUpload>
);`;

  const vueCode = `<script setup>
import { TkUpload } from '@takeoff-ui/vue';
import { createToast } from '@takeoff-ui/core';

const handleFilesChanged = (e) => {
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
    message: 'Dosya yükleme başarılı.',
    variant: 'success',
    type: 'filled',
    timeout: 10000,
    removable: true,
  });
};
</script>

<template>
  <TkUpload
    @tkChange="handleFilesChanged"
    @tkUpload="handleUpload"
  >
  </TkUpload>
</template>
`;

  const demo = <Example />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default Basic;
