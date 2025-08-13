<template>
  <div class="space-y-8">
    <TkCard>
      <template #header>
        <h2 class="text-2xl font-semibold">Chart Component Demo</h2>
      </template>
      
      <div class="space-y-8">
        <!-- Bar Chart -->
        <div>
          <h3 class="text-lg font-medium mb-3">Bar Chart</h3>
          <div class="w-full h-64">
            <TkChart 
              type="bar" 
              :data="barData" 
              :options="barOptions"
              class="w-full h-full"
            />
          </div>
        </div>

        <!-- Line Chart -->
        <div>
          <h3 class="text-lg font-medium mb-3">Line Chart</h3>
          <div class="w-full h-64">
            <TkChart 
              type="line" 
              :data="lineData" 
              :options="lineOptions"
              class="w-full h-full"
            />
          </div>
        </div>

        <!-- Doughnut Chart -->
        <div>
          <h3 class="text-lg font-medium mb-3">Doughnut Chart</h3>
          <div class="w-full h-80">
            <TkChart 
              type="doughnut" 
              :data="doughnutData" 
              :options="doughnutOptions"
              class="w-full h-full"
            />
          </div>
        </div>

        <!-- Pie Chart -->
        <div>
          <h3 class="text-lg font-medium mb-3">Pie Chart</h3>
          <div class="w-full h-80">
            <TkChart 
              type="pie" 
              :data="pieData" 
              :options="pieOptions"
              class="w-full h-full"
            />
          </div>
        </div>

        <!-- Multiple Bar Chart -->
        <div>
          <h3 class="text-lg font-medium mb-3">Multiple Bar Chart</h3>
          <div class="w-full h-64">
            <TkChart 
              type="bar" 
              :data="multipleBarData" 
              :options="barOptions"
              class="w-full h-full"
            />
          </div>
        </div>

        <!-- Bubble Chart -->
        <div>
          <h3 class="text-lg font-medium mb-3">Bubble Chart</h3>
          <div class="w-full h-64">
            <TkChart 
              type="bubble" 
              :data="bubbleData" 
              :options="bubbleOptions"
              class="w-full h-full"
            />
          </div>
        </div>

        <!-- Polar Area Chart -->
        <div>
          <h3 class="text-lg font-medium mb-3">Polar Area Chart</h3>
          <div class="w-full h-80">
            <TkChart 
              type="polarArea" 
              :data="polarAreaData" 
              :options="polarAreaOptions"
              class="w-full h-full"
            />
          </div>
        </div>

        <!-- Radar Chart -->
        <div>
          <h3 class="text-lg font-medium mb-3">Radar Chart</h3>
          <div class="w-full h-80">
            <TkChart 
              type="radar" 
              :data="radarData" 
              :options="radarOptions"
              class="w-full h-full"
            />
          </div>
        </div>

        <!-- Scatter Chart -->
        <div>
          <h3 class="text-lg font-medium mb-3">Scatter Chart</h3>
          <div class="w-full h-64">
            <TkChart 
              type="scatter" 
              :data="scatterData" 
              :options="scatterOptions"
              class="w-full h-full"
            />
          </div>
        </div>

        <!-- Chart with Custom Props -->
        <div>
          <h3 class="text-lg font-medium mb-3">Chart with Custom Props</h3>
          <div class="space-y-4">
            <div>
              <h4 class="font-medium mb-2">Fixed Dimensions with Accessibility</h4>
              <TkChart 
                type="bar" 
                :data="barData" 
                :options="barOptions"
                :width="600"
                :height="300"
                accessibility-label="Sales data bar chart showing monthly revenue"
                class="border rounded"
              />
            </div>
            
            <div>
              <h4 class="font-medium mb-2">Chart with Custom Plugin</h4>
              <TkChart 
                type="doughnut" 
                :data="doughnutData" 
                :options="doughnutOptions"
                :plugins="customPlugins"
                :width="400"
                :height="400"
                accessibility-label="Distribution doughnut chart with custom center text plugin"
                class="border rounded"
              />
            </div>
          </div>
        </div>

        <!-- Chart Methods Demo -->
        <div>
          <h3 class="text-lg font-medium mb-3">Chart Methods Demo</h3>
          <div class="space-y-4">
            <div class="flex gap-4">
              <TkButton @click="refreshChart" label="Refresh Chart" />
              <TkButton @click="getBase64Image" label="Get Base64 Image" />
              <TkButton @click="getChartInstance" label="Log Chart Instance" />
              <TkButton @click="getCanvasElement" label="Log Canvas Element" />
            </div>
            
            <div>
              <TkChart 
                ref="methodsChart"
                type="line" 
                :data="lineData" 
                :options="lineOptions"
                :width="500"
                :height="250"
                class="border rounded"
              />
            </div>
            
            <div v-if="base64Image" class="p-3 bg-gray-50 border rounded">
              <p class="text-sm font-medium mb-2">Generated Base64 Image:</p>
              <img :src="base64Image" alt="Chart as image" class="max-w-sm border" />
            </div>
          </div>
        </div>
      </div>
    </TkCard>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TkCard, TkChart, TkButton } from '@takeoff-ui/vue';

const barData = ref({
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      data: [1, 10, 5, 2, 20, 32, 45],
      backgroundColor: '#3B82F6',
    },
  ],
});

const barOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
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
});

