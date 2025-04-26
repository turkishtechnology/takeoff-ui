import React from 'react';
import { TkBreadcrumb } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const Type = () => {
  const items = [
    { label: 'Home', href: '/', isExternal: true },
    { label: 'Library', href: '/library', isExternal: true },
    { label: 'Data' },
  ];

  const reactCode = `const items = [
 { label: 'Home', href: '/', isExternal: true  },
 { label: 'Library', href: '/library', isExternal: true  },
 { label: 'Data' },
];
<TkBreadcrumb model={items} type="outlined" />`;

  const vueCode = `<script setup>
import { TkBreadcrumb } from '@takeoff-ui/vue';

const items = [
  { label: 'Home', href: '/', isExternal: true },
  { label: 'Library', href: '/library', isExternal: true },
  { label: 'Data' },
];
</script>
<template>
  <TkBreadcrumb :model.prop="items" type="outlined" />
</template>
`;

  const demo = <TkBreadcrumb model={items} type="outlined" />;

  return (
    <>
      <FeatureDemo
        demo={demo}
        reactCode={reactCode}
        vueCode={vueCode}
        angularCode={''}
      ></FeatureDemo>
    </>
  );
};

export default Type;
