import React from 'react';
import { TkUpload } from '@takeoff-ui/react';
import { createToast } from '@takeoff-ui/core';

const Upload: React.FC = () => {
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

  return <TkUpload onTkChange={handleFilesAccepted} onTkUpload={handleUpload} dragDrop={true} multiple={true}></TkUpload>;
};

export default Upload;
