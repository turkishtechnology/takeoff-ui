import React, { useState } from 'react';
import { TkTreeView } from '@takeoff-ui/react';

function TreeView() {
  const [items, setItems] = useState([
    {
      key: '1',
      label: 'Parent Directory',
      children: [
        { key: '2', label: 'Child File 1' },
        {
          key: '3',
          label: 'Child Directory',
          children: [
            {
              key: '4',
              label: 'Child Directory2',
              children: [
                {
                  key: '5',
                  label: 'Child Directory3',
                  children: [
                    { key: '6', label: 'Child Directory4' },
                    { key: '7', label: 'Child Directory5' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: '10',
      label: 'Parent Directory2',
      children: [
        { key: '11', label: 'Child File 1' },
        {
          key: '12',
          label: 'Child Directory',
          children: [{ key: '13', label: 'Child Directory2' }],
        },
        {
          key: '15',
          label: 'Another Directory',
          children: [
            { key: '16', label: 'Another File1' },
            { key: '18', label: 'Another File2' },
            { key: '19', label: 'Another File3' },
          ],
        },
        { key: '17', label: 'Single File' },
      ],
    },
  ]);

  // Function to append new items
  const handleAddItems = () => {
    console.log('Adding new items');
    setItems(prev => [
      ...prev,
      {
        key: '20',
        label: 'Parent Directory (added)',
        children: [
          { key: '21', label: 'Child File 1' },
          {
            key: '22',
            label: 'Child Directory',
            children: [{ key: '23', label: 'Child Directory2' }],
          },
        ],
      },
    ]);
  };

  const handleItemClick = (event: CustomEvent) => {
    console.log('Tree item clicked:', event.detail);
  };

  const handleChange = (event: CustomEvent) => {
    console.log('Tree changed:', event.detail);
  };

  return (
    <>
      <button onClick={handleAddItems} style={{ marginBottom: 16 }}>
        Add New Items
      </button>
      <TkTreeView selectable mode="basic" type="light" size="base" items={items} onTkItemClick={handleItemClick} onTkChange={handleChange} />
    </>
  );
}

export default TreeView;
