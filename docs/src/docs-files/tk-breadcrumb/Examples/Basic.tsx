import React from 'react';
import { TkBreadcrumb } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const Basic = () => {
  const items = [
    { label: 'Home', href: '/', isExternal: true },
    { label: 'Library', href: '/library', isExternal: true },
    { label: 'Data', href: '/library/data', isExternal: true },
    { label: 'Current Page' },
  ];

  const reactCode = `const items = [
 { label: 'Home', href: '/', isExternal: true  },
 { label: 'Library', href: '/library', isExternal: true  },
 { label: 'Data', href: '/library/data', isExternal: true  },
 { label: 'Current Page' },
];

<TkBreadcrumb model={items} />`;

  const vueCode = `<script setup>
  import { TkBreadcrumb } from '@takeoff-ui/vue';
  
  const items = [
  { label: 'Home', href: '/', isExternal: true  },
  { label: 'Library', href: '/library', isExternal: true  },
  { label: 'Data', href: '/library/data', isExternal: true  },
  { label: 'Current Page' },
  ];
</script>
<template>
  <TkBreadcrumb :model.prop="items" />
</template>`;

  const angularCode = `<tk-breadcrumb [model]="[
    { label: 'Home', href: '/', isExternal: true },
    { label: 'Library', href: '/library', isExternal: true },
    { label: 'Data', href: '/library/data', isExternal: true },
    { label: 'Current Page' }
  ]" />`;

  const demo = <TkBreadcrumb model={items} />;

  return (
    <>
      <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>
    </>
  );
};
export default Basic;
