import { TkUpload } from '@takeoff-ui/react';
import { createToast } from '@takeoff-ui/core';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Example = () => {
  const handleFilesAccepted = e => {
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

  return <TkUpload onTkChange={handleFilesAccepted} onTkUpload={handleUpload}></TkUpload>;
};
const Basic = () => {
  const reactCode = `const handleFilesAccepted = (e) => {
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
    onTkFilesAccepted={handleFilesAccepted}
    onTkUpload={handleUpload}
  ></TkUpload>
);`;

  const vueCode = `<script setup>
import { TkUpload } from '@takeoff-ui/vue';
import { createToast } from '@takeoff-ui/core';

const handleFilesAccepted = (e) => {
  createToast({
    header: 'Dosya eklendi',
    message: \`\${e.detail.length} dosya eklendi\`,
    variant: 'success',
    type: 'outlined',
    timeout: 10000,
    removable: true,
  });
};
const handleFilesRejected = (e) => {
  let errorMessage = e.detail
    ?.map((item) => item.reason + ' ' + item.file.name)
    .join('');

  createToast({
    header: \`\${e.detail.length} dosya eklenemedi!\`,
    message: errorMessage,
    variant: 'success',
    type: 'outlined',
    timeout: 10000,
    removable: true,
  });
};
</script>

<template>
  <TkUpload
    multiple
    @tkFilesAccepted="handleFilesAccepted"
    @tkFilesRejected="handleFilesRejected"
  >
  </TkUpload>
</template>
`;

  const demo = <Example />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default Basic;
