import { Component, h, Element, ComponentInterface, Prop, State } from '@stencil/core';
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
        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  @Prop() options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          usePointStyle: true,
        },
      },
    },
  };

  /**
   * Chart height in pixels
   */
  @Prop() height: number = 600;

  /**
   * Chart width in pixels
   */
  @Prop() width: number = 600;

  @Prop() mode: 'pie' | 'bar' = 'bar';

  componentDidLoad() {
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
        this.chartInstance = new Chart(ctx, {
          type: this.mode,
          data: this.data,
          options: this.options,
        });
      }
    }
  }

  render() {
    return (
      <div class="tk-chart-container" style={{ width: `${this.width}px`, height: `${this.height}px` }}>
        <canvas ref={el => (this.chartCanvas = el)}></canvas>
      </div>
    );
  }
}
