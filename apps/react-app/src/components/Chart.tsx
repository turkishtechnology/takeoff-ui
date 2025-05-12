import { TkChart } from '@takeoff-ui/react';
import { useState, useRef, useMemo, useCallback } from 'react';

function Chart() {
  // seçilmiş dataset index
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  // chart ref
  const chartRef = useRef<any>(null);
  // pie data
  const pieData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
    datasets: [
      {
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
        borderWidth: 1,
      },
    ],
  };

  // center text plugin
  const centerTextPlugin = {
    id: 'centerText',
    beforeDraw(chart: any) {
      const { width, height, ctx } = chart;
      ctx.save();
      //data
      const data = chart.data.datasets[0].data;
      // total item
      const total = data.reduce((a: number, b: number) => a + b, 0);
      // selected index
      const selected = chart.options.plugins?.centerText?.selectedIndex ?? null;
      // value
      const value = selected !== null ? data[selected] : total;
      // label
      const label = selected !== null ? chart.data.labels[selected] : 'Total';
      // font
      ctx.font = 'bold 22px Geologica, sans-serif';
      // text align
      ctx.textAlign = 'center';
      // text baseline
      ctx.textBaseline = 'middle';
      // fill style
      ctx.fillStyle = '#222530';
      // fill text
      ctx.fillText(`${value}`, width / 2, height / 2.1);

      //label
      ctx.font = '15px Geologica, sans-serif';
      // fill style
      ctx.fillStyle = '#99A0AE';
      // fill text
      ctx.fillText(label, width / 2, height / 1.9);
      // restore
      ctx.restore();
    },
  };

  // click event
  const handleClick = useCallback(async (_e: any, elements: any[]) => {
    // chart instance
    const chartInstance = await chartRef.current?.getChart();
    // if no chart instance
    if (!chartInstance) return;
    // eğer element length > 0 ise dataset dolu
    if (elements.length > 0) {
      const index = elements[0].index;
      setSelectedIndex(index);
      chartInstance.selectedIndex = index;
    } else {
      setSelectedIndex(null);
      chartInstance.selectedIndex = null;
    }
    chartInstance.update();
  }, []);
  // pie chart options
  const pieOptions = useMemo(
    () => ({
      responsive: true,
      cutout: '90%',
      maintainAspectRatio: 1,
      onClick: handleClick,
      plugins: {
        centerText: { selectedIndex },
      },
    }),
    [handleClick, pieData],
  );

  return (
    <div style={{ width: '50%' }}>
      <TkChart
        type="doughnut"
        data={pieData}
        options={pieOptions}
        plugins={[centerTextPlugin]}
        ref={chartRef}
      />
    </div>
  );
}

export default Chart;
