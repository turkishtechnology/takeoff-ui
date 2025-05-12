import { Component, h, Element, Prop, Method, Watch, State, Event, EventEmitter, ComponentInterface } from '@stencil/core';
import { merge } from 'lodash';
import { OrgChart } from 'd3-org-chart';

/**
 * The TkOrgChart component allows users to visualize organizational data using d3-org-chart.
 * @react `import { TkOrgChart } from '@takeoff-ui/react'`
 * @vue `import { TkOrgChart } from '@takeoff-ui/vue'`
 * @angular `import { TkOrgChart } from '@takeoff-ui/angular'`
 */

@Component({
  tag: 'tk-org-chart',
  styleUrl: 'tk-org-chart.scss',
  shadow: false,
})
export class TkOrgChart implements ComponentInterface {
  private orgChartContainerRef?: HTMLDivElement;
  private orgChartInstance?: any;

  @Element() el: HTMLElement;

  @State() internalOptions: any;

  /**
   * Chart data should be an array of node objects with at least id, parentId (optional for root), and name properties.
   */
  @Prop() data!: any[];
  @Watch('data')
  dataChanged() {
    this.updateOrgChart();
  }

  /**
   * Chart options for d3-org-chart customization
   */
  @Prop() options?: any;
  @Watch('options')
  optionsChanged() {
    this.mergeOptions();
    this.updateOrgChart();
  }

  /**
   * Enable or disable expand/collapse buttons functionality
   * When disabled, all nodes will be automatically expanded
   */
  @Prop() collapsible?: boolean = true;
  @Watch('collapsible')
  collapsibleChanged() {
    this.updateButtonsState();
  }

  /**
   * Accessibility label for the chart
   */
  @Prop() accessibilityLabel?: string;

  /**
   * Node click event
   */
  @Event({ eventName: 'tk-node-click' }) tkNodeClick: EventEmitter<any>;

  componentWillLoad() {
    this.mergeOptions();
  }

  componentDidLoad() {
    if (this.orgChartContainerRef) {
      const flatData = this.normaliseData(this.data);

      this.orgChartInstance = new OrgChart();

      const nodeWidth = this.internalOptions.nodeWidth ?? 120;
      const nodeHeight = this.internalOptions.nodeHeight ?? 88;

      (this.orgChartInstance as any)
        .container(this.orgChartContainerRef)
        .data(flatData)
        .layout('top')
        .initialExpandLevel(Infinity)
        .nodeWidth(() => nodeWidth)
        .nodeHeight(() => nodeHeight)
        .nodeButtonWidth(() => 27)
        .nodeButtonHeight(() => 25.5)
        .nodeButtonX(() => -13.5)
        .childrenMargin(() => 84)
        .compact(false);
      if (this.internalOptions.layout !== undefined) this.orgChartInstance.layout(this.internalOptions.layout);
      if (this.internalOptions.compact !== undefined) this.orgChartInstance.compact(this.internalOptions.compact);
      if (this.internalOptions.nodeContent) this.orgChartInstance.nodeContent(this.internalOptions.nodeContent);
      if (this.internalOptions.buttonContent) this.orgChartInstance.buttonContent(this.internalOptions.buttonContent);

      if (!this.internalOptions.nodeContent) {
        this.orgChartInstance.nodeContent((d: any) => this.defaultNodeHTML(d));
      }

      if (!this.internalOptions.buttonContent) {
        this.orgChartInstance.buttonContent(() => this.defaultButtonHTML());
      }

      /* -------------------------------- events -------------------------------- */
      this.orgChartInstance.onNodeClick((nd: any) => this.tkNodeClick.emit(nd));

      this.updateButtonsState();

      const lb = this.orgChartInstance.layoutBindings();
      console.log('nodeHeight', nodeHeight);
      const GAP = 24;
      lb.top.buttonY = n => n.height + GAP; // button y position
      lb.top.linkParentY = n => n.parent.y + n.parent.height + 1.4 * GAP; // parent side

      this.orgChartInstance.layoutBindings(lb).render();

      this.orgChartInstance.render();
    }
  }

