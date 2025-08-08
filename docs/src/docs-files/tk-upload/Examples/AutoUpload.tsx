import { TkUpload } from '@takeoff-ui/react';
import { createToast } from '@takeoff-ui/core';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Example = () => {
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

  return <TkUpload autoUpload multiple onTkUpload={handleUpload}></TkUpload>;
};
const AutoUpload = () => {
  const reactCode = `const handleUpload = (e) => {
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
    autoUpload
    multiple
    onTkUpload={handleUpload}
  ></TkUpload>
);`;

  const vueCode = `<script setup>
import { TkUpload } from '@takeoff-ui/vue';
import { createToast } from '@takeoff-ui/core';

const handleUpload= (e) => {
  createToast({
    header: 'Dosya yüklendi',
    message: "Dosya yükleme başarılı.",
    variant: 'success',
    type: 'outlined',
    timeout: 10000,
    removable: true,
  });
};
</script>

<template>
  <TkUpload
    :autoUpload.prop="true"
    multiple
    @tkUpload="handleUpload"
  >
  </TkUpload>
</template>
`;

  const demo = <Example />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default AutoUpload;
