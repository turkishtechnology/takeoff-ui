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
  private buttonUpdateTimeout?: any;
  private nodeWidth = 160;
  private nodeHeight = 90;
  private nodeButtonWidth = 28.5;
  private nodeButtonHeight = 27;
  private nodeButtonX = -this.nodeButtonWidth / 2;
  private childrenMargin = 84;

  private compact = false;

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

      (this.orgChartInstance as any)
        .container(this.orgChartContainerRef)
        .data(flatData)
        .layout('top')
        .initialExpandLevel(Infinity)
        .nodeWidth(() => this.nodeWidth)
        .nodeHeight(() => this.nodeHeight)
        .nodeButtonWidth(() => this.nodeButtonWidth)
        .nodeButtonHeight(() => this.nodeButtonHeight)
        .nodeButtonX(() => this.nodeButtonX)
        .childrenMargin(() => this.childrenMargin)
        .compact(this.compact)
        .nodeContent((d: any) => this.defaultNodeHTML(d))
        .buttonContent(() => this.defaultButtonHTML());

      this.orgChartInstance.onNodeClick((nd: any) => this.tkNodeClick.emit(nd));

      const lb = this.orgChartInstance.layoutBindings();
      lb.top.diagonal = (s: any, t: any) => {
        const x = s.x;
        const y = s.y;

        const ex = t.x;
        const ey = t.y;

        const midY = (y + ey) / 2;

        return `M ${x} ${y} L ${x} ${midY} L ${ex} ${midY} L ${ex} ${ey}`;
      };
      lb.top.buttonY = (n: any) => n.height + this.nodeButtonHeight; // button y position
      lb.top.linkParentY = (n: any) => n.parent.y + n.parent.height + this.nodeButtonHeight + 14; // parent side connection
      this.updateButtonsState();

      this.orgChartInstance.layoutBindings(lb).render();

      this.orgChartInstance.render();
    }
  }

  disconnectedCallback() {
    if (this.orgChartInstance) {
      // No specific destroy method in OrgChart, but clear the reference
      this.orgChartInstance = undefined;
    }

    // Clear any pending timeouts
    if (this.buttonUpdateTimeout) {
      clearTimeout(this.buttonUpdateTimeout);
      this.buttonUpdateTimeout = undefined;
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
    this.updateButtonsState();
  }

  private defaultNodeHTML(d: any) {
    const nameCol = '#222530';
    const titleCol = '#99A0AE';

    return `
      <div style="
      border: 1px solid #E1E4EA;
      border-radius: 8px;
      padding: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      font-family: Geologica, sans-serif";
      >
        <div style="
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4.489px 3.333px 0px 3.667px;
  border: 1px solid white;
  border-radius: 9999px;
  background-color: #E1E4EA;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;">
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="28" viewBox="0 0 26 28" fill="none">
    <path d="M18.8958 18.8634C16.9861 20.2523 15.0763 21.3634 13.1666 21.3634C11.2569 21.3634 9.34714 20.2523 7.43745 18.8634C9.01155 18.3843 9.81016 17.669 9.83329 16.7176C9.83329 16.548 9.83204 16.3072 9.83089 15.855C9.83089 15.7832 9.83072 15.7096 9.83037 15.6344C9.82725 14.4219 9.82214 12.8219 9.81495 11.1969C8.32204 9.26176 8.87047 6.99312 9.33829 7.04968C9.91183 7.11947 14.8809 2.40405 15.834 2.16228C16.7871 1.92051 19.2083 2.70103 19.625 4.87551C20.0416 7.04999 20.2158 12.531 18.6354 14.7193C18.1856 15.342 17.4773 15.5855 16.5104 15.45C16.509 15.9051 16.5063 16.1605 16.5 16.6759C16.5123 17.6706 17.3109 18.3848 18.8958 18.8634Z" fill="url(#paint0_linear)"/>
    <path d="M16.5 15.4485C14.2083 15.1881 12.75 14.1985 12.75 14.1985C12.75 14.1985 14.4167 16.2818 16.5 16.6985V15.4485Z" fill="#FC9F6A"/>
    <path d="M9.05179 11.2296C8.33409 9.50357 5.45804 5.98826 7.93721 3.80076C8.77054 -0.261737 13.3747 0.187951 16.4476 1.12545C18.5129 1.75555 20.0726 3.00045 20.406 2.06295C22.4893 3.80076 21.446 5.50045 20.0726 5.98826C18.8262 6.43097 16.7185 6.87368 13.1345 6.45701C12.4943 6.38253 12.6284 8.34326 12.2863 8.55524C11.773 8.87326 11.3747 6.87368 9.96763 7.47409C8.56054 8.07451 9.39554 10.8585 10.906 10.8585C11.4268 10.8585 11.6872 12.2904 10.281 12.9675C9.26013 13.4692 9.51815 12.3512 9.05179 11.2296Z" fill="url(#paint1_linear)"/>
    <path d="M2.22901 22.043C1.23734 24.0593 0.66651 28.7096 0.66651 28.7096H25.6665C25.6665 28.7096 25.0955 24.0588 24.104 22.043C23.1125 20.0271 17.3228 18.1574 17.3228 18.1574C14.1235 19.4067 12.1657 19.4067 9.01328 18.1567C9.01328 18.1567 3.22068 20.0266 2.22901 22.043Z" fill="#FDF4EE"/>
    <path d="M12.4373 18.8859L11.9165 28.4692H14.4165L13.8957 18.8859C13.8957 18.8859 13.4095 18.365 13.1665 18.365C12.9235 18.365 12.4373 18.8859 12.4373 18.8859Z" fill="#C90019"/>
    <path d="M12.3185 20.8329L13.9565 19.8864L13.8955 18.8858C13.5714 18.5386 13.3283 18.365 13.1663 18.365C13.0043 18.365 12.7613 18.5386 12.4372 18.8858L12.3184 20.8329H12.3185Z" fill="#645050"/>
    <path d="M13.1667 18.3642L14.2083 20.24L17.4375 18.2608L16.5 16.9067L13.1667 18.138L9.83333 16.9067L8.89583 18.2608L12.125 20.24L13.1667 18.3642Z" fill="white"/>
    <defs>
      <linearGradient id="paint0_linear" x1="13.6748" y1="2.12" x2="13.6748" y2="21.3634" gradientUnits="userSpaceOnUse">
        <stop stop-color="#F7B186" />
        <stop offset="1" stop-color="#FFC299" />
      </linearGradient>
      <linearGradient id="paint1_linear" x1="14.2663" y1="0.48877" x2="14.2663" y2="13.0909" gradientUnits="userSpaceOnUse">
        <stop stop-color="#1D0024" />
        <stop offset="1" stop-color="#100014" />
      </linearGradient>
    </defs>
  </svg>
</div>
        <div style="
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      max-width: 90px;"
    
>
          <div style=
          "font-size:14px;
          font-weight:400;
          color:${nameCol};
          line-height:20px;
          white-space: nowrap;
          overflow: hidden;
          display: inline-block;
          max-width: 90px;">
          ${d.data.name ?? ''}
          </div>
          <div style=
          "font-size:11px;
          font-weight:300;
          color:${titleCol};
          line-height:16px;
          white-space: nowrap;
          overflow: hidden;
          display: inline-block;
          max-width: 90px;">
          ${d.data.title ?? ''}
          </div>
        </div>
      </div>`;
  }

  private defaultButtonHTML = () => `
   <div style="
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 6px 4.5px 6px;
  border: 0.75px solid #CACFD8;
  border-radius: 8px;
  background: #FFF;
  box-shadow:
    0px 0px 0px 1.5px #FFF,
    0px 0px 0px 3px #DADEE3;
">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
      <path
        d="M10.4219 5.62507L7.99687 8.05007L5.57187 5.62507C5.32812 5.38132 4.93437 5.38132 4.69062 5.62507C4.44688 5.86882 4.44688 6.26257 4.69062 6.50632L7.55937 9.37507C7.80312 9.61882 8.19687 9.61882 8.44062 9.37507L11.3094 6.50632C11.5531 6.26257 11.5531 5.86882 11.3094 5.62507C11.0656 5.38757 10.6656 5.38132 10.4219 5.62507Z"
        fill="#222530" />
    </svg>
  </div>`;

  private updateButtonsState() {
    const lb = this.orgChartInstance.layoutBindings();
    if (!this.orgChartInstance) return;

    if (this.buttonUpdateTimeout) {
      clearTimeout(this.buttonUpdateTimeout);
    }

    if (!this.collapsible) {
      lb.top.buttonY = (n: any) => n.height + this.nodeButtonHeight; // button y position
      lb.top.linkParentY = (n: any) => n.parent.y + n.parent.height; // parent side connection

      this.orgChartInstance
        .layoutBindings(lb)
        .buttonContent(() => {
          return '';
        })
        .render();
    } else {
      lb.top.buttonY = (n: any) => n.height + this.nodeButtonHeight; // button y position
      lb.top.linkParentY = (n: any) => n.parent.y + n.parent.height + this.nodeButtonHeight + 14; // parent side connection
      lb.top.linkY = (n: any) => n.y - 4; // child side connection

      this.orgChartInstance.layoutBindings(lb).render();

      this.buttonUpdateTimeout = setTimeout(() => {
        if (this.orgChartInstance) {
          this.orgChartInstance
            .buttonContent(({ node }) => {
              if (!node.children && !node._children) return '';
              return this.defaultButtonHTML();
            })
            .render();
        }
      }, 350);
    }
  }

  render() {
    const accessibilityLabel = this.accessibilityLabel || this.options?.title?.text || 'Organization Chart';

    return <div ref={el => (this.orgChartContainerRef = el)} class="tk-org-chart-container" role="img" aria-label={accessibilityLabel} />;
  }
}
