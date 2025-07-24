import { TkOrgChart } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

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
const Basic = () => {
  const reactCode = `const data = {
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
            <TkOrgChart
                ref={chartRef}
                data={data}
                options={options}
                collapsible = {true}
                onTkNodeClick={handleNodeClick}
            />`;
  const vueCode = `const data = {
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
            <TkOrgChart
                ref={chartRef}
                data={data}
                options={options}
                collapsible = {true}
                onTkNodeClick={handleNodeClick}
            />`;
  const demo = (
    <div>
      <TkOrgChart data={data} options={options} collapsible={true} onTkNodeClick={handleNodeClick} />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode="" />;
};

export default Basic;
