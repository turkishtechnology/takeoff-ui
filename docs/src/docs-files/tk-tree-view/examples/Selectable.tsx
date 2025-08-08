import React, { useState } from 'react';
import { TkTreeView } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const sampleData = [
  {
    key: 'documents',
    label: 'Documents',
    children: [
      {
        key: 'work-files',
        label: 'Work Files',
        children: [
          {
            key: 'reports',
            label: 'Reports',
            children: [
              {
                key: 'q1-report',
                label: 'Q1 Report.pdf',
              },
              {
                key: 'q2-report',
                label: 'Q2 Report.pdf',
              },
            ],
          },
          {
            key: 'presentations',
            label: 'Presentations',
            children: [
              {
                key: 'meeting-slides',
                label: 'Meeting Slides.pptx',
              },
            ],
          },
        ],
      },
      {
        key: 'personal',
        label: 'Personal',
        children: [
          {
            key: 'photos',
            label: 'Photos',
            children: [
              {
                key: 'vacation-jpg',
                label: 'Vacation.jpg',
              },
              {
                key: 'family-jpg',
                label: 'Family.jpg',
              },
            ],
          },
          {
            key: 'notes-txt',
            label: 'Notes.txt',
          },
        ],
      },
    ],
  },
  {
    key: 'downloads',
    label: 'Downloads',
    children: [
      {
        key: 'software',
        label: 'Software',
        children: [
          {
            key: 'setup-exe',
            label: 'setup.exe',
          },
        ],
      },
    ],
  },
];

const Selectable = () => {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const reactCode = `
const [selectedItems, setSelectedItems] = useState([]);

const treeData = [
  {
    key: 'documents',
    label: 'Documents',
    children: [
      {
        key: 'work-files',
        label: 'Work Files',
        children: [
          {
            key: 'reports',
            label: 'Reports',
            children: [
              {
                key: 'q1-report',
                label: 'Q1 Report.pdf'
              },
              {
                key: 'q2-report',
                label: 'Q2 Report.pdf'
              }
            ]
          }
        ]
      },
      {
        key: 'personal',
        label: 'Personal',
        children: [
          {
            key: 'photos',
            label: 'Photos',
            children: [
              {
                key: 'vacation-jpg',
                label: 'Vacation.jpg'
              }
            ]
          },
          {
            key: 'notes-txt',
            label: 'Notes.txt'
          }
        ]
      }
    ]
  }
];

<TkTreeView 
  mode="basic"
  type="light"
  size="base"
  items={treeData}
  selectable={true}
  value={selectedItems}
  branchIcon="folder"
  leafIcon="insert_drive_file"
  onTkChange={(e) => setSelectedItems(e.detail)}
  
/>

<div>
  <p>Selected items: {selectedItems.length}</p>
  {selectedItems.length > 0 && (
    <ul>
      {selectedItems.map((key, index) => (
        <li key={index}>{key}</li>
      ))}
    </ul>
  )}
</div>
`;

  const vueCode = `
<script setup>
import { ref } from 'vue';

const selectedItems = ref([]);

const treeData = [
  {
    key: 'documents',
    label: 'Documents',
    children: [
      {
        key: 'work-files',
        label: 'Work Files',
        children: [
          {
            key: 'reports',
            label: 'Reports',
            children: [
              {
                key: 'q1-report',
                label: 'Q1 Report.pdf'
              },
              {
                key: 'q2-report',
                label: 'Q2 Report.pdf'
              }
            ]
          }
        ]
      },
      {
        key: 'personal',
        label: 'Personal',
        children: [
          {
            key: 'photos',
            label: 'Photos',
            children: [
              {
                key: 'vacation-jpg',
                label: 'Vacation.jpg'
              }
            ]
          },
          {
            key: 'notes-txt',
            label: 'Notes.txt'
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
    type="light"
    size="base"
    :items="treeData"
    :selectable="true"
    v-model="selectedItems"
    branch-icon="folder"
    leaf-icon="insert_drive_file"
  />
  
  <div>
    <p>Selected items: {{ selectedItems.length }}</p>
    <ul v-if="selectedItems.length > 0">
      <li v-for="(key, index) in selectedItems" :key="index">{{ key }}</li>
    </ul>
  </div>
</template>
`;

  const demo = (
    <div className="w-full space-y-4">
      <TkTreeView
        type="light"
        size="base"
        items={sampleData}
        selectable={true}
        value={selectedItems}
        branchIcon="folder"
        leafIcon="insert_drive_file"
        onTkChange={e => {
          setSelectedItems(e.detail);
        }}
      />

      <div className="p-4 bg-gray-50 rounded">
        <p className="font-medium mb-2">Selected items: {selectedItems.length}</p>
        {selectedItems.length > 0 && (
          <ul className="list-disc list-inside text-sm space-y-1">
            {selectedItems.map((key, index) => (
              <li key={index} className="text-gray-600">
                {key}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode="" />;
};

export default Selectable;
