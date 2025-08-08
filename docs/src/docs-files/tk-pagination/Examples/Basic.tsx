import { TkPagination } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Basic = () => {
  const reactCode = `<TkPagination totalItems={50} rowsPerPage={10} />`;

  const vueCode = `<TkPagination totalItems="50" rowsPerPage="10" />`;

  const angularCode = `<tk-pagination [totalItems]="50" [rowsPerPage]="10" />`;

  const demo = <TkPagination totalItems={50} rowsPerPage={10} />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Basic;
