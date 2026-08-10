import { useState, useEffect } from 'react';
import { TkTreeView } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const sampleData = [
  {
    key: 'documents',
    label: 'Documents',
    children: [
      {
        key: 'reports',
        label: 'Reports',
        children: [
          { key: 'q1', label: 'Q1.pdf' },
          { key: 'q2', label: 'Q2.pdf' },
        ],
      },
      { key: 'summary', label: 'Summary.docx' },
    ],
  },
  {
    key: 'images',
    label: 'Images',
    children: [
      { key: 'photo', label: 'Photo.png' },
      { key: 'logo', label: 'Logo.svg' },
    ],
  },
];

const TreeViewCollapseBehavior = () => {
  const [reactCode, setReactCode] = useState('');
  const [vueCode, setVueCode] = useState('');

  useEffect(() => {
    setReactCode(`
const treeData = [
  {
    key: 'documents',
    label: 'Documents',
    children: [
      {
        key: 'reports',
        label: 'Reports',
        children: [
          { key: 'q1', label: 'Q1.pdf' },
          { key: 'q2', label: 'Q2.pdf' }
        ]
      },
      { key: 'summary', label: 'Summary.docx' }
    ]
  },
  {
    key: 'images',
    label: 'Images',
    children: [
      { key: 'photo', label: 'Photo.png' },
      { key: 'logo', label: 'Logo.svg' }
    ]
  }
];

// Only the arrow icon expands/collapses, clicking the item selects it
<TkTreeView
  items={treeData}
  type="divided"
  branchIcon="category"
  leafIcon="label"
  toggleTrigger="icon"
  expandAll
/>
`);
    setVueCode(`
<script setup>
const treeData = [
  {
    key: 'documents',
    label: 'Documents',
    children: [
      {
        key: 'reports',
        label: 'Reports',
        children: [
          { key: 'q1', label: 'Q1.pdf' },
          { key: 'q2', label: 'Q2.pdf' }
        ]
      },
      { key: 'summary', label: 'Summary.docx' }
    ]
  },
  {
    key: 'images',
    label: 'Images',
    children: [
      { key: 'photo', label: 'Photo.png' },
      { key: 'logo', label: 'Logo.svg' }
    ]
  }
];
</script>

<template>
  <TkTreeView
    :items="treeData"
    type="divided"
    branchIcon="category"
    leafIcon="label"
    toggleTrigger="icon"
    expandAll
  />
</template>
`);
  }, []);

  const demo = (
    <div className="w-full">
      <p className="text-sm text-gray-600 mb-4">Only the arrow icon toggles the branch, clicking the rest of the item just selects it.</p>
      <TkTreeView expandAll toggleTrigger="icon" type="divided" size="base" items={sampleData} branchIcon="category" leafIcon="label" />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode="" />;
};

export default TreeViewCollapseBehavior;
