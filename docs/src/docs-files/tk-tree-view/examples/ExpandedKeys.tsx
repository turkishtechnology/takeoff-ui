import React, { useState, useEffect } from 'react';
import { TkTreeView } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const sampleData = [
  {
    key: 'root-directory',
    label: 'Root Directory',
    children: [
      {
        key: 'second-directory',
        label: 'Second Directory',
        children: [
          {
            key: 'third-directory',
            label: 'Third Directory',
            children: [
              {
                key: 'fourth-directory',
                label: 'Fourth Directory',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 'documents',
    label: 'Documents',
    children: [
      {
        key: 'projects',
        label: 'Projects',
        children: [
          {
            key: 'project-1',
            label: 'Project 1',
          },
          {
            key: 'project-2',
            label: 'Project 2',
          },
        ],
      },
      {
        key: 'reports',
        label: 'Reports',
      },
    ],
  },
  {
    key: 'images',
    label: 'Images',
    children: [
      {
        key: 'vacation-photos',
        label: 'Vacation Photos',
      },
    ],
  },
];

const TreeViewControllable = () => {
  const [expandedKeys, setExpandedKeys] = useState<string[]>(['third-directory', 'projects']);
  const [reactCode, setReactCode] = useState('');
  const [vueCode, setVueCode] = useState('');

  useEffect(() => {
    setReactCode(`
const treeData = [
  {
    key: "root-directory",
    label: 'Root Directory',
    children: [
      {
        key: "second-directory",
        label: 'Second Directory',
        children: [
          {
            key: "third-directory",
            label: 'Third Directory',
            children: [
              {
                key: "fourth-directory",
                label: 'Fourth Directory'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    key: "documents",
    label: 'Documents',
    children: [
      {
        key: "projects",
        label: 'Projects',
        children: [
          {
            key: "project-1",
            label: 'Project 1'
          },
          {
            key: "project-2",
            label: 'Project 2'
          }
        ]
      },
      {
        key: "reports",
        label: 'Reports'
      }
    ]
  }
];

const [expandedKeys, setExpandedKeys] = useState(['third-directory', 'projects']);

<TkTreeView
  mode="basic"
  type="light"
  size="base"
  items={treeData}
  branchIcon="folder"
  leafIcon="insert_drive_file"
  expandedKeys={expandedKeys}
  onTkExpandChange={(e) => setExpandedKeys(e.detail)}
/>
`);
    setVueCode(`
<script setup>
import { ref } from 'vue';

const treeData = [
  {
    key: "root-directory",
    label: 'Root Directory',
    children: [
      {
        key: "second-directory",
        label: 'Second Directory',
        children: [
          {
            key: "third-directory",
            label: 'Third Directory',
            children: [
              {
                key: "fourth-directory",
                label: 'Fourth Directory'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    key: "documents",
    label: 'Documents',
    children: [
      {
        key: "projects",
        label: 'Projects',
        children: [
          {
            key: "project-1",
            label: 'Project 1'
          },
          {
            key: "project-2",
            label: 'Project 2'
          }
        ]
      },
      {
        key: "reports",
        label: 'Reports'
      }
    ]
  }
];

const expandedKeys = ref(['third-directory', 'projects']);
</script>

<template>
  <TkTreeView
    mode="basic"
    type="light"
    size="base"
    :items="treeData"
    branchIcon="folder"
    leafIcon="insert_drive_file"
    :expandedKeys="expandedKeys"
    @tk-expand-change="(e) => expandedKeys = e.detail"
  />
</template>
`);
  }, []);

  const collapseAll = () => {
    setExpandedKeys([]);
  };

  const expandBothRoots = () => {
    setExpandedKeys(['reports', 'project-2']);
  };

  const expandFirstDeep = () => {
    setExpandedKeys(['reports', 'project-2']);
  };

  const collapseFirstRoot = () => {
    setExpandedKeys(expandedKeys.filter(key => !key.startsWith('reports')));
  };

  const collapseToRoots = () => {
    // Extract first segment from each path and remove duplicates
    const roots = Array.from(new Set(expandedKeys.map(key => key.split('-')[0])));
    setExpandedKeys(roots);
  };

  const demo = (
    <div className="w-full">
      <div style={{ marginBottom: '16px', padding: '12px', background: '#f5f5f5', borderRadius: '8px' }}>
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
