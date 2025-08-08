import { TkChart } from '@takeoff-ui/react';
import { useState, useRef, useMemo, useCallback, useEffect } from 'react';

function Chart() {
  // seçilmiş dataset index
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  // chart ref
  const chartRef = useRef<any>(null);
  // loading state
  const [isLoading, setIsLoading] = useState(false);
  // chart data state
  const [chartData, setChartData] = useState({
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
    datasets: [
      {
        data: [12, 19, 3, 5, 2],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        borderWidth: 1,
      },
    ],
  });

  // Fetch data from server function
  const refreshChartData = useCallback(async () => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock data from server - in real app this would be a fetch call
      const updatedData = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
        datasets: [
          {
            data: [Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30)],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            borderWidth: 1,
          },
        ],
      };

      setChartData(updatedData);

      // Update chart manually
      const chartInstance = chartRef.current?.getChart();
      if (chartInstance) {
        chartInstance.refresh();
      }

      console.log('Chart data refreshed');
    } catch (error) {
      console.error('Error refreshing chart data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial data fetch on mount
  useEffect(() => {
    refreshChartData();
  }, [refreshChartData]);

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
    chartInstance.refresh();
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
    [handleClick, selectedIndex],
  );

  return (
    <div style={{ width: '50%' }}>
      <TkChart type="doughnut" data={chartData} options={pieOptions as any} plugins={[centerTextPlugin]} ref={chartRef} />
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={refreshChartData}
          disabled={isLoading}
          style={{
            padding: '8px 16px',
            backgroundColor: isLoading ? '#cccccc' : '#36A2EB',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
          }}
        >
          {isLoading ? 'Loading...' : 'Refresh Data'}
        </button>
      </div>
    </div>
  );
}

export default Chart;
