import { TkChart } from '@takeoff-ui/react';

function Chart() {
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

  return <TkChart type="line" data={data} options={options} />;
}

export default Chart;
