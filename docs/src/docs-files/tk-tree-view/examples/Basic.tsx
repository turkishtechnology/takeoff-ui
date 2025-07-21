import React, { useState, useEffect } from 'react';
import { TkTreeView } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

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
  {
    label: 'Documents',
    children: [
      {
        label: 'Projects',
        children: [
          {
            label: 'Project 1',
          },
          {
            label: 'Project 2',
          },
        ],
      },
      {
        label: 'Reports',
      },
    ],
  },
  {
    label: 'Images',
    children: [
      {
        label: 'Vacation Photos',
      },
    ],
  },
];

const TreeViewBasic = () => {
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
  },
  {
    label: 'Documents',
    children: [
      {
        label: 'Projects',
        children: [
          {
            label: 'Project 1'
          },
          {
            label: 'Project 2'
          }
        ]
      },
      {
        label: 'Reports'
      }
    ]
  }
];

<TkTreeView 
  mode="basic" 
  type="light" 
  size="base" 
  items={treeData}
  branchIcon="folder"
  leafIcon="insert_drive_file"
  onTkItemClick={(e) => console.log('Clicked item:', e.detail)}
/>
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
  },
  {
    label: 'Documents',
    children: [
      {
        label: 'Projects',
        children: [
          {
            label: 'Project 1'
          },
          {
            label: 'Project 2'
          }
        ]
      },
      {
        label: 'Reports'
      }
    ]
  }
];
</script>

<template>
  <TkTreeView 
    mode="basic" 
    type="light" 
    size="base" 
    :items="treeData"
    branch-icon="folder"
    leaf-icon="insert_drive_file"
    @tkItemClick="(e) => console.log('Clicked item:', e.detail)"
  />
</template>
`);
  }, []);

  const demo = (
    <div className="w-full">
      <TkTreeView
        mode="basic"
        type="light"
        size="base"
        items={sampleData}
        branchIcon="folder"
        leafIcon="insert_drive_file"
      />
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

export default TreeViewBasic;
