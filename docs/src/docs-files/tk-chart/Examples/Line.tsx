import { TkChart } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'My First dataset',
      data: [1, 10, 5, 2, 20, 32],
      borderColor: '#3B82F6',
      tension: 0.5,
    },
  ],
};
const options = {
  scales: {
    y: {
      grid: {
        display: false,
        drawTicks: false,
      },
    },
    x: {
      border: {
        display: false,
      },
      grid: {
        display: false,
        drawTicks: false,
      },
    },
  },
};

const Line = () => {
  const reactCode = `const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'My First dataset',
      data: [1, 10, 5, 2, 20, 32],
      borderColor: '#3B82F6',
      tension: 0.5,
    },
  ],
};
const options = {
  scales: {
    y: {
      grid: {
        display: false,
        drawTicks: false,
      },
    },
    x: {
      border: {
        display: false,
      },
      grid: {
        display: false,
        drawTicks: false,
      },
    },
  },
};
<TkChart type="line" data={data} options={options} />
    `;
  const vueCode = `const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'My First dataset',
      data: [1, 10, 5, 2, 20, 32],
      borderColor: '#3B82F6',
      tension: 0.5,
    },
  ],
};
const options = {
  scales: {
    y: {
      grid: {
        display: false,
        drawTicks: false,
      },
    },
    x: {
      border: {
        display: false,
      },
      grid: {
        display: false,
        drawTicks: false,
      },
    },
  },
};
<TkChart type="line" :data.prop="data" :options.prop="options" />
    `;

  const angularCode = `<tk-chart
  type="line"
  [data]="{
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'My First dataset',
        data: [1, 10, 5, 2, 20, 32],
        borderColor: '#3B82F6',
        tension: 0.5
      }
    ]
  }"
  [options]="{
    scales: {
      y: {
        grid: {
          display: false,
          drawTicks: false
        }
      },
      x: {
        border: {
          display: false
        },
        grid: {
          display: false,
          drawTicks: false
        }
      }
    }
  }"
/>`;

  const demo = (
    <div>
      <TkChart type="line" data={data} options={options} />
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

export default Line;
