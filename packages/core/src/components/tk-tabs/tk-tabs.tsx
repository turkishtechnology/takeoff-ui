import { Component, h, Prop, State, Element, Event, EventEmitter, ComponentInterface, Watch } from '@stencil/core';
import classNames from 'classnames';
import { IIconOptions } from '../../components';
import { getIconElementProps } from '../../utils/icon-props';

/**
 * TkTabs component description.
 * @react `import { TkTabs, TkTabsItem } from '@takeoff-ui/react'`
 * @vue `import { TkTabs, TkTabsItem } from '@takeoff-ui/vue'`
 * @angular `import { TkTabs, TkTabsItem } from '@takeoff-ui/angular'`
 */
@Component({
  tag: 'tk-tabs',
  styleUrl: 'tk-tabs.scss',
  shadow: true,
})
export class TkTabs implements ComponentInterface {
  @Element() el: HTMLTkTabsElement;

  @State() internalActiveIndex: number = 0;
  @State() internalTabItems: HTMLTkTabsItemElement[] = [];

  /**
   * Sets the alignment of the header.
   */
  @Prop() alignHeaders: 'start' | 'center' | 'end' = 'start';

  /**
   * Controls if the tabs component is controlled.
   * @defaultValue false
   */
  @Prop() controlled: boolean = false;

  /**
   * Default Active Index for tabs component.
   * @defaultValue 0
   */
  @Prop() defaultActiveIndex: number = 0;

  /**
   * Controls the currently active tab index.
   * Can be controlled programmatically from outside.
   * @defaultValue 0
   */
  @Prop({ mutable: true, reflect: true }) activeIndex?: number = 0;
  @Watch('activeIndex')
  activeIndexChanged(newValue: number) {
    if (newValue !== undefined && newValue !== this.internalActiveIndex) {
      if (newValue >= 0 && newValue < this.internalTabItems.length) {
        this.internalActiveIndex = newValue;
        this.activeIndex = newValue;
        this.tkTabChange.emit(this.internalActiveIndex);
      } else {
        this.activeIndex = this.internalActiveIndex;
        console.warn('Invalid tab index provided');
      }
    }
  }

  /**
   * Controls if tabs are closable.
   * @defaultValue false
   */
  @Prop() isClosable?: boolean = false;

  /**
   * Controls if new tabs can be added or not.
   * @defaultValue false
   */
  @Prop() isExtendable?: boolean = false;

  /**
   * Controls the orientation of the tabs component.
   * @defaultValue 'horizontal'
   */
  @Prop() orientation: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * Determines whether the tab headers will spread evenly across the horizontal space.
   * @defaultValue false
   */
  @Prop() spreadHeaders: boolean = false;

  /**
   * Controls the size of the tabs component.
   * @defaultValue 'base'
   */
  @Prop() size: 'large' | 'base' | 'small' | 'xsmall' | 'xxsmall' = 'base';

  /**
   * Controls the tab style of the tabs component.
   * @defaultValue 'basic'
   */
  @Prop() type: 'basic' | 'divided' | 'compact' | 'expanded' = 'basic';

  /**
   * Controls the color variant of the tabs component.
   * @defaultValue 'primary'
   */
  @Prop() variant: 'primary' | 'info' | 'neutral' = 'primary';

  /**
   * The style attribute of container element
   */
  @Prop() containerStyle?: any = null;

  /**
   * The style attribute of headers container element
   */
  @Prop() headerContainerStyle?: any = null;

  /**
   * The style attribute of tabs item element
   */
  @Prop() contentStyle?: any = null;

  /**
   * Triggered when a tab is clicked. Returns the clicked tab index.
   */
  @Event({ eventName: 'tk-tab-click' }) tkTabClick: EventEmitter<number>;

  /**
   * Triggered when the currently open tab changes. Returns the active index.
   */
  @Event({ eventName: 'tk-tab-change' }) tkTabChange: EventEmitter<number>;

  componentWillLoad() {
    this.internalTabItems = Array.from(this.el.querySelectorAll(':scope > tk-tabs-item')) as HTMLTkTabsItemElement[];

    // slot ismini kullanıcının vermesine gerek kalmadan içeride setlenmesi sağlandı
    this.internalTabItems.forEach((tab, index) => {
      tab.setAttribute('slot', `tab-content-${index}`);
    });

    this.internalActiveIndex = this.activeIndex ?? this.defaultActiveIndex;

    this.el.addEventListener('tk-update', this.handleTabUpdate.bind(this));
  }

  disconnectedCallback() {
    this.el.removeEventListener('tk-update', this.handleTabUpdate.bind(this));
  }

  private selectTab(index: number) {
    if (index >= 0 && index < this.internalTabItems.length && !this.internalTabItems[index].disabled) {
      this.internalActiveIndex = index;
      this.activeIndex = index;
      this.tkTabChange.emit(this.internalActiveIndex);
    }
  }

  private closeTab(index: number) {
    this.internalTabItems.splice(index, 1);

    if (this.internalActiveIndex >= index) {
      const newIndex = Math.max(0, this.internalActiveIndex - 1);
      this.selectTab(newIndex);
    }
    this.internalTabItems = [...this.internalTabItems];
  }

