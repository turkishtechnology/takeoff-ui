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

  // Test the new expandedKeys prop and tk-expand-change event
  const [expandedKeys, setExpandedKeys] = useState<string[]>(['0']); // Start with first parent expanded
  const [isControlled, setIsControlled] = useState(false);

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

  const handleExpandChange = (event: CustomEvent) => {
    console.log('Expanded paths changed:', event.detail);
    if (isControlled) {
      setExpandedKeys(event.detail);
    }
  };

  const toggleControlled = () => {
    setIsControlled(prev => !prev);
    console.log('Controlled mode:', !isControlled);
  };

  const collapseAll = () => {
    setExpandedKeys([]);
    console.log('Collapsing all paths');
  };

  const expandFirstBranch = () => {
    // Simplified: just specify the deepest path, ancestors are auto-included
    setExpandedKeys(['0-1-0-0']);
    console.log('Expanding first branch to deepest level: 0-1-0-0 (ancestors auto-included)');
  };

  const expandSecondBranch = () => {
    // Simplified: just specify the target path
    setExpandedKeys(['1-0-0']);
    console.log('Expanding second branch: 1-1 (ancestor "1" auto-included)');
  };

  return (
    <>
      <div style={{ marginBottom: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button onClick={handleAddItems}>Add New Items</button>
        <button onClick={toggleControlled}>{isControlled ? 'Switch to Uncontrolled' : 'Switch to Controlled'}</button>
        {isControlled && (
          <>
            <button onClick={collapseAll}>Collapse All</button>
            <button onClick={expandFirstBranch}>Expand First Branch</button>
            <button onClick={expandSecondBranch}>Expand Second Branch</button>
          </>
        )}
      </div>
      <div style={{ marginBottom: 8, padding: 8, background: '#f0f0f0', borderRadius: 4 }}>
        <strong>Mode:</strong> {isControlled ? 'Controlled' : 'Uncontrolled'} |<strong> Expanded Keys:</strong> {isControlled ? JSON.stringify(expandedKeys) : 'Auto-managed'}
      </div>
      <TkTreeView
        selectable
        expandAll={true}
        mode="basic"
        type="light"
        size="base"
        items={items}
        expandedKeys={isControlled ? expandedKeys : undefined}
        onTkItemClick={handleItemClick}
        onTkChange={handleChange}
        onTkExpandChange={handleExpandChange}
      />
    </>
  );
}

export default TreeView;
