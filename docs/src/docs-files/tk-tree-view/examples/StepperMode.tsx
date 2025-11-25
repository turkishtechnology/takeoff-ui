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

const TreeViewStepper = () => {
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
      },
      {
        label: 'Clothing',
        children: [
          {
            label: 'Men',
            children: [
              {
                label: 'Shirts'
              },
              {
                label: 'Pants'
              }
            ]
          }
        ]
      }
    ]
  }
];

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
    <div className="w-full">
      <TkTreeView mode="stepper" type="divided" size="base" items={sampleData} branchIcon="category" leafIcon="label" />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode="" />;
};

export default TreeViewStepper;
