import { TkChart } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const data = {
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
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
      },
    },
  },
};
const pointBorderColorPlugin = {
  id: 'pointBorderColorPlugin',
  beforeDraw: (chart, args, options) => {
    const colors = options.colors || [
      '#F5F9FF',
      '#D0E1FD',
      '#ABC9FB',
      '#3B82F6',
      '#295BAC',
      '#204887',
    ];
    // Target legend items to change strokeStyle
    if (chart.legend && chart.legend.legendItems) {
      chart.legend.legendItems.forEach((item, index) => {
        if (item) {
          item.strokeStyle = colors[index % colors.length];
        }
      });
    }
  },
  defaults: {
    colors: null,
  },
};

const Doughnut = () => {
  const reactCode = `
    <TkChart type="doughnut" data={data} />
    `;
  const vueCode = `
    <TkChart type="doughnut" :data="data" />
    `;
  const demo = (
    <div>
      <TkChart
        width="450px"
        type="doughnut"
        data={data}
        options={options}
        plugins={[pointBorderColorPlugin]}
      />
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
};

export default Doughnut;
