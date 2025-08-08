import { createToast } from '@takeoff-ui/core';
import { TkUpload } from '@takeoff-ui/react';
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

  const handleFilesRejected = e => {
    let errorMessage = e.detail?.map(item => item.reason + ' ' + item.file.name).join('\n');

    createToast({
      header: `${e.detail.length} dosya eklenemedi!`,
      message: errorMessage,
      variant: 'success',
      type: 'outlined',
      timeout: 10000,
      removable: true,
    });
  };

  return (
    <>
      <TkUpload accept="image/png" multiple onTkChange={handleFilesAccepted} onTkFilesRejected={handleFilesRejected}></TkUpload>
    </>
  );
};

const Accept = () => {
  const reactCode = ` const handleFilesAccepted = (e) => {
  createToast({
    header: "Dosya eklendi",
    message: \`\${e.detail.length} dosya eklendi\`,
    variant: "success",
    type: "outlined",
    timeout: 10000,
    removable: true,
  });
};
const handleFilesRejected = (e) => {
  let errorMessage = e.detail
    ?.map((item) => item.reason + " " + item.file.name)
    .join("\n");
  createToast({
    header: \`\${e.detail.length} dosya eklenemedi!\`,
    message: errorMessage,
    variant: "success",
    type: "outlined",
    timeout: 10000,
    removable: true,
  });
};
return (
  <>
    <TkUpload
      accept="image/png"
      multiple
      onTkFilesAccepted={handleFilesAccepted}
      onTkFilesRejected={handleFilesRejected}
    ></TkUpload>
  </>
);`;

  const vueCode = `<script setup>
import { TkUpload } from '@takeoff-ui/vue'
import { createToast } from "@takeoff-ui/core";

const handleFilesAccepted = (e) => {
  createToast({
    header: "Dosya eklendi",
    message: \`\${e.detail.length} dosya eklendi\`,
    variant: "success",
    type: "outlined",
    timeout: 10000,
    removable: true,
  });
};
const handleFilesRejected = (e) => {
  let errorMessage = e.detail
    ?.map((item) => item.reason + " " + item.file.name)
    .join("");

  createToast({
    header: \`\${e.detail.length} dosya eklenemedi!\`,
    message: errorMessage,
    variant: "success",
    type: "outlined",
    timeout: 10000,
    removable: true,
  });
};
</script>

<template>
  <TkUpload accept="image/png" multiple @tkFilesAccepted="handleFilesAccepted" @tkFilesRejected="handleFilesRejected">
  </TkUpload>
</template>`;

  const demo = <Example />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default Accept;