  private addTab() {
    const newTabItem = document.createElement('tk-tabs-item');
    const newTabIndex = this.internalTabItems.length;
    newTabItem.setAttribute('label', `Tab label`);
    newTabItem.setAttribute('is-closable', 'true');
    const contentDiv = document.createElement('div');
    newTabItem.slot = `tab-content-${newTabIndex}`;
    contentDiv.innerHTML = `TK TAB CONTENT ${newTabIndex + 1}`;
    newTabItem.appendChild(contentDiv);

    this.el.appendChild(newTabItem);

    this.internalTabItems = [...this.internalTabItems, newTabItem];
    this.internalActiveIndex = newTabIndex;
    this.activeIndex = newTabIndex;
    this.tkTabChange.emit(this.internalActiveIndex);
  }

  /**
   * Handles badge update events from tab items
   */
  private handleTabUpdate(event: CustomEvent) {
    const tab = event.composedPath().find(el => el instanceof HTMLElement && el.tagName.toLowerCase() === 'tk-tabs-item') as HTMLTkTabsItemElement;
    if (tab) {
      const index = Array.from(this.el.querySelectorAll(':scope > tk-tabs-item')).indexOf(tab);
      if (index !== -1 && this.internalTabItems[index]) {
        this.internalTabItems[index].label = event.detail.label;
        this.internalTabItems[index].icon = event.detail.icon;
        this.internalTabItems[index].disabled = event.detail.disabled;
        this.internalTabItems[index].badged = event.detail.badged;
        this.internalTabItems[index].badgeCount = event.detail.badgeCount;
        this.internalTabItems[index].badgeLabel = event.detail.badgeLabel;
        this.internalTabItems[index].tooltipOptions = event.detail.tooltipOptions;
        this.internalTabItems = [...this.internalTabItems];
      }
    }
  }

  private handleTabClick(index: number) {
    if (!this.controlled) {
      this.selectTab(index);
    } else {
      this.tkTabClick.emit(index);
    }
  }

  private renderTabItemIcon(tab: HTMLTkTabsItemElement) {
    if (tab.icon && typeof tab.icon === 'string') {
      return <span class="material-symbols-outlined tk-tabs-item-icon">{tab.icon}</span>;
    } else if (tab.icon && typeof tab.icon === 'object') {
      const icon: IIconOptions = tab.icon;
      return <tk-icon {...getIconElementProps(icon, { class: classNames('tk-tabs-item-icon') })} />;
    }
  }

  private renderTabBadge(tab: HTMLTkTabsItemElement, index: number) {
    if (tab.badged) {
      const badgeCount = tab.badgeCount !== undefined ? tab.badgeCount : tab.badgeLabel;

      return (
        <div class="tk-tabs-item-badge-container">
          <tk-badge count={badgeCount} variant={this.internalActiveIndex === index ? this.variant : 'neutral'} type="filledlight" rounded size="small" />
        </div>
      );
    }
    return null;
  }

  private renderTabTooltip(tab: HTMLTkTabsItemElement) {
    if (tab?.tooltipOptions) {
      if (tab.tooltipOptions.icon) {
        return (
          <tk-tooltip
            header={tab.tooltipOptions.header}
            description={tab.tooltipOptions.description}
            position={tab.tooltipOptions.position || 'bottom'}
            variant={tab.tooltipOptions.variant || 'dark'}
          >
            <tk-icon
              slot="trigger"
              {...(typeof tab.tooltipOptions.icon === 'string' ? { icon: tab.tooltipOptions.icon } : getIconElementProps(tab.tooltipOptions.icon))}
              size={this.size === 'xxsmall' ? 'xsmall' : this.size}
            />
          </tk-tooltip>
        );
      }
      return null;
    }
  }

  render() {
    const rootClasses = classNames('tk-tabs', [`tk-tabs-${this.orientation}`], [`tk-tabs-${this.size}`], [`tk-tabs-${this.type}`], [`tk-tabs-${this.variant}`]);
    const headersClasses = classNames('tab-headers', { spread: this.spreadHeaders });
    const rootProps = {
      class: rootClasses,
      style: this.containerStyle,
    };

    const headersProps = {
      class: headersClasses,
      style: {
        justifyContent: this.alignHeaders,
        ...(this.headerContainerStyle && { ...this.headerContainerStyle }),
      },
    };

    const contentProps = {
      class: 'tab-content',
      style: this.contentStyle,
    };

    return (
      <div {...rootProps}>
        <div {...headersProps}>
          {this.internalTabItems.map((tab, index) => {
            const headerClasses = classNames('tab-header', { 'active': this.internalActiveIndex === index, 'tk-tab-header-disabled': tab.disabled });
            return (
              <div class={headerClasses} onClick={() => this.handleTabClick(index)}>
                {this.renderTabItemIcon(tab)}
                <div class="tk-tabs-item-label-container">
                  <span class="tk-tabs-item-label">{tab.label}</span>
                  {this.renderTabBadge(tab, index)}
                  {this.renderTabTooltip(tab)}
                </div>
                {this.isClosable && (
                  <span
                    class="material-symbols-outlined tk-tabs-item-close-icon"
                    onClick={e => {
                      e.stopPropagation();
                      this.closeTab(index);
                    }}
                  >
                    close
                  </span>
                )}
              </div>
            );
          })}
          {this.isExtendable && <tk-icon {...getIconElementProps('add', { class: classNames('tk-tabs-item-add-icon'), onclick: () => this.addTab() })} />}
        </div>
        <div {...contentProps}>
          {this.internalTabItems.map((_tab, index) => (
            <div class={`tab-panel ${this.internalActiveIndex === index ? 'active' : 'hidden'}`} key={index}>
              {this.internalActiveIndex === index && (
                <div>
                  <slot name={`tab-content-${index}`}></slot>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
