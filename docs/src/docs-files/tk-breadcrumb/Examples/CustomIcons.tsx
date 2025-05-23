import React from 'react';
import { TkBreadcrumb } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const CustomIcons = () => {
  const items = [
    { label: 'Home', href: '/', icon: 'home', isExternal: true },
    {
      label: 'Library',
      href: '/library',
      icon: 'local_library',
      isExternal: true,
    },
    { label: 'Data', icon: 'data_usage' },
  ];

  const reactCode = `const items = [
 { label: 'Home', href: '/', icon: 'home', isExternal: true  },
 { label: 'Library', href: '/library', icon: 'local_library', isExternal: true  },
 { label: 'Data', icon: 'data_usage' },
];
<TkBreadcrumb model={items} separatorIcon="navigate_next" />`;

  const vueCode = `<script setup>
import { TkBreadcrumb } from '@takeoff-ui/vue';

const items = [
  { label: 'Home', href: '/', icon: 'home', isExternal: true },
  {
    label: 'Library',
    href: '/library',
    icon: 'local_library',
    isExternal: true,
  },
  { label: 'Data', icon: 'data_usage' },
];
</script>
<template>
  <TkBreadcrumb :model.prop="items" separatorIcon="navigate_next" />
</template>
`;

  const angularCode = `<tk-breadcrumb [model]="[
    { label: 'Home', href: '/', icon: 'home', isExternal: true },
    { label: 'Library', href: '/library', icon: 'local_library', isExternal: true },
    { label: 'Data', icon: 'data_usage' }
  ]" separatorIcon="navigate_next" />`;

  const demo = <TkBreadcrumb model={items} separatorIcon="navigate_next" />;

  return (
    <>
      <FeatureDemo
        demo={demo}
        reactCode={reactCode}
        vueCode={vueCode}
        angularCode={angularCode}
      ></FeatureDemo>
    </>
  );
};
export default CustomIcons;
