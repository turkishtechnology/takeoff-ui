import { TkChart } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      data: [1, 10, 5, 2, 20, 32, 45],
    },
  ],
};

const options = {
  scales: {
    x: {
      border: {
        display: false,
      },
      grid: {
        display: false,
        drawTicks: false,
      },
    },
    y: {
      ticks: {
        padding: 14,
      },
      border: {
        color: '#E1E4EA',
        width: 1,
      },
      grid: {
        display: false,
        drawTicks: false,
      },
    },
  },
};
const Bar = () => {
  const reactCode = `const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      data: [1, 10, 5, 2, 20, 32, 45],
    },
  ],
};
const options = {
  scales: {
    x: {
      border: {
        display: false,
      },
      grid: {
        display: false,
        drawTicks: false,
      },
    },
    y: {
      ticks: {
        padding: 14,
      },
      border: {
        color: '#E1E4EA',
        width: 1,
      },
      grid: {
        display: false,
        drawTicks: false,
      },
    },
  },
};
<TkChart type="bar" data={data} options={options} />
`;
  const vueCode = `const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      data: [1, 10, 5, 2, 20, 32, 45],
    },
  ],
};
const options = {
  scales: {
    x: {
      border: {
        display: false,
      },
      grid: {
        display: false,
        drawTicks: false,
      },
    },
    y: {
      ticks: {
        padding: 14,
      },
      border: {
        color: '#E1E4EA',
        width: 1,
      },
      grid: {
        display: false,
        drawTicks: false,
      },
    },
  },
};
<TkChart type="bar" :data.prop="data" :options.prop="options" />
`;

  const angularCode = `<tk-chart
  type="bar"
  [data]="{
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        data: [1, 10, 5, 2, 20, 32, 45]
      }
    ]
  }"
  [options]="{
    scales: {
      x: {
        border: { display: false },
        grid: { display: false, drawTicks: false }
      },
      y: {
        ticks: { padding: 14 },
        border: { color: '#E1E4EA', width: 1 },
        grid: { display: false, drawTicks: false }
      }
    }
  }"
/>`;

  const demo = (
    <div>
      <TkChart type="bar" data={data} options={options} />
    </div>
  );
  return (
    <FeatureDemo
      demo={demo}
      reactCode={reactCode}
      vueCode={vueCode}
      angularCode={angularCode}
    />
  );
};

export default Bar;
