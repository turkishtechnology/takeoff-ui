import { TkChart } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useCallback, useMemo, useRef, useState } from 'react';

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

const Plugin = () => {
  const chartRef = useRef<any>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
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
      ctx.fillText(String(value), width / 2, height / 2.1);

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
    const chartInstance = await chartRef.current?.getChart();
    if (!chartInstance) return;
    if (elements.length > 0) {
      const index = elements[0].index;
      setSelectedIndex(index);
      chartInstance.selectedIndex = index;
    } else {
      setSelectedIndex(null);
      chartInstance.selectedIndex = null;
    }
    if (chartRef.current) {
      await chartRef.current.refresh();
    }
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
  const reactCode = `import React, { useRef, useState, useCallback, useMemo } from 'react';
import { TkChart } from '@takeoff-ui/react';

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

const centerTextPlugin = {
    id: 'centerText',
    beforeDraw(chart: any) {
        const { width, height, ctx } = chart;
        ctx.save();
        const data = chart.data.datasets[0].data;
        const total = data.reduce((a: number, b: number) => a + b, 0);
        const selected = chart.options.plugins?.centerText?.selectedIndex ?? null;
        const value = selected !== null ? data[selected] : total;
        const label = selected !== null ? chart.data.labels[selected] : 'Total';
        ctx.font = 'bold 22px Geologica, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#222530';
        ctx.fillText(String(value), width / 2, height / 2.1);
        ctx.font = '15px Geologica, sans-serif';
        ctx.fillStyle = '#99A0AE';
        ctx.fillText(label, width / 2, height / 1.9);
        ctx.restore();
    },
};

export default function Example() {
    const chartRef = useRef<any>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handleClick = useCallback(async (_e: any, elements: any[]) => {
        if (elements.length > 0) {
            setSelectedIndex(elements[0].index);
        } else {
            setSelectedIndex(null);
        }
        if (chartRef.current) {
            await (chartRef.current as any).refresh();
        }
    }, []);

    const pieOptions = useMemo(
        () => ({
            responsive: true,
            cutout: '90%',
            maintainAspectRatio: true,
            onClick: handleClick,
            plugins: {
                centerText: { selectedIndex },
            },
        }),
        [handleClick, selectedIndex]
    );

    return (
        <TkChart
            type="doughnut"
            data={data}
            options={pieOptions as any}  
            plugins={[centerTextPlugin]}
            ref={chartRef}
            width="450px"
        />
    );
}
`;
  const vueCode = `<script setup>
import { ref, computed } from 'vue'
import { TkChart } from '@takeoff-ui/vue'

const chartRef = ref(null)
const selectedIndex = ref(null)

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
}

const centerTextPlugin = {
  id: 'centerText',
  beforeDraw(chart) {
    const { width, height, ctx } = chart
    ctx.save()
    const data = chart.data.datasets[0].data
    const total = data.reduce((a, b) => a + b, 0)
    // Read selectedIndex from options for reactivity
    const selected = chart.options.plugins?.centerText?.selectedIndex ?? null
    const value = selected !== null ? data[selected] : total
    const label = selected !== null ? chart.data.labels[selected] : 'Total'
    ctx.font = 'bold 22px Geologica, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = '#222530'
    ctx.fillText(String(value), width / 2, height / 2.1)
    ctx.font = '15px Geologica, sans-serif'
    ctx.fillStyle = '#99A0AE'
    ctx.fillText(label, width / 2, height / 1.9)
    ctx.restore()
  },
}

const pieOptions = computed(() => ({
  responsive: true,
  cutout: '90%',
  maintainAspectRatio: 1,
  onClick: async (_e, elements) => {
    if (elements.length > 0) {
      selectedIndex.value = elements[0].index
    } else {
      selectedIndex.value = null
    }
    if (chartRef.value) {
      await chartRef.value.refresh()
    }
  },
  plugins: {
    centerText: {
      selectedIndex: selectedIndex.value,
    },
  },
}))
</script>

<template>
  <TkChart
    ref="chartRef"
    type="doughnut"
    :data.prop="data"
    :options.prop="pieOptions"
    :plugins.prop="[centerTextPlugin]"
    width="450px"
  />
</template>
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
      <TkChart
        type="doughnut"
        data={data}
        options={pieOptions as any}
        plugins={[centerTextPlugin]}
        ref={chartRef}
        width="450px"
      />
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

export default Plugin;
