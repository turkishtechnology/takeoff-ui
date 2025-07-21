import React, { useState, useEffect } from 'react';
import { TkTreeView, TkRadioGroup, TkRadio } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const typeOptions: Array<'basic' | 'divided' | 'light'> = [
  'basic',
  'divided',
  'light',
];

const sampleData = [
  {
    itemId: '1',
    label: 'Root Directory',
    children: [
      {
        itemId: '1.2',
        label: 'Second Directory',
        children: [
          {
            itemId: '1.3',
            label: 'Third Directory',
            children: [
              {
                itemId: '1.4',
                label: 'Fourth Directory',
              },
            ],
          },
        ],
      },
      { itemId: '2', label: 'Child 1' },
      { itemId: '3', label: 'Child 2' },
      { itemId: '4', label: 'Child 3' },
      { itemId: '5', label: 'Child 4' },
      { itemId: '6', label: 'Child 5' },
      { itemId: '7', label: 'Child 6' },
      { itemId: '8', label: 'Child 7' },
    ],
  },
];

const TreeViewType = () => {
  const [type, setType] = useState<'basic' | 'divided' | 'light'>('basic');
  const [reactCode, setReactCode] = useState('');
  const [vueCode, setVueCode] = useState('');

  useEffect(() => {
    setReactCode(`
const treeData = [
  {
    itemId: '1',
    label: 'Root Directory',
    children: [
      {
        itemId: '1.2',
        label: 'Second Directory',
        children: [
          {
            itemId: '1.3',
            label: 'Third Directory',
            children: [
              {
                itemId: '1.4',
                label: 'Fourth Directory'
              }
            ]
          }
        ]
      },
      { itemId: '2', label: 'Child 1' },
      { itemId: '3', label: 'Child 2' },
      { itemId: '4', label: 'Child 3' },
      { itemId: '5', label: 'Child 4' },
      { itemId: '6', label: 'Child 5' },
      { itemId: '7', label: 'Child 6' },
      { itemId: '8', label: 'Child 7' },
    ]
  }
];

<TkTreeView mode="basic" type="${type}" size="base" items={treeData} />
`);
    setVueCode(`
<script setup>
const treeData = [
  {
    itemId: '1',
    label: 'Root Directory',
    children: [
      {
        itemId: '1.2',
        label: 'Second Directory',
        children: [
          {
            itemId: '1.3',
            label: 'Third Directory',
            children: [
              {
                itemId: '1.4',
                label: 'Fourth Directory'
              }
            ]
          }
        ]
      },
      { itemId: '2', label: 'Child 1' },
      { itemId: '3', label: 'Child 2' },
      { itemId: '4', label: 'Child 3' },
      { itemId: '5', label: 'Child 4' },
      { itemId: '6', label: 'Child 5' },
      { itemId: '7', label: 'Child 6' },
      { itemId: '8', label: 'Child 7' },
    ]
  }
];
</script>

<template>
  <TkTreeView mode="basic" type="${type}" size="base" :items="treeData" />
</template>
`);
  }, [type]);

  const demo = (
    <div className="flex flex-col gap-8 items-start w-full">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-wrap gap-4">
          <TkRadioGroup
            label="Type"
            value={type}
            onTkChange={(e) => setType(e.detail)}
          >
            {typeOptions.map((opt) => (
              <TkRadio
                key={opt}
                label={opt.charAt(0).toUpperCase() + opt.slice(1)}
                value={opt}
              />
            ))}
          </TkRadioGroup>
        </div>
        <div className="w-full">
          <TkTreeView mode="basic" type={type} size="base" items={sampleData} />
        </div>
      </div>
    </div>
  );

  return (
    <FeatureDemo
      demo={demo}
      reactCode={reactCode}
      vueCode={vueCode}
      angularCode=""
    />
  );
};

export default TreeViewType;
