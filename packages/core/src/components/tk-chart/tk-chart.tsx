import { Component, h, Element, ComponentInterface, Prop } from '@stencil/core';
import Chart, { ChartOptions } from 'chart.js/auto';

/**
 * The TkChart component allows users to visualize data in a pie chart format using Chart.js.
 * @react `import { TkChart } from '@takeoff-ui/react'`
 * @vue `import { TkChart } from '@takeoff-ui/vue'`
 * @angular `import { TkChart } from '@takeoff-ui/angular'`
 */

@Component({
  tag: 'tk-chart',
  styleUrl: 'tk-chart.scss',
})
export class TkChart implements ComponentInterface {
  private chartCanvas?: HTMLCanvasElement;
  private chartInstance?: Chart;

  @Element() el: HTMLTkChartElement;

  @Prop() data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green'],
    datasets: [
      {
        label: 'Sample Dataset',
        data: [12, 19, 3, 5],
        hoverOffset: 4,
      },
    ],
  };

  private internalOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    indexAxis: 'x', //vertical bar chart
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    elements: {
      bar: {
        backgroundColor: '#3B82F6',
        borderSkipped: 'start',
        borderRadius: 20,
      },
    },
    layout: {
      padding: 0,
    },

    scales: {
      x: {
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
        offset: true,
        ticks: {
          color: '#525866',
          font: {
            family: 'Geologica',
            size: 12,
            style: 'normal',
            weight: 400,
            lineHeight: 1.5,
          },
        },
      },
      y: {
        backgroundColor: '#F9FAFC',
        border: {
          display: true,
        },
        grid: {
          display: false,
          drawOnChartArea: false,
        },
        offset: false,
        ticks: {
          padding: 0,
          showLabelBackdrop: true,
          color: '#525866',
          font: {
            family: 'Geologica',
            size: 12,
            style: 'normal',
            weight: 400,
            lineHeight: 1.5,
          },
        },
      },
    },
    // it works for horizontal bar chart
    // scales: {
    //   x: {
    //     display: false,
    //     beginAtZero: true,
    //     grid: {
    //       display: false,
    //     },
    //   },
    //   y: {
    //     type: 'category',
    //     display: false,
    //     position:'left',
    //     grid: {
    //       display: true,
    //       z: 1,
    //       color: 'rgba(0, 0, 0, 0.1)',
    //     },
    //     ticks: {
    //       padding: 10,
    //       color: '#333',
    //       font: {
    //         size: 14,
    //         weight: 500,
    //       },
    //       callback: function (index) {
    //         // Get labels from the data
    //         const labels = this.chart.data.labels;
    //         // Ensure we return a string or empty string
    //         return labels && labels[index] ? String(labels[index]) : '';
    //       },
    //     },
    //   },
    // },
  };

  @Prop() options: ChartOptions;
  /**
   * Chart height in pixels
   */
  @Prop() height: number = 600;

  /**
   * Chart width in pixels
   */
  @Prop() width: number = 600;

  @Prop() paddingUp: number = 15;

  @Prop() mode: 'pie' | 'bar' = 'bar';

  componentDidLoad() {
    if (this.options) {
      this.internalOptions = {
        ...this.internalOptions,
        ...this.options,
      };
    }

    this.initChart();
  }

  disconnectedCallback() {
    // Clean up chart instance when component is removed
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }

  private initChart() {
    if (this.chartCanvas) {
      const ctx = this.chartCanvas.getContext('2d');

      if (ctx) {
        // Create plugin for displaying labels inside bars
        const labelPlugin = {
          id: 'barLabelsPlugin',
          afterDraw: chart => {
            const { ctx, data } = chart;
            if (!data || !data.datasets || !data.datasets[0] || !data.datasets[0].data) return;

            // Debug: Print chart information
            // console.log(chart);
            // Get the minimum x position of the chart area
            // const chartAreaMinX = chart.chartArea.left;

            // Get y-axis position - this is where labels would be
            // const yAxisPosition = chart.scales.y ? chart.scales.y.left : 0;

            // Set text style, font, color, alignment, and baseline these will be props
            ctx.save();
            ctx.font = 'bold 14px Arial';
            ctx.fillStyle = '#000';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';

            const meta = chart.getDatasetMeta(0);

            // Process each data point
            data.datasets[0].data.forEach((value, index) => {
              if (meta.data[index]) {
                const bar = meta.data[index];
                const props = bar.getProps(['x', 'y', 'width', 'height'], chart.ctx);
                console.log(props);
                // Get label from data labels
                const label = data.labels && data.labels[index] ? data.labels[index] : '';

                // Position text inside bar - add a little extra padding since we have labels
                const textX = 0;
                const textY = props.y - props.height / 2 - this.paddingUp;

                // Add visual debugging - draw a point at the label position
                // ctx.save();
                // ctx.fillStyle = 'red';
                // ctx.beginPath();
                // ctx.arc(textX, textY, 3, 0, 2 * Math.PI);
                // ctx.fill();
                // ctx.restore();

                // Show different formats based on available width
                if (props.width > 50) {
                  // Full format with label and value
                  ctx.fillText(`${label}: ${value}`, textX, textY);
                } else if (props.width > 30) {
                  // Just show the value
                  ctx.fillText(value.toString(), textX, textY);
                }
                // For very narrow bars, don't show any text
              }
            });

            ctx.restore();
          },
        };
      }
      this.chartInstance = new Chart(ctx, {
        type: this.mode,
        data: this.data,
        options: this.internalOptions,
        plugins: [],
      });
    }
  }

  render() {
    return (
      <div class="tk-chart-container" style={{ minHeight: `${this.height}px` }}>
        <canvas ref={el => (this.chartCanvas = el)}></canvas>
      </div>
    );
  }
}
