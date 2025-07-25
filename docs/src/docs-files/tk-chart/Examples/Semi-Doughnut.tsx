import { TkChart } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'My First dataset',
      data: [1, 10, 5, 2, 20, 32],
      backgroundColor: ['#F5F9FF', '#D0E1FD', '#ABC9FB', '#3B82F6', '#295BAC', '#204887'],
    },
  ],
};
const options = {
  cutout: '90%',
  rotation: 225,
  circumference: 270,
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
      },
    },
  },
};

const SemiDoughnut = () => {
  const reactCode = `const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
        {
            label: 'My First dataset',
            data: [1, 10, 5, 2, 20, 32],
            backgroundColor: [
                '#F5F9FF',
                '#D0E1FD',
                '#ABC9FB',
                '#3B82F6',
                '#295BAC',
                '#204887',
            ],
        },
    ],
};
const options = {
    cutout: '90%',
    rotation: 225,
    circumference: 270,
    plugins: {
        legend: {
            labels: {
                usePointStyle: true,
            },
        },
    },
};
<TkChart type="doughnut" data={data} options={options}/>`;
  const vueCode = `const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
        {
            label: 'My First dataset',
            data: [1, 10, 5, 2, 20, 32],
            backgroundColor: [
                '#F5F9FF',
                '#D0E1FD',
                '#ABC9FB',
                '#3B82F6',
                '#295BAC',
                '#204887',
            ],
        },
    ],
};
const options = {
    cutout: '90%',
    rotation: 225,
    circumference: 270,
    plugins: {
        legend: {
            labels: {
                usePointStyle: true,
            },
        },
    },
};
<TkChart type="doughnut" :data.prop="data" :options.prop="options" />
`;

  const angularCode = `<tk-chart
  type="doughnut"
  [data]="{
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'My First dataset',
        data: [1, 10, 5, 2, 20, 32],
        backgroundColor: [
          '#F5F9FF',
          '#D0E1FD',
          '#ABC9FB',
          '#3B82F6',
          '#295BAC',
          '#204887'
        ]
      }
    ]
  }"
  [options]="{
    cutout: '90%',
    rotation: 225,
    circumference: 270,
    plugins: {
      legend: {
        labels: {
          usePointStyle: true
        }
      }
    }
  }"
/>`;

  const demo = (
    <div>
      <TkChart width="450px" type="doughnut" data={data} options={options} />
    </div>
  );
  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode} />;
};

export default SemiDoughnut;
