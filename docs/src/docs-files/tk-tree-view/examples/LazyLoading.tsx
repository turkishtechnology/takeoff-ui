import React, { useRef, useState } from 'react';
import { TkButton, TkTreeView } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

type LazyItem = {
  key: string;
  label: string;
  isLeaf?: boolean;
  children?: LazyItem[];
};

const initialData: LazyItem[] = [
  { key: 'documents', label: 'Documents', isLeaf: false },
  { key: 'images', label: 'Images', isLeaf: false },
  { key: 'readme', label: 'readme.txt' },
];

// Stands in for the server. Only the keys listed here can be expanded any further.
const childrenByKey: Record<string, LazyItem[]> = {
  documents: [
    { key: 'projects', label: 'Projects', isLeaf: false },
    { key: 'reports', label: 'reports.pdf' },
  ],
  projects: [
    { key: 'project-1', label: 'project-1.doc' },
    { key: 'project-2', label: 'project-2.doc' },
  ],
  images: [
    { key: 'vacation', label: 'vacation.png' },
    { key: 'profile', label: 'profile.png' },
  ],
};

const fetchChildren = (key: string): Promise<LazyItem[]> => new Promise(resolve => setTimeout(() => resolve(childrenByKey[key] ?? []), 900));

// Rebuilds the branch the children belong to, leaving every other node as it was.
const attachChildren = (nodes: LazyItem[], key: string, children: LazyItem[]): LazyItem[] =>
  nodes.map(node => {
    if (node.key === key) {
      return { ...node, children, isLeaf: children.length === 0 };
    }
    if (node.children) {
      return { ...node, children: attachChildren(node.children, key, children) };
    }
    return node;
  });

const reactCode = `const initialData = [
  { key: 'documents', label: 'Documents', isLeaf: false },
  { key: 'images', label: 'Images', isLeaf: false },
  { key: 'readme', label: 'readme.txt' },
];

// Rebuilds the branch the children belong to, leaving every other node as it was.
const attachChildren = (nodes, key, children) =>
  nodes.map((node) => {
    if (node.key === key) {
      return { ...node, children, isLeaf: children.length === 0 };
    }
    if (node.children) {
      return { ...node, children: attachChildren(node.children, key, children) };
    }
    return node;
  });

const LazyTree = () => {
  const [items, setItems] = useState(initialData);
  const [loadingKeys, setLoadingKeys] = useState([]);
  const [loadedKeys, setLoadedKeys] = useState([]);
  const inFlight = useRef(new Set());

  const handleLoad = async (event) => {
    const { key } = event.detail.item;
    // Collapsing and reopening a branch faster than loadingKeys can round-trip
    // through state emits tk-load twice, so keys in flight are tracked in a ref.
    if (inFlight.current.has(key)) return;
    inFlight.current.add(key);
    setLoadingKeys((keys) => [...keys, key]);
    try {
      const children = await fetch(\`/api/folders/\${key}\`).then((res) => res.json());
      setItems((current) => attachChildren(current, key, children));
      // Only a branch that actually arrived is marked as loaded; a failed one is
      // left off the list so expanding it again retries the fetch.
      setLoadedKeys((keys) => [...keys, key]);
    } finally {
      inFlight.current.delete(key);
      setLoadingKeys((keys) => keys.filter((k) => k !== key));
    }
  };

  return (
    <TkTreeView
      lazy
      type="light"
      items={items}
      loadingKeys={loadingKeys}
      loadedKeys={loadedKeys}
      branchIcon="folder"
      leafIcon="insert_drive_file"
      onTkLoad={handleLoad}
    />
  );
};`;

const vueCode = `<script setup>
import { ref } from 'vue';

const items = ref([
  { key: 'documents', label: 'Documents', isLeaf: false },
  { key: 'images', label: 'Images', isLeaf: false },
  { key: 'readme', label: 'readme.txt' },
]);
const loadingKeys = ref([]);
const loadedKeys = ref([]);

// Rebuilds the branch the children belong to, leaving every other node as it was.
const attachChildren = (nodes, key, children) =>
  nodes.map((node) => {
    if (node.key === key) {
      return { ...node, children, isLeaf: children.length === 0 };
    }
    if (node.children) {
      return { ...node, children: attachChildren(node.children, key, children) };
    }
    return node;
  });

const handleLoad = async (event) => {
  const { key } = event.detail.item;
  loadingKeys.value = [...loadingKeys.value, key];
  try {
    const children = await fetch(\`/api/folders/\${key}\`).then((res) => res.json());
    items.value = attachChildren(items.value, key, children);
    loadedKeys.value = [...loadedKeys.value, key];
  } finally {
    loadingKeys.value = loadingKeys.value.filter((k) => k !== key);
  }
};
</script>

<template>
  <TkTreeView
    lazy
    type="light"
    :items="items"
    :loadingKeys="loadingKeys"
    :loadedKeys="loadedKeys"
    branchIcon="folder"
    leafIcon="insert_drive_file"
    @tk-load="handleLoad"
  />
</template>`;

