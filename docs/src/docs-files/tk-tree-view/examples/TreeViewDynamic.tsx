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
    {
      itemId: '3',
      label: 'Parent Directory 2',
      children: [{ itemId: '4', label: 'Child File 2' }],
    },
  ]);
  const [reactCode, setReactCode] = useState('');
  const [vueCode, setVueCode] = useState('');

  // Function to append new items
  const handleAddItems = () => {
    setItems((prev) => [
      ...prev,
      {
        itemId: '5',
        label: 'Parent Directory (Added)',
        children: [
          { itemId: '6', label: 'Child File 1 (Added)' },
          {
            itemId: '7',
            label: 'Child Directory 2',
            children: [{ itemId: '8', label: 'Child File 2 (Added)' }],
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
<TkTreeView mode="basic" type="light" size="base">   
  ${renderTreeItems(items)}
</TkTreeView>
`);
    setVueCode(`
<TkTreeView mode="basic" type="light" size="base">
  ${renderTreeItems(items)}
</TkTreeView>
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
