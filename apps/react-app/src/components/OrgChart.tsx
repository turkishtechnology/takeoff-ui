import { useRef, useState } from 'react';
import { TkOrgChart } from '@takeoff-ui/react';
import Layout from '../layout/Layout';

function OrgChart() {
  const chartRef = useRef<any>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [zoomEnabled, setZoomEnabled] = useState(true);

  const handleToggleZoom = () => {
    setZoomEnabled(!zoomEnabled);
    console.log(`Zoom ${!zoomEnabled ? 'enabled' : 'disabled'}`);
  };

  const handleToggleCollapsible = () => {
    setIsCollapsed(!isCollapsed);
    console.log(`Buttons ${!isCollapsed ? 'enabled' : 'disabled'}`);
  };

  // const data: any[] = [
  //     { id: 1, parentId: null, name: 'Emre Arslan', title: 'CEO' },
  //     { id: 2, parentId: 1, name: 'Emre Arslan', title: 'CTO' },
  //     { id: 3, parentId: 1, name: 'Emre Arslan', title: 'CFO' },
  //     { id: 4, parentId: 2, name: 'Emre Arslan', title: 'VP of Engineering' },
  //     { id: 5, parentId: 2, name: 'Emre Arslan', title: 'VP of Engineering' },
  //     { id: 6, parentId: 3, name: 'Emre Arslan', title: 'VP of Engineering' },
  //     { id: 7, parentId: 3, name: 'Emre Arslan', title: 'VP of Engineering' },
  // ]
  const data: any = {
    name: 'Emre Arslan',
    title: 'CEO',
    children: [
      {
        name: 'Emre Arslan',
        title: 'CTO',
        children: [
          {
            name: 'Engineering manager',
            title: 'VP of Engineering',
          },
          {
            name: 'Engineering manager',
            title: 'VP of Engineering',
          },
          {
            name: 'Engineering manager',
            title: 'VP of Engineering',
          },
          {
            name: 'Engineering manager',
            title: 'VP of Engineering',
          },
        ],
      },
    ],
  };
  const options = {
    nodeId: (d: any) => d.id,
    parentNodeId: (d: any) => d.parentId,
  };
  const handleNodeClick = (e: CustomEvent<any>) => {
    console.log('Node clicked:', e.detail);
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '10px' }}>
        <button onClick={handleToggleZoom}>
          {zoomEnabled ? 'Disable Zoom' : 'Enable Zoom'}
        </button>
        <button onClick={handleToggleCollapsible}>
          {isCollapsed ? 'Disable Buttons' : 'Enable Buttons'}
        </button>
      </div>
      <div style={{ height: '500px', width: '100%' }}>
        <TkOrgChart
          ref={chartRef}
          data={data}
          options={options}
          collapsible={isCollapsed}
          onTkNodeClick={handleNodeClick}
        />
      </div>
    </div>
  );
}

export default OrgChart;
