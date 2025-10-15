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

const TreeViewControllable = () => {
  const [expandedKeys, setExpandedKeys] = useState<string[]>(['0-0-0-0', '1']);
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

const [expandedKeys, setExpandedKeys] = useState(['0-0-0', '1']);

<TkTreeView
  mode="basic"
  type="light"
  size="base"
  items={treeData}
  branchIcon="folder"
  leafIcon="insert_drive_file"
  expandedKeys={expandedKeys}
  onTkExpandChange={(e) => setExpandedKeys(e.detail)}
  onTkItemClick={(e) => console.log('Clicked item:', e.detail)}
/>
`);
    setVueCode(`
<script setup>
import { ref } from 'vue';

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

const expandedKeys = ref(['0-0-0', '1']);
</script>

<template>
  <TkTreeView
    mode="basic"
    type="light"
    size="base"
    :items="treeData"
    branch-icon="folder"
    leaf-icon="insert_drive_file"
    :expanded-keys="expandedKeys"
    @tk-expand-change="(e) => expandedKeys = e.detail"
    @tk-item-click="(e) => console.log('Clicked item:', e.detail)"
  />
</template>
`);
  }, []);

  const collapseAll = () => {
    setExpandedKeys([]);
  };

  const expandBothRoots = () => {
    setExpandedKeys(['0', '1']);
  };

  const expandFirstDeep = () => {
    setExpandedKeys(['0-0-0-0']);
  };

  const collapseFirstRoot = () => {
    setExpandedKeys(expandedKeys.filter(key => !key.startsWith('0')));
  };

  const collapseToRoots = () => {
    // Extract first segment from each path and remove duplicates
    const roots = Array.from(new Set(expandedKeys.map(key => key.split('-')[0])));
    setExpandedKeys(roots);
  };

  const demo = (
    <div className="w-full">
      <div style={{ marginBottom: '16px', padding: '12px', background: '#f5f5f5', borderRadius: '8px' }}>
        <div style={{ marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>Controlled Mode Buttons:</div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
          <button
            onClick={expandBothRoots}
            style={{ padding: '6px 12px', cursor: 'pointer', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', fontSize: '12px' }}
          >
            Expand Both Roots
          </button>
          <button
            onClick={expandFirstDeep}
            style={{ padding: '6px 12px', cursor: 'pointer', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', fontSize: '12px' }}
          >
            Expand First Deep
          </button>
          <button
            onClick={collapseToRoots}
            style={{ padding: '6px 12px', cursor: 'pointer', background: '#FF9800', color: 'white', border: 'none', borderRadius: '4px', fontSize: '12px' }}
          >
            Collapse To Roots
          </button>
          <button
            onClick={collapseFirstRoot}
            style={{ padding: '6px 12px', cursor: 'pointer', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', fontSize: '12px' }}
          >
            Collapse First Root
          </button>
          <button
            onClick={collapseAll}
            style={{ padding: '6px 12px', cursor: 'pointer', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', fontSize: '12px' }}
          >
            Collapse All
          </button>
        </div>
        <div style={{ fontSize: '12px', color: '#666' }}>
          <strong>Current Expanded Keys:</strong> {JSON.stringify(expandedKeys)}
        </div>
      </div>
      <TkTreeView
        mode="basic"
        type="light"
        size="base"
        items={sampleData}
        branchIcon="folder"
        leafIcon="insert_drive_file"
        expandedKeys={expandedKeys}
        onTkExpandChange={e => setExpandedKeys(e.detail)}
      />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode="" />;
};

export default TreeViewControllable;