  disconnectedCallback() {
    if (this.orgChartInstance) {
      // No specific destroy method in OrgChart, but clear the reference
      this.orgChartInstance = undefined;
    }
  }
  /**
   * Get the chart instance
   */
  @Method()
  async getOrgChart(): Promise<any> {
    return this.orgChartInstance;
  }

  /**
   * Refresh the chart
   */
  @Method()
  async refresh(): Promise<void> {
    this.updateOrgChart();
  }
  /**
   * Add node to organizational chart
   */
  @Method()
  async addNode(node: any): Promise<void> {
    if (this.orgChartInstance) {
      this.orgChartInstance.addNode(node);
    }
  }

  /**
   * Fit chart to screen
   */
  @Method()
  async fit(): Promise<void> {
    if (this.orgChartInstance) {
      this.orgChartInstance.fit();
    }
  }

  private needsNormalising(value: any): boolean {
    if (Array.isArray(value)) {
      if (!value.length) return false;
      const first = value[0];
      return !('id' in first) || !!first?.children;
    }
    return !!value?.children;
  }

  private flattenTree(node: any, parentId: number | null, store: any[], idCounter: { cur: number }) {
    const id = node.id ?? idCounter.cur++;
    store.push({ ...node, id, parentId });
    (node.children ?? []).forEach((c: any) => this.flattenTree(c, id, store, idCounter));
  }

  private normaliseData(src: any): any[] {
    if (!this.needsNormalising(src)) {
      return Array.isArray(src) ? [...src] : [src];
    }
    const out: any[] = [];
    const counter = { cur: 1 };
    (Array.isArray(src) ? src : [src]).forEach((n: any) => this.flattenTree(n, null, out, counter));
    return out;
  }

  private mergeOptions() {
    this.internalOptions = merge({}, {}, this.options);
  }

  private updateOrgChart() {
    if (!this.orgChartInstance) return;
    const flat = this.normaliseData(this.data);
    this.orgChartInstance.data(flat).initialExpandLevel(Infinity).render();
  }

  private defaultNodeHTML(d: any) {
    const border = '#E1E4EA';
    const bg = '#F9FAFC';
    const nameCol = '#222530';
    const titleCol = '#99A0AE';

    return `
      <div style="background:${bg};border:1px solid ${border};border-radius:8px;padding:8px;display:flex;flex-direction:column;align-items:center;font-family:Geologica,sans-serif;width:${d.width}px;height:${d.height}px;box-sizing:border-box;text-align:center;">
        <div style="border-radius:999px;border:1px solid black;display:flex;justify-content:center;align-items:center;">
          <img src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png" style="width:32px;height:32px;" alt="avatar" />
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
          <div style="font-size:16px;font-weight:400;color:${nameCol};line-height:20px;">${d.data.name ?? ''}</div>
          <div style="font-size:11px;font-weight:300;color:${titleCol};line-height:16px;">${d.data.title ?? ''}</div>
        </div>
      </div>`;
  }

  private defaultButtonHTML = () => `
  <div style="
      width:27px;height:25.5px;
      padding: var(--sizes-small-full-padding, 6px) var(--sizes-small-full-padding, 6px) 4.5px var(--sizes-small-full-padding, 6px);
      border-radius:8px;
      border:.75px solid var(--border-sub-base,#CACFD8);
      display:flex;
      align-items:center;
      justify-content:center;               /* centers the icon */
      color:#716E7B;
    ">
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 16 15" fill="none">
      <path d="M10.422 5.625 8 8.05 5.578 5.625
               a.448.448 0 0 0-.633 0 .45.45 0 0 0 0 .633l2.868 2.87
               a.448.448 0 0 0 .633 0l2.868-2.87a.45.45 0 0 0 0-.633
               .448.448 0 0 0-.633 0Z"
            fill="#222530"/>
    </svg>
  </div>`;
  private updateButtonsState() {
    if (!this.orgChartInstance) return;
    this.orgChartInstance
      .buttonContent(({ node }) => {
        if (!this.collapsible || (!node.children && !node._children)) return '';
        return this.defaultButtonHTML();
      })
      .render();
  }

  render() {
    const accessibilityLabel = this.accessibilityLabel || this.options?.title?.text || 'Organization Chart';

    return <div ref={el => (this.orgChartContainerRef = el)} class="tk-org-chart-container" role="img" aria-label={accessibilityLabel} />;
  }
}
