import React, { useState, useEffect } from 'react';
import { TkTreeView } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const sampleData = [
  {
    label: 'Categories',
    children: [
      {
        label: 'Electronics',
        children: [
          {
            label: 'Phones',
            children: [
              {
                label: 'iPhone',
              },
              {
                label: 'Samsung',
              },
            ],
          },
          {
            label: 'Laptops',
            children: [
              {
                label: 'MacBook',
              },
              {
                label: 'Dell',
              },
            ],
          },
        ],
      },
      {
        label: 'Clothing',
        children: [
          {
            label: 'Men',
            children: [
              {
                label: 'Shirts',
              },
              {
                label: 'Pants',
              },
            ],
          },
          {
            label: 'Women',
            children: [
              {
                label: 'Dresses',
              },
              {
                label: 'Shoes',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'Laptops',
    children: [
      {
        label: 'MacBook',
      },
      {
        label: 'Dell',
      },
    ],
  },
];

const TreeViewMode = () => {
  const [reactCode, setReactCode] = useState('');
  const [vueCode, setVueCode] = useState('');

  useEffect(() => {
    setReactCode(`
const treeData = [
  {
    label: 'Categories',
    children: [
      {
        label: 'Electronics',
        children: [
          {
            label: 'Phones',
            children: [
              {
                label: 'iPhone',
              },
              {
                label: 'Samsung',
              },
            ],
          },
          {
            label: 'Laptops',
            children: [
              {
                label: 'MacBook',
              },
              {
                label: 'Dell',
              },
            ],
          },
        ],
      },
      {
        label: 'Clothing',
        children: [
          {
            label: 'Men',
            children: [
              {
                label: 'Shirts',
              },
              {
                label: 'Pants',
              },
            ],
          },
          {
            label: 'Women',
            children: [
              {
                label: 'Dresses',
              },
              {
                label: 'Shoes',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'Laptops',
    children: [
      {
        label: 'MacBook',
      },
      {
        label: 'Dell',
      },
    ],
  },
];
<TkTreeView 
  mode="basic" 
  type="divided" 
  size="base" 
  items={treeData}
  branchIcon="category"
  leafIcon="label"
  onTkItemClick={(e) => console.log('Clicked item:', e.detail)}
/>
<TkTreeView 
  mode="stepper" 
  type="divided" 
  size="base" 
  items={treeData}
  branchIcon="category"
  leafIcon="label"
  onTkItemClick={(e) => console.log('Clicked item:', e.detail)}
/>
`);
    setVueCode(`
<script setup>
const treeData = [
  {
    label: 'Categories',
    children: [
      {
        label: 'Electronics',
        children: [
          {
            label: 'Phones',
            children: [
              {
                label: 'iPhone'
              },
              {
                label: 'Samsung'
              }
            ]
          },
          {
            label: 'Laptops',
            children: [
              {
                label: 'MacBook'
              },
              {
                label: 'Dell'
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
  <TkTreeView 
    mode="basic" 
    type="divided" 
    size="base" 
    :items="treeData"
    branch-icon="category"
    leaf-icon="label"
    @tkItemClick="(e) => console.log('Clicked item:', e.detail)"
  />
  <TkTreeView 
    mode="stepper" 
    type="divided" 
    size="base" 
    :items="treeData"
    branch-icon="category"
    leaf-icon="label"
    @tkItemClick="(e) => console.log('Clicked item:', e.detail)"
  />
</template>
`);
  }, []);

  const demo = (
    <div className="w-full space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-2">Basic Mode</h3>
        <p className="text-sm text-gray-600 mb-4">Displays tree items in a traditional hierarchical structure with expandable/collapsible nodes.</p>
        <TkTreeView mode="basic" type="divided" size="base" items={sampleData} branchIcon="category" leafIcon="label" />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Stepper Mode</h3>
        <p className="text-sm text-gray-600 mb-4">Displays tree items in a step-by-step column layout, ideal for navigation and drill-down interfaces.</p>
        <TkTreeView mode="stepper" type="divided" size="base" items={sampleData} branchIcon="category" leafIcon="label" />
      </div>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode="" />;
};

export default TreeViewMode;
