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
              {
                label: 'This is example brand',
              },
              {
                label: 'Huawei',
              },
              {
                label: 'Nokia',
              },
              {
                label: 'Sony',
              },
              {
                label: 'LG',
              },
              {
                label: 'Motorola',
              },
              {
                label: 'OnePlus',
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

const CustomStyles = () => {
  const reactCode = `<TkTreeView
  containerStyle={{
    backgroundColor: '#f8d7da',
    padding: '10px',
    borderRadius: '8px',
  }}
  stepStyle={{ backgroundColor: 'rgb(241 241 241)', maxHeight: '200px', overflowY: 'auto', minWidth: '200px' }}
  mode="stepper"
  type="divided"
  size="base"
  items={sampleData}
  branchIcon="folder"
/>`;
  const vueCode = `<tk-tree-view
  :container-style="{
    backgroundColor: '#f8d7da',
    padding: '10px',
    borderRadius: '8px',
  }"
  :step-style="{ 
    backgroundColor: 'rgb(241 241 241)', 
    maxHeight: '200px', 
    overflowY: 'auto', 
    minWidth: '200px' 
  }"
  mode="stepper"
  type="divided"
  size="base"
  :items="sampleData"
  branchIcon="folder"
></tk-tree-view>`;

  const demo = (
    <div>
      <p>In this demo, background color is red for the container and vertical scrolling is applied to the step using max height.</p>
      <TkTreeView
        containerStyle={{
          backgroundColor: '#f8d7da',
          padding: '10px',
          borderRadius: '8px',
        }}
        stepStyle={{ backgroundColor: 'rgb(241 241 241)', maxHeight: '200px', overflowY: 'auto', minWidth: '200px' }}
        mode="stepper"
        type="divided"
        size="base"
        items={sampleData}
        branchIcon="folder"
      />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode="" />;
};

export default CustomStyles;
