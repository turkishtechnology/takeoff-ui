import React, { useState } from 'react';
import { TkTreeView } from '@takeoff-ui/react';

function TreeView() {
  const [items, setItems] = useState([
    {
      itemId: '1',
      label: 'Parent Directory',
      children: [
        { itemId: '2', label: 'Child File 1' },
        {
          itemId: '3',
          label: 'Child Directory',
          children: [
            {
              itemId: '4',
              label: 'Child Directory2',
              children: [
                {
                  itemId: '5',
                  label: 'Child Directory3',
                  children: [
                    { itemId: '6', label: 'Child Directory4' },
                    { itemId: '7', label: 'Child Directory5' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      itemId: '10',
      label: 'Parent Directory2',
      children: [
        { itemId: '11', label: 'Child File 1' },
        {
          itemId: '12',
          label: 'Child Directory',
          children: [{ itemId: '13', label: 'Child Directory2' }],
        },
        {
          itemId: '15',
          label: 'Another Directory',
          children: [
            { itemId: '16', label: 'Another File1' },
            { itemId: '18', label: 'Another File2' },
            { itemId: '19', label: 'Another File3' },
          ],
        },
        { itemId: '17', label: 'Single File' },
      ],
    },
  ]);

  // Function to append new items
  const handleAddItems = () => {
    console.log('Adding new items');
    setItems(prev => [
      ...prev,
      {
        itemId: '20',
        label: 'Parent Directory (added)',
        children: [
          { itemId: '21', label: 'Child File 1' },
          {
            itemId: '22',
            label: 'Child Directory',
            children: [{ itemId: '23', label: 'Child Directory2' }],
          },
        ],
      },
    ]);
  };

  const handleItemClick = (event: CustomEvent) => {
    console.log('Tree item clicked:', event.detail);
  };

  return (
    <>
      <button onClick={handleAddItems} style={{ marginBottom: 16 }}>
        Add New Items
      </button>
      <TkTreeView mode="basic" type="light" size="base" items={items} onTkItemClick={handleItemClick} />
    </>
  );
}

export default TreeView;