const lineData = ref({
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'My First dataset',
      data: [1, 10, 5, 2, 20, 32],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.5,
      fill: true,
    },
  ],
});

const lineOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
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
});

const doughnutData = ref({
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
});

const doughnutOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
      },
    },
  },
});

const pieData = ref({
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: 'Vote Count',
      data: [12, 19, 3, 5, 2, 8],
      backgroundColor: [
        '#EF4444',
        '#3B82F6',
        '#EAB308',
        '#10B981',
        '#8B5CF6',
        '#F97316',
      ],
      borderWidth: 1,
    },
  ],
});

const pieOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true,
        padding: 20,
      },
    },
  },
});

const multipleBarData = ref({
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Sales 2023',
      data: [1, 10, 5, 2, 20, 32, 45],
      backgroundColor: '#3B82F6',
    },
    {
      label: 'Sales 2024',
      data: [2, 12, 7, 4, 25, 35, 43],
      backgroundColor: '#EF4444',
    },
  ],
});

// Bubble Chart Data
const bubbleData = ref({
  datasets: [
    {
      label: 'Dataset 1',
      data: [
        { x: 20, y: 30, r: 15 },
        { x: 40, y: 10, r: 10 },
        { x: 30, y: 40, r: 25 },
        { x: 60, y: 20, r: 20 },
        { x: 10, y: 50, r: 18 }
      ],
      backgroundColor: 'rgba(59, 130, 246, 0.6)',
      borderColor: '#3B82F6',
      borderWidth: 2
    },
    {
      label: 'Dataset 2',
      data: [
        { x: 25, y: 35, r: 12 },
        { x: 45, y: 15, r: 8 },
        { x: 35, y: 45, r: 22 },
        { x: 65, y: 25, r: 16 }
      ],
      backgroundColor: 'rgba(239, 68, 68, 0.6)',
      borderColor: '#EF4444',
      borderWidth: 2
    }
  ]
});

const bubbleOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: 'linear',
      position: 'bottom',
      title: {
        display: true,
        text: 'X Axis'
      }
    },
    y: {
      title: {
        display: true,
        text: 'Y Axis'
      }
    }
  }
});

// Polar Area Chart Data
const polarAreaData = ref({
  labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
  datasets: [
    {
      label: 'My Dataset',
      data: [11, 16, 7, 3, 14],
      backgroundColor: [
        '#EF4444',
        '#10B981',
        '#EAB308',
        '#6B7280',
        '#3B82F6'
      ]
    }
  ]
});

const polarAreaOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom'
    }
  }
});

// Radar Chart Data
const radarData = ref({
  labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency', 'Style'],
  datasets: [
    {
      label: 'Car A',
      data: [80, 90, 70, 85, 75, 80],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      pointBackgroundColor: '#3B82F6',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#3B82F6'
    },
    {
      label: 'Car B',
      data: [65, 75, 90, 70, 85, 75],
      borderColor: '#EF4444',
      backgroundColor: 'rgba(239, 68, 68, 0.2)',
      pointBackgroundColor: '#EF4444',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#EF4444'
    }
  ]
});

const radarOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      angleLines: {
        display: false
      },
      suggestedMin: 0,
      suggestedMax: 100
    }
  }
});

// Scatter Chart Data
const scatterData = ref({
  datasets: [
    {
      label: 'Scatter Dataset 1',
      data: [
        { x: -10, y: 0 },
        { x: 0, y: 10 },
        { x: 10, y: 5 },
        { x: 0.5, y: 5.5 },
        { x: -5, y: 8 },
        { x: 8, y: -3 }
      ],
      backgroundColor: '#3B82F6'
    },
    {
      label: 'Scatter Dataset 2',
      data: [
        { x: -8, y: 3 },
        { x: 2, y: 8 },
        { x: 12, y: 2 },
        { x: 3, y: -2 },
        { x: -3, y: 6 }
      ],
      backgroundColor: '#EF4444'
    }
  ]
});

const scatterOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: 'linear',
      position: 'bottom',
      title: {
        display: true,
        text: 'X Values'
      }
    },
    y: {
      title: {
        display: true,
        text: 'Y Values'
      }
    }
  }
});

// Custom Plugins
const customPlugins = ref([
  {
    id: 'centerText',
    beforeDraw(chart) {
      const { width, height, ctx } = chart;
      ctx.restore();
      const fontSize = Math.min(height / 114, width / 114);
      ctx.font = `${fontSize}px Arial`;
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#374151';
      
      const text = 'Center Text';
      const textX = Math.round((width - ctx.measureText(text).width) / 2);
      const textY = height / 2;
      
      ctx.fillText(text, textX, textY);
      ctx.save();
    }
  }
]);

// Chart reference and state
const methodsChart = ref(null);
const base64Image = ref(null);

// Chart methods
const refreshChart = () => {
  if (methodsChart.value) {
    methodsChart.value.refresh();
    console.log('Chart refreshed');
  }
};

const getBase64Image = () => {
  if (methodsChart.value) {
    base64Image.value = methodsChart.value.getBase64Image();
    console.log('Base64 image generated');
  }
};

const getChartInstance = () => {
  if (methodsChart.value) {
    const chartInstance = methodsChart.value.getChart();
    console.log('Chart instance:', chartInstance);
  }
};

const getCanvasElement = () => {
  if (methodsChart.value) {
    const canvas = methodsChart.value.getCanvas();
    console.log('Canvas element:', canvas);
  }
};
</script>
