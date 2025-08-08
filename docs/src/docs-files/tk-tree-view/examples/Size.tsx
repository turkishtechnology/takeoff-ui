import React, { useState, useEffect } from 'react';
import { TkTreeView, TkRadioGroup, TkRadio } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const sizeOptions: Array<'large' | 'base' | 'small'> = ['large', 'base', 'small'];

const sampleData = [
  {
    label: 'Root Directory',
    children: [
      {
        label: 'Second Directory',
        children: [
          {
            label: 'Third Directory',
            children: [
              {
                label: 'Fourth Directory',
              },
            ],
          },
        ],
      },
    ],
  },
];

const TreeViewSize = () => {
  const [size, setSize] = useState<'large' | 'base' | 'small'>('base');
  const [reactCode, setReactCode] = useState('');
  const [vueCode, setVueCode] = useState('');

  useEffect(() => {
    setReactCode(`
const treeData = [
  {
    label: 'Root Directory',
    children: [
      {
        label: 'Second Directory',
        children: [
          {
            label: 'Third Directory',
            children: [
              {
                label: 'Fourth Directory'
              }
            ]
          }
        ]
      }
    ]
  }
];

<TkTreeView mode="basic" type="light" size="${size}" items={treeData} />
`);
    setVueCode(`
<script setup>
const treeData = [
  {
    label: 'Root Directory',
    children: [
      {
        label: 'Second Directory',
        children: [
          {
            label: 'Third Directory',
            children: [
              {
                label: 'Fourth Directory'
              }
            ]
          }
        ]
      }
    ]
  }
];
</script>

<template>
  <TkTreeView mode="basic" type="light" size="${size}" :items="treeData" />
</template>
`);
  }, [size]);

  const demo = (
    <div className="flex flex-col gap-8 items-start w-full">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-wrap gap-4">
          <TkRadioGroup label="Size" value={size} onTkChange={e => setSize(e.detail)}>
            {sizeOptions.map(opt => (
              <TkRadio key={opt} label={opt.charAt(0).toUpperCase() + opt.slice(1)} value={opt} />
            ))}
          </TkRadioGroup>
        </div>
        <div className="w-full">
          <TkTreeView mode="basic" type="light" size={size} items={sampleData} />
        </div>
      </div>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode="" />;
};

export default TreeViewSize;
