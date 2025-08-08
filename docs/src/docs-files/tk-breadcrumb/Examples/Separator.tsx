import React from 'react';
import { TkBreadcrumb, TkRadioGroup, TkRadio } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const Separator = () => {
  const [separator, setSeparator] = React.useState<'icon' | 'dot' | 'slash' | 'vertical'>('icon');
  const items = [
    { label: 'Home', href: '/', isExternal: true },
    { label: 'Library', href: '/library', isExternal: true },
    { label: 'Data', href: '/takeoffui/docs/components/Breadcrumb' },
  ];
  const separatorOptions = [
    { label: 'Icon', value: 'icon' },
    { label: 'Dot', value: 'dot' },
    { label: 'Slash', value: 'slash' },
    { label: 'Vertical', value: 'vertical' },
  ];

  const reactCode = `const items = [
 { label: 'Home', href: '/', isExternal: true  },
 { label: 'Library', href: '/library', isExternal: true  },
 { label: 'Data' },
];
<TkBreadcrumb model={items} separator="${separator}" />`;

  const vueCode = `<script setup>
import { TkBreadcrumb } from '@takeoff-ui/vue';
import { ref } from 'vue';

const items = [
  { label: 'Home', href: '/', isExternal: true },
  { label: 'Library', href: '/library', isExternal: true },
  { label: 'Data' },
];
const separator = ref('${separator}');
</script>
<template>
  <TkBreadcrumb :model.prop="items" :separator="separator" />
</template>`;

  const angularCode = `<tk-breadcrumb [model]="[  
    { label: 'Home', href: '/', isExternal: true },
    { label: 'Library', href: '/library', isExternal: true },
    { label: 'Data' }
  ]" separator="${separator}" />`;

  const demo = (
    <div style={{ overflow: 'overlay' }}>
      <TkRadioGroup value={separator} onTkChange={e => setSeparator(e.detail)}>
        {separatorOptions.map((radio, index) => {
          return <TkRadio label={radio.label} key={index} value={radio.value} />;
        })}
      </TkRadioGroup>
      <br />
      <TkBreadcrumb model={items} separator={separator} />
    </div>
  );

  return (
    <>
      <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>
    </>
  );
};
export default Separator;
