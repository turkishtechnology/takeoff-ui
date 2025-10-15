import { useState } from 'react';
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
  const [isControlled, setIsControlled] = useState(true);

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
    // Always update the state - the component will use it only when isControlled is true
    setExpandedKeys(event.detail);
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
    setExpandedKeys(['1-1']);
    console.log('Expanding second branch: 1-1 (ancestor "1" auto-included)');
  };

  const expandBothRoots = () => {
    setExpandedKeys(['0', '1']);
    console.log('Expanding both root directories: ["0", "1"]');
  };

  const expandMultiplePaths = () => {
    setExpandedKeys(['0-1', '1-1', '1-2']);
    console.log('Expanding multiple paths: ["0-1", "1-1", "1-2"]');
  };

  const expandSingleDeepPath = () => {
    setExpandedKeys(['0-1-0']);
    console.log('Expanding single deep path: ["0-1-0"] (ancestors auto-included)');
  };

  const collapseFirstRoot = () => {
    setExpandedKeys(['1']);
    console.log('Collapsing first root, keeping second: ["1"]');
  };

  const collapseSecondRoot = () => {
    setExpandedKeys(['0']);
    console.log('Collapsing second root, keeping first: ["0"]');
  };

  const collapseToRoots = () => {
    setExpandedKeys(['0', '1']);
    console.log('Collapsing to roots only: ["0", "1"]');
  };

  const collapseFirstBranch = () => {
    setExpandedKeys(['0', '1']);
    console.log('Collapsing first deep branch: ["0", "1"]');
  };

  const collapseSecondBranch = () => {
    setExpandedKeys(['0', '1']);
    console.log('Collapsing second branch: ["0", "1"]');
  };

  return (
    <>
      <div style={{ marginBottom: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button onClick={handleAddItems} style={{ padding: '8px 12px', cursor: 'pointer' }}>
          Add New Items
        </button>
        <button onClick={toggleControlled} style={{ padding: '8px 12px', cursor: 'pointer', fontWeight: 'bold' }}>
          {isControlled ? 'Switch to Uncontrolled' : 'Switch to Controlled'}
        </button>
      </div>
      {isControlled && (
        <div style={{ marginBottom: 16, padding: 12, background: '#f0f0f0', borderRadius: 4 }}>
          <strong>Controlled Mode Test Buttons:</strong>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
            <div>
              <strong style={{ fontSize: '12px', color: '#666' }}>Expand Operations:</strong>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
                <button onClick={expandBothRoots} style={{ padding: '6px 10px', cursor: 'pointer', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>
                  Expand Both Roots
                </button>
                <button onClick={expandFirstBranch} style={{ padding: '6px 10px', cursor: 'pointer', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>
                  Expand First Deep
                </button>
                <button onClick={expandSecondBranch} style={{ padding: '6px 10px', cursor: 'pointer', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>
                  Expand Second Branch
                </button>
                <button
                  onClick={expandMultiplePaths}
                  style={{ padding: '6px 10px', cursor: 'pointer', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}
                >
                  Expand Multiple
                </button>
                <button
                  onClick={expandSingleDeepPath}
                  style={{ padding: '6px 10px', cursor: 'pointer', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}
                >
                  Expand Single Deep
                </button>
              </div>
            </div>
            <div>
              <strong style={{ fontSize: '12px', color: '#666' }}>Collapse Operations:</strong>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
                <button onClick={collapseAll} style={{ padding: '6px 10px', cursor: 'pointer', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px' }}>
                  Collapse All
                </button>
                <button onClick={collapseToRoots} style={{ padding: '6px 10px', cursor: 'pointer', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px' }}>
                  Collapse To Roots
                </button>
                <button onClick={collapseFirstRoot} style={{ padding: '6px 10px', cursor: 'pointer', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px' }}>
                  Collapse First Root
                </button>
                <button onClick={collapseSecondRoot} style={{ padding: '6px 10px', cursor: 'pointer', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px' }}>
                  Collapse Second Root
                </button>
                <button
                  onClick={collapseFirstBranch}
                  style={{ padding: '6px 10px', cursor: 'pointer', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px' }}
                >
                  Collapse First Branch
                </button>
                <button
                  onClick={collapseSecondBranch}
                  style={{ padding: '6px 10px', cursor: 'pointer', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px' }}
                >
                  Collapse Second Branch
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div style={{ marginBottom: 8, padding: 8, background: '#f0f0f0', borderRadius: 4 }}>
        <strong>Mode:</strong> {isControlled ? 'Controlled' : 'Uncontrolled'} | <strong>Expanded Keys:</strong> {isControlled ? JSON.stringify(expandedKeys) : 'Auto-managed'}
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