const angularCode = `import { Component } from '@angular/core';

@Component({
  selector: 'app-lazy-tree',
  template: \`
    <tk-tree-view
      lazy
      type="light"
      [items]="items"
      [loadingKeys]="loadingKeys"
      [loadedKeys]="loadedKeys"
      branchIcon="folder"
      leafIcon="insert_drive_file"
      (tk-load)="handleLoad($event)"
    ></tk-tree-view>
  \`,
})
export class LazyTreeComponent {
  items = [
    { key: 'documents', label: 'Documents', isLeaf: false },
    { key: 'images', label: 'Images', isLeaf: false },
    { key: 'readme', label: 'readme.txt' },
  ];
  loadingKeys: string[] = [];
  loadedKeys: string[] = [];

  async handleLoad(event) {
    const key = event.detail.item.key;
    this.loadingKeys = [...this.loadingKeys, key];
    try {
      const children = await fetch(\`/api/folders/\${key}\`).then((res) => res.json());
      this.items = this.attachChildren(this.items, key, children);
      this.loadedKeys = [...this.loadedKeys, key];
    } finally {
      this.loadingKeys = this.loadingKeys.filter((k) => k !== key);
    }
  }

  private attachChildren(nodes, key, children) {
    return nodes.map((node) => {
      if (node.key === key) {
        return { ...node, children, isLeaf: children.length === 0 };
      }
      if (node.children) {
        return { ...node, children: this.attachChildren(node.children, key, children) };
      }
      return node;
    });
  }
}`;

const TreeViewLazyLoading = () => {
  const [items, setItems] = useState<LazyItem[]>(initialData);
  const [loadingKeys, setLoadingKeys] = useState<string[]>([]);
  const [loadedKeys, setLoadedKeys] = useState<string[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const inFlight = useRef<Set<string>>(new Set());
  // Bumped by Reset so a fetch that is still in the air can tell it belongs to a tree that is gone.
  const generation = useRef(0);

  const handleLoad = async (event: any) => {
    const key: string = event.detail.item.key;
    // Collapsing and reopening a branch faster than loadingKeys can round-trip through state emits
    // tk-load twice, so the keys in flight are tracked in a ref that updates immediately.
    if (inFlight.current.has(key)) return;
    inFlight.current.add(key);
    const requestedIn = generation.current;
    setLoadingKeys(keys => [...keys, key]);
    try {
      const children = await fetchChildren(key);
      // A Reset while this was in the air would otherwise repopulate the tree it just cleared.
      if (requestedIn !== generation.current) return;
      setItems(current => attachChildren(current, key, children));
      // Only a branch that actually arrived is marked as loaded; a failed one is left off the list
      // so expanding it again retries the fetch.
      setLoadedKeys(keys => [...keys, key]);
    } finally {
      inFlight.current.delete(key);
      setLoadingKeys(keys => keys.filter(k => k !== key));
    }
  };

  // Dropping the children is not enough on its own. The branches stay marked as loaded and would
  // never be requested again, and any branch left expanded would sit there open and empty, so the
  // expansion and the loaded keys go back with them.
  const reset = () => {
    generation.current += 1;
    setItems(initialData);
    setLoadedKeys([]);
    setLoadingKeys([]);
    setExpandedKeys([]);
    inFlight.current.clear();
  };

  const demo = (
    <div className="w-full">
      <div
        style={{
          marginBottom: '16px',
          padding: '12px',
          background: 'var(--background-lightest)',
          border: '1px solid var(--border-light)',
          borderRadius: '8px',
          color: 'var(--text-dark)',
          fontSize: '12px',
        }}
      >
        <div>
          <strong>Loading Keys:</strong> {JSON.stringify(loadingKeys)}
        </div>
        <div>
          <strong>Loaded Keys:</strong> {JSON.stringify(loadedKeys)}
        </div>
      </div>
      <TkTreeView
        lazy
        mode="basic"
        type="light"
        size="base"
        items={items}
        loadingKeys={loadingKeys}
        loadedKeys={loadedKeys}
        expandedKeys={expandedKeys}
        branchIcon="folder"
        leafIcon="insert_drive_file"
        onTkLoad={handleLoad}
        onTkExpandChange={e => setExpandedKeys(e.detail)}
      />
      <div style={{ marginTop: '16px' }}>
        <TkButton label="Reset" variant="neutral" type="outlined" size="small" icon="refresh" onTkClick={reset} />
      </div>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode} />;
};

export default TreeViewLazyLoading;
