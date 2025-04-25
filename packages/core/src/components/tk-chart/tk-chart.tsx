import { Component, h, Element, Prop, Method, Watch, State, ComponentInterface } from '@stencil/core';
import Chart, { ChartType, ChartData, ChartOptions } from 'chart.js/auto';
import { getDefaultOptionsForType } from './defaults';
import { merge } from 'lodash';

// Define types directly in the component file
export type TkChartStyle = 'basic' | 'divided' | 'light';
export type TkChartVariant = 'basic' | 'lined' | 'railed';

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
  private chartCanvas?: HTMLCanvasElement;
  private chartInstance?: Chart;

  @Element() el: HTMLTkChartElement;

  @State() private internalOptions: any;

  /**
   * The mode (type) of chart to render
   */
  @Prop() mode: ChartType = 'bar';

  /**
   * The chart data
   */
  @Prop() data: ChartData = { datasets: [] };

  /**
   * Chart options
   */
  @Prop() options?: ChartOptions;

  /**
   * Width of the chart container
   */
  @Prop() width?: string = '100%';

  /**
   * Height of the chart container in pixels
   */
  @Prop() height?: number = 300;

  /**
   * Custom plugins to use with chart
   */
  @Prop() plugins?: any[] = [];

  /**
   * Accessibility label for the chart
   */
  @Prop() accessibilityLabel?: string;

  /**
   * Visual style of the chart (affects colors and backgrounds)
   */
  @Prop() chartStyle: TkChartStyle = 'basic';

  /**
   * Variant of the chart (affects grid lines and chart features)
   */
  @Prop() variant: TkChartVariant = 'basic';

  @Watch('data')
  handleDataChange() {
    this.updateChart();
  }

  @Watch('options')
  handleOptionsChange() {
    this.mergeOptions();
    this.updateChart();
  }

  @Watch('mode')
  handleModeChange() {
    this.destroyChart();
    this.mergeOptions();
    this.initChart();
  }

  @Watch('chartStyle')
  @Watch('variant')
  handleStyleChange() {
    this.mergeOptions();
    this.updateChart();
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
    return this.chartCanvas;
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
    // Get type/style/variant-specific default options
    const typeDefaults = getDefaultOptionsForType(this.mode, this.chartStyle, this.variant);

    // Merge with user options
    this.internalOptions = merge({}, typeDefaults, this.options);
    // Bu kullanım nested objectlerde sorun çıkarıyor.
    //this.internalOptions = {...this.internalOptions, ...typeDefaults}
    console.log('Internal options:', this.internalOptions);
  }

  private initChart() {
    if (this.chartCanvas) {
      const ctx = this.chartCanvas.getContext('2d');
      if (ctx) {
        this.chartInstance = new Chart(ctx, {
          type: this.mode,
          data: this.data,
          options: this.internalOptions,
          plugins: this.plugins,
        });

        // Log created chart
        console.log('Chart instance created:', this.chartInstance);
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
        class={`tk-chart-container tk-chart-${this.chartStyle} tk-chart-${this.variant}`}
        style={{
          width: this.width,
          height: `${this.height}px`,
        }}
      >
        <canvas ref={el => (this.chartCanvas = el)} role="img" aria-label={accessibilityLabel}></canvas>
      </div>
    );
  }
}
