import { Component, h, Element, Prop, Method, Watch, State, ComponentInterface } from '@stencil/core';
import Chart, { ChartType, ChartOptions } from 'chart.js/auto';
import { getDefaultOptionsForType } from './defaults';
import { merge } from 'lodash';
import classNames from 'classnames';

/**
 * The TkChart component allows users to visualize data in various chart formats using Chart.js.
 * @react `import { TkChart } from '@takeoff-ui/react'`
 * @vue `import { TkChart } from '@takeoff-ui/vue'`
 * @angular `import { TkChart } from '@takeoff-ui/angular'`
 */

@Component({
  tag: 'tk-chart',
  styleUrl: 'tk-chart.scss',
  shadow: false,
})
export class TkChart implements ComponentInterface {
  private chartRef?: HTMLCanvasElement;
  private chartInstance?: Chart;

  @Element() el: HTMLTkChartElement;

  @State() private internalOptions: any;

  /**
   * The type of chart to render
   */
  @Prop() type: ChartType = 'bar';

  /**
   * The chart data
   */
  @Prop() data: any;

  /**
   * Chart options
   */
  @Prop() options?: ChartOptions;

  /**
   * Width of the chart container
   */
  @Prop() width?: string = null;

  /**
   * Height of the chart container in pixels
   */
  @Prop() height?: number = null;

  /**
   * Custom plugins to use with chart
   */
  @Prop() plugins?: any[] = [];

  /**
   * Accessibility label for the chart
   */
  @Prop() accessibilityLabel?: string;

  @Watch('data')
  handleDataChange() {
    this.updateChart();
  }

  @Watch('options')
  handleOptionsChange() {
    this.mergeOptions();
    this.updateChart();
  }

  @Watch('type')
  handleTypeChange() {
    this.destroyChart();
    this.mergeOptions();
    this.initChart();
  }

  componentWillLoad() {
    this.mergeOptions();
  }

  componentDidLoad() {
    this.initChart();
  }

  disconnectedCallback() {
    this.destroyChart();
  }

  /**
   * Get the chart instance
   */
  @Method()
  async getChart(): Promise<any> {
    return this.chartInstance;
  }

  /**
   * Get the canvas element
   */
  @Method()
  async getCanvas(): Promise<HTMLCanvasElement | undefined> {
    return this.chartRef;
  }

  /**
   * Get base64 image of the chart
   */
  @Method()
  async getBase64Image(): Promise<string | undefined> {
    return this.chartInstance?.toBase64Image();
  }

  /**
   * Refresh the chart
   */
  @Method()
  async refresh(): Promise<void> {
    if (this.chartInstance) {
      this.chartInstance.update();
    }
  }

  private mergeOptions() {
    const typeDefaults = getDefaultOptionsForType(this.type);
    // Merge with user options
    this.internalOptions = merge({}, typeDefaults, this.options);
  }

  private initChart() {
    if (this.chartRef) {
      const ctx = this.chartRef.getContext('2d');
      if (ctx) {
        this.chartInstance = new Chart(ctx, {
          type: this.type,
          data: this.data,
          options: this.internalOptions,
          plugins: this.plugins,
        });
      }
    }
  }

  private updateChart() {
    if (this.chartInstance) {
      // Don't directly assign to type as it's not supported
      this.chartInstance.data = this.data;
      this.chartInstance.options = this.internalOptions;
      this.chartInstance.update();
    }
  }

  private destroyChart() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = undefined;
    }
  }

  render() {
    const title = this.options?.plugins?.title?.text;
    const accessibilityLabel = this.accessibilityLabel || title || 'Chart';

    return (
      <div
        class={classNames('tk-chart-container', `tk-chart-${this.type}`)}
        style={{
          width: this.width,
          height: `${this.height}px`,
        }}
      >
        <canvas ref={el => (this.chartRef = el)} role="img" aria-label={accessibilityLabel}></canvas>
      </div>
    );
  }
}
