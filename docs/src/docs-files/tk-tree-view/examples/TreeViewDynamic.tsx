import React, { useState, useEffect } from 'react';
import { TkTreeView, TkTreeItem, TkButton } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

function TreeViewDynamic() {
  const [items, setItems] = useState([
    {
      itemId: '1',
      label: 'Parent Directory',
      children: [{ itemId: '2', label: 'Child File 1' }],
    },
  ]);
  const [reactCode, setReactCode] = useState('');
  const [vueCode, setVueCode] = useState('');

  // Function to append new items
  const handleAddItems = () => {
    setItems((prev) => [
      ...prev,
      {
        itemId: '3',
        label: 'Parent Directory (Added)',
        children: [
          { itemId: '4', label: 'Child File 1 (Added)' },
          {
            itemId: '5',
            label: 'Child Directory 2',
            children: [{ itemId: '6', label: 'Child File 2 (Added)' }],
          },
        ],
      },
    ]);
  };

  const renderTreeItems = (nodes) =>
    nodes.map((node) => (
      <TkTreeItem key={node.itemId} itemId={node.itemId} label={node.label}>
        {node.children && node.children.length > 0
          ? renderTreeItems(node.children)
          : null}
      </TkTreeItem>
    ));

  useEffect(() => {
    setReactCode(`
const [items, setItems] = useState([
    {
      itemId: '1',
      label: 'Parent Directory',
      children: [{ itemId: '2', label: 'Child File 1' }],
    }
]);

const handleAddItems = () => {
  setItems((prev) => [
    ...prev,
    {
      itemId: '3',
      label: 'Parent Directory (added)',
      children: [
        { itemId: '4', label: 'Child File 1' },
        {
          itemId: '5',
          label: 'Child Directory',
          children: [{ itemId: '6', label: 'Child Directory2' }],
        },
      ],
    },
  ]);
};

const renderTreeItems = (nodes: any[]) =>
  nodes.map((node) => (
    <TkTreeItem key={node.itemId} itemId={node.itemId} label={node.label}>
      {node.children && node.children.length > 0
        ? renderTreeItems(node.children)
        : null}
    </TkTreeItem>
  ));
  return (
  <>
    <TkButton label="Add New Items" onTkClick={handleAddItems} />
    <TkTreeView mode="stepper" type="light" size="base" onTkItemClick={(e) => console.log('clicked', e.detail)}>
      {renderTreeItems(items)}
    </TkTreeView>
  </>
`);
    setVueCode(`
<script setup>
import { ref, defineComponent, h } from 'vue';
import { TkTreeView, TkTreeItem } from '@takeoff-ui/vue';

const items = ref([
  {
    itemId: '1',
    label: 'Parent Directory',
    children: [{ itemId: '2', label: 'Child File 1' }],
  }
]);

const TreeNode = defineComponent({
  name: 'TreeNode',
  props: { node: { type: Object, required: true } },
  setup(props) {
    return () =>
      h(
        TkTreeItem,
        { 'item-id': props.node.itemId, label: props.node.label },
        props.node.children && props.node.children.length
          ? {
              default: () =>
                props.node.children.map(child =>
                  h(TreeNode, { node: child, key: child.itemId })
                )
            }
          : undefined
      );
  }
});

function handleAddItems() {
  items.value.push({
    itemId: String(Date.now()),
    label: 'Parent Directory (Added)',
    children: [
      { itemId: String(Date.now() + 1), label: 'Child File 1 (Added)' },
      {
        itemId: String(Date.now() + 2),
        label: 'Child Directory 2',
        children: [
          { itemId: String(Date.now() + 3), label: 'Child File 2 (Added)' }
        ]
      }
    ]
  });
}
</script>
<template>
  <TkButton label="Add New Items" @tkClick="handleAddItems" />
  <TkTreeView mode="basic" type="light" size="base">
    <TreeNode v-for="item in items" :key="item.itemId" :node="item" />
  </TkTreeView>
</template>
`);
  }, [items]);

  const demo = (
    <div className="flex flex-col gap-8 items-start w-full">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-wrap gap-4">
          <TkButton label="Add New Items" onTkClick={handleAddItems} />
        </div>
        <div className="w-full">
          <TkTreeView mode="basic" type="light" size="base">
            {renderTreeItems(items)}
          </TkTreeView>
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
}

export default TreeViewDynamic;
