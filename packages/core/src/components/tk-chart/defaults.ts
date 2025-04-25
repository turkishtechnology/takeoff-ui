/**
 * Base default chart options that apply to all chart types
 */
import { merge } from 'lodash';

export const DEFAULT_CHART_OPTIONS: any = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      bodyFont: {
        family: 'Geologica',
      },
      titleFont: {
        family: 'Geologica',
      },
    },
  },
};

/**
 * Default options specific to bar charts
 */
export const BAR_CHART_OPTIONS: any = {
  indexAxis: 'x',
  elements: {
    bar: {
      backgroundColor: '#3B82F6',
      borderRadius: 4,
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#525866',
        font: { family: 'Geologica', size: 12 },
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
      },
      ticks: {
        color: '#525866',
        font: { family: 'Geologica', size: 12 },
      },
    },
  },
};

/**
 * Default options specific to horizontal bar charts
 */
export const HORIZONTAL_BAR_CHART_OPTIONS: any = {
  indexAxis: 'y',
  elements: {
    bar: {
      backgroundColor: '#3B82F6',
      borderRadius: 4,
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
      },
      ticks: {
        color: '#525866',
        font: { family: 'Geologica', size: 12 },
      },
    },
    y: {
      ticks: {
        color: '#525866',
        font: { family: 'Geologica', size: 12 },
      },
    },
  },
};

/**
 * Default options specific to pie charts
 */
export const PIE_CHART_OPTIONS: any = {
  cutout: '0%',
  scales: undefined,
  elements: {
    arc: {
      borderWidth: 1,
      borderColor: '#fff',
    },
  },
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        font: { family: 'Geologica', size: 12 },
      },
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          const label = context.label || '';
          const value = context.raw || 0;
          const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
          const percentage = Math.round((value / total) * 10000) / 100;
          return `${label}: ${value} (${percentage.toFixed(2)}%)`;
        },
      },
    },
  },
};

/**
 * Default options specific to doughnut charts
 */
export const DOUGHNUT_CHART_OPTIONS: any = {
  ...PIE_CHART_OPTIONS,
  cutout: '50%',
};

// Simple color palettes for different chart styles
const CHART_COLORS = {
  basic: ['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE', '#2563EB'],
  light: ['#93C5FD', '#BFDBFE', '#DBEAFE', '#D6E6FD', '#EFF6FF'],
  divided: ['#3B82F6', '#2563EB', '#1D4ED8', '#1E40AF', '#1E3A8A'],
};

/**
 * Get default options based on chart type, style, and variant
 */
export function getDefaultOptionsForType(type: string, chartStyle: string = 'basic', variant: string = 'basic'): any {
  // Get base options
  let options;

  switch (type) {
    case 'bar':
      options = merge({}, DEFAULT_CHART_OPTIONS, BAR_CHART_OPTIONS);
      break;
    case 'horizontalBar':
    case 'horizontal-bar':
      options = merge({}, DEFAULT_CHART_OPTIONS, HORIZONTAL_BAR_CHART_OPTIONS);
      break;
    case 'pie':
      options = merge({}, DEFAULT_CHART_OPTIONS, PIE_CHART_OPTIONS);
      break;
    case 'doughnut':
      options = merge({}, DEFAULT_CHART_OPTIONS, DOUGHNUT_CHART_OPTIONS);
      break;
    default:
      options = merge({}, DEFAULT_CHART_OPTIONS);
  }

  // Set colors based on style
  const colors = CHART_COLORS[chartStyle] || CHART_COLORS.basic;

  // Store colors for later use
  options.colorPalette = colors;

  // For bar charts, update the bar color
  if ((type === 'bar' || type === 'horizontalBar' || type === 'horizontal-bar') && options.elements?.bar) {
    options.elements.bar.backgroundColor = colors[0];
  }

  return options;
}

/*
  
        Create and add backgroundExtender plugin directly
        const backgroundExtenderPlugin = {
          id: 'backgroundExtender',
          beforeDraw: (chart) => {
            const {ctx, chartArea, scales, width, height} = chart;
            const yScale = scales.y;
            const xScale = scales.x;
            
            // Log dimensions for debugging
            console.log('Chart dimensions:', {
              width,
              height,
              chartArea: {
                left: chartArea.left,
                top: chartArea.top,
                right: chartArea.right,
                bottom: chartArea.bottom,
                width: chartArea.right - chartArea.left,
                height: chartArea.bottom - chartArea.top
              },
              yScale: yScale ? {
                left: yScale.left,
                right: yScale.right,
                top: yScale.top,
                bottom: yScale.bottom,
                width: yScale.width,
                labelWidth: yScale.options?.ticks?.padding || 0
              } : 'not available',
              xScale: xScale ? {
                left: xScale.left,
                right: xScale.right,
                top: xScale.top,
                bottom: xScale.bottom,
                height: xScale.height,
                labelHeight: xScale.options?.ticks?.padding || 0
              } : 'not available'
            });
            
            // Draw Y-axis background - use the entire left side of the chart
            if (yScale) {
              ctx.fillStyle = '#d0d0d0';
              ctx.fillRect(0, 0, chartArea.left, height);
            }
            
            // Don't draw X-axis background - leave it transparent
          }
        };
        
        // Add our background extender plugin
        customPlugins.push(backgroundExtenderPlugin);
        
        Debug final plugins
*/
