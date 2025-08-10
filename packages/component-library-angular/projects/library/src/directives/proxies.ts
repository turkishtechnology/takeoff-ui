/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, NgZone } from '@angular/core';

import { ProxyCmp } from './angular-component-lib/utils';

import type { Components } from '@takeoff-ui/core/components';

import { defineCustomElement as defineTkAccordion } from '@takeoff-ui/core/components/tk-accordion.js';
import { defineCustomElement as defineTkAccordionItem } from '@takeoff-ui/core/components/tk-accordion-item.js';
import { defineCustomElement as defineTkAlert } from '@takeoff-ui/core/components/tk-alert.js';
import { defineCustomElement as defineTkAvatar } from '@takeoff-ui/core/components/tk-avatar.js';
import { defineCustomElement as defineTkAvatarGroup } from '@takeoff-ui/core/components/tk-avatar-group.js';
import { defineCustomElement as defineTkBadge } from '@takeoff-ui/core/components/tk-badge.js';
import { defineCustomElement as defineTkBreadcrumb } from '@takeoff-ui/core/components/tk-breadcrumb.js';
import { defineCustomElement as defineTkBreadcrumbItem } from '@takeoff-ui/core/components/tk-breadcrumb-item.js';
import { defineCustomElement as defineTkButton } from '@takeoff-ui/core/components/tk-button.js';
import { defineCustomElement as defineTkCard } from '@takeoff-ui/core/components/tk-card.js';
import { defineCustomElement as defineTkChart } from '@takeoff-ui/core/components/tk-chart.js';
import { defineCustomElement as defineTkCheckbox } from '@takeoff-ui/core/components/tk-checkbox.js';
import { defineCustomElement as defineTkChips } from '@takeoff-ui/core/components/tk-chips.js';
import { defineCustomElement as defineTkCurrencyInput } from '@takeoff-ui/core/components/tk-currency-input.js';
import { defineCustomElement as defineTkDatepicker } from '@takeoff-ui/core/components/tk-datepicker.js';
import { defineCustomElement as defineTkDialog } from '@takeoff-ui/core/components/tk-dialog.js';
import { defineCustomElement as defineTkDivider } from '@takeoff-ui/core/components/tk-divider.js';
import { defineCustomElement as defineTkDrawer } from '@takeoff-ui/core/components/tk-drawer.js';
import { defineCustomElement as defineTkDropdown } from '@takeoff-ui/core/components/tk-dropdown.js';
import { defineCustomElement as defineTkEditor } from '@takeoff-ui/core/components/tk-editor.js';
import { defineCustomElement as defineTkIcon } from '@takeoff-ui/core/components/tk-icon.js';
import { defineCustomElement as defineTkInput } from '@takeoff-ui/core/components/tk-input.js';
import { defineCustomElement as defineTkOrgChart } from '@takeoff-ui/core/components/tk-org-chart.js';
import { defineCustomElement as defineTkPagination } from '@takeoff-ui/core/components/tk-pagination.js';
import { defineCustomElement as defineTkPhoneInput } from '@takeoff-ui/core/components/tk-phone-input.js';
import { defineCustomElement as defineTkPopover } from '@takeoff-ui/core/components/tk-popover.js';
import { defineCustomElement as defineTkRadio } from '@takeoff-ui/core/components/tk-radio.js';
import { defineCustomElement as defineTkRadioGroup } from '@takeoff-ui/core/components/tk-radio-group.js';
import { defineCustomElement as defineTkRating } from '@takeoff-ui/core/components/tk-rating.js';
import { defineCustomElement as defineTkSelect } from '@takeoff-ui/core/components/tk-select.js';
import { defineCustomElement as defineTkSlider } from '@takeoff-ui/core/components/tk-slider.js';
import { defineCustomElement as defineTkSpinner } from '@takeoff-ui/core/components/tk-spinner.js';
import { defineCustomElement as defineTkStep } from '@takeoff-ui/core/components/tk-step.js';
import { defineCustomElement as defineTkStepper } from '@takeoff-ui/core/components/tk-stepper.js';
import { defineCustomElement as defineTkTable } from '@takeoff-ui/core/components/tk-table.js';
import { defineCustomElement as defineTkTabs } from '@takeoff-ui/core/components/tk-tabs.js';
import { defineCustomElement as defineTkTabsItem } from '@takeoff-ui/core/components/tk-tabs-item.js';
import { defineCustomElement as defineTkTextarea } from '@takeoff-ui/core/components/tk-textarea.js';
import { defineCustomElement as defineTkTimeline } from '@takeoff-ui/core/components/tk-timeline.js';
import { defineCustomElement as defineTkTimelineItem } from '@takeoff-ui/core/components/tk-timeline-item.js';
import { defineCustomElement as defineTkToggle } from '@takeoff-ui/core/components/tk-toggle.js';
import { defineCustomElement as defineTkToggleButton } from '@takeoff-ui/core/components/tk-toggle-button.js';
import { defineCustomElement as defineTkToggleButtonGroup } from '@takeoff-ui/core/components/tk-toggle-button-group.js';
import { defineCustomElement as defineTkTooltip } from '@takeoff-ui/core/components/tk-tooltip.js';
import { defineCustomElement as defineTkTreeView } from '@takeoff-ui/core/components/tk-tree-view.js';
import { defineCustomElement as defineTkUpload } from '@takeoff-ui/core/components/tk-upload.js';
@ProxyCmp({
  defineCustomElementFn: defineTkAccordion,
  inputs: ['activeIndex', 'allowMultiple', 'arrowPosition', 'collapseIcon', 'expandIcon', 'hideArrows', 'type'],
})
@Component({
  selector: 'tk-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['activeIndex', 'allowMultiple', 'arrowPosition', 'collapseIcon', 'expandIcon', 'hideArrows', 'type'],
  outputs: ['tkAccordionItemSelected'],
})
export class TkAccordion {
  protected el: HTMLTkAccordionElement;
  @Output() tkAccordionItemSelected = new EventEmitter<CustomEvent<ITkAccordionIAccordionItemSelect>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import type { IAccordionItemSelect as ITkAccordionIAccordionItemSelect } from '@takeoff-ui/core/components';

export declare interface TkAccordion extends Components.TkAccordion {
  /**
   * Emitted when an accordion item is selected
   */
  tkAccordionItemSelected: EventEmitter<CustomEvent<ITkAccordionIAccordionItemSelect>>;
}

@ProxyCmp({
  defineCustomElementFn: defineTkAccordionItem,
  inputs: ['active', 'header', 'icon', 'itemKey', 'size', 'toggleItem'],
})
@Component({
  selector: 'tk-accordion-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['active', 'header', 'icon', 'itemKey', 'size', 'toggleItem'],
})
export class TkAccordionItem {
  protected el: HTMLTkAccordionItemElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkAccordionItem extends Components.TkAccordionItem {}

@ProxyCmp({
  defineCustomElementFn: defineTkAlert,
  inputs: ['alignItems', 'header', 'icon', 'iconSize', 'message', 'removable', 'type', 'variant'],
})
@Component({
  selector: 'tk-alert',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['alignItems', 'header', 'icon', 'iconSize', 'message', 'removable', 'type', 'variant'],
})
export class TkAlert {
  protected el: HTMLTkAlertElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkAlert extends Components.TkAlert {}

@ProxyCmp({
  defineCustomElementFn: defineTkAvatar,
  inputs: ['ariaLabelledby', 'background', 'badge', 'badgeStatus', 'image', 'label', 'name', 'rounded', 'size', 'variant'],
})
@Component({
  selector: 'tk-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['ariaLabelledby', 'background', 'badge', 'badgeStatus', 'image', 'label', 'name', 'rounded', 'size', 'variant'],
})
export class TkAvatar {
  protected el: HTMLTkAvatarElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkAvatar extends Components.TkAvatar {}

@ProxyCmp({
  defineCustomElementFn: defineTkAvatarGroup,
  inputs: ['compact'],
})
@Component({
  selector: 'tk-avatar-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['compact'],
})
export class TkAvatarGroup {
  protected el: HTMLTkAvatarGroupElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkAvatarGroup extends Components.TkAvatarGroup {}

@ProxyCmp({
  defineCustomElementFn: defineTkBadge,
  inputs: ['count', 'dot', 'icon', 'iconPosition', 'label', 'rounded', 'size', 'type', 'variant'],
})
@Component({
  selector: 'tk-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['count', 'dot', 'icon', 'iconPosition', 'label', 'rounded', 'size', 'type', 'variant'],
})
export class TkBadge {
  protected el: HTMLTkBadgeElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkBadge extends Components.TkBadge {}

@ProxyCmp({
  defineCustomElementFn: defineTkBreadcrumb,
  inputs: ['model', 'separator', 'separatorIcon', 'type'],
})
@Component({
  selector: 'tk-breadcrumb',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['model', 'separator', 'separatorIcon', 'type'],
})
export class TkBreadcrumb {
  protected el: HTMLTkBreadcrumbElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkBreadcrumb extends Components.TkBreadcrumb {}

@ProxyCmp({
  defineCustomElementFn: defineTkBreadcrumbItem,
  inputs: ['href', 'icon', 'isCurrent', 'isExternal', 'label'],
})
@Component({
  selector: 'tk-breadcrumb-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['href', 'icon', 'isCurrent', 'isExternal', 'label'],
})
export class TkBreadcrumbItem {
  protected el: HTMLTkBreadcrumbItemElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkBreadcrumbItem extends Components.TkBreadcrumbItem {}

@ProxyCmp({
  defineCustomElementFn: defineTkButton,
  inputs: ['disabled', 'fullWidth', 'href', 'icon', 'iconPosition', 'label', 'loading', 'mode', 'rounded', 'size', 'target', 'type', 'underline', 'variant'],
})
@Component({
  selector: 'tk-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'fullWidth', 'href', 'icon', 'iconPosition', 'label', 'loading', 'mode', 'rounded', 'size', 'target', 'type', 'underline', 'variant'],
  outputs: ['tk-click'],
})
export class TkButton {
  protected el: HTMLTkButtonElement;
  @Output() tkClick = new EventEmitter<CustomEvent<MouseEvent>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkButton extends Components.TkButton {
  /**
   * Emitted when the button click.
   */
  'tk-click': EventEmitter<CustomEvent<MouseEvent>>;
}

@ProxyCmp({
  defineCustomElementFn: defineTkCard,
  inputs: [
    'avatarProps',
    'containerStyle',
    'contentStyle',
    'enableHoverShadow',
    'footerType',
    'header',
    'headerPosition',
    'headerType',
    'hideHeader',
    'horizontal',
    'image',
    'imageOptions',
    'showAvatar',
    'showMenuButton',
    'subheader',
  ],
})
@Component({
  selector: 'tk-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'avatarProps',
    'containerStyle',
    'contentStyle',
    'enableHoverShadow',
    'footerType',
    'header',
    'headerPosition',
    'headerType',
    'hideHeader',
    'horizontal',
    'image',
    'imageOptions',
    'showAvatar',
    'showMenuButton',
    'subheader',
  ],
})
export class TkCard {
  protected el: HTMLTkCardElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkCard extends Components.TkCard {}

@ProxyCmp({
  defineCustomElementFn: defineTkChart,
  inputs: ['accessibilityLabel', 'data', 'height', 'options', 'plugins', 'type', 'width'],
  methods: ['getChart', 'getCanvas', 'getBase64Image', 'refresh'],
})
@Component({
  selector: 'tk-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['accessibilityLabel', 'data', 'height', 'options', 'plugins', 'type', 'width'],
})
export class TkChart {
  protected el: HTMLTkChartElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkChart extends Components.TkChart {}

@ProxyCmp({
  defineCustomElementFn: defineTkCheckbox,
  inputs: ['description', 'disabled', 'indeterminate', 'invalid', 'label', 'name', 'type', 'value'],
})
@Component({
  selector: 'tk-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['description', 'disabled', 'indeterminate', 'invalid', 'label', 'name', 'type', 'value'],
  outputs: ['tk-change'],
})
export class TkCheckbox {
  protected el: HTMLTkCheckboxElement;
  @Output() tkChange = new EventEmitter<CustomEvent<boolean>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkCheckbox extends Components.TkCheckbox {
  /**
   * Emitted when the checkbox checked state changes.
   */
  'tk-change': EventEmitter<CustomEvent<boolean>>;
}

@ProxyCmp({
  defineCustomElementFn: defineTkChips,
  inputs: ['autoSelfDestroy', 'disabled', 'icon', 'label', 'removable', 'size', 'type', 'value', 'variant'],
})
@Component({
  selector: 'tk-chips',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autoSelfDestroy', 'disabled', 'icon', 'label', 'removable', 'size', 'type', 'value', 'variant'],
  outputs: ['tk-remove'],
})
export class TkChips {
  protected el: HTMLTkChipsElement;
  @Output() tkRemove = new EventEmitter<CustomEvent<any>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkChips extends Components.TkChips {
  /**
   * When an element is deleted, it is triggered. It returns the label.
   */
  'tk-remove': EventEmitter<CustomEvent<any>>;
}

@ProxyCmp({
  defineCustomElementFn: defineTkCurrencyInput,
  inputs: [
    'allowNegative',
    'currencyList',
    'decimalSeparator',
    'defaultCurrency',
    'disabled',
    'error',
    'hint',
    'invalid',
    'label',
    'name',
    'placeholder',
    'precision',
    'readonly',
    'showAsterisk',
    'size',
    'thousandsSeparator',
    'value',
  ],
})
@Component({
  selector: 'tk-currency-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'allowNegative',
    'currencyList',
    'decimalSeparator',
    'defaultCurrency',
    'disabled',
    'error',
    'hint',
    'invalid',
    'label',
    'name',
    'placeholder',
    'precision',
    'readonly',
    'showAsterisk',
    'size',
    'thousandsSeparator',
    'value',
  ],
  outputs: ['tk-change', 'tkBlur', 'tkFocus'],
})
export class TkCurrencyInput {
  protected el: HTMLTkCurrencyInputElement;
  @Output() tkChange = new EventEmitter<CustomEvent<any>>();
  @Output() tkBlur = new EventEmitter<CustomEvent<void>>();
  @Output() tkFocus = new EventEmitter<CustomEvent<void>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkCurrencyInput extends Components.TkCurrencyInput {
  /**
   * Emitted when the value has changed.
   */
  'tk-change': EventEmitter<CustomEvent<any>>;
  /**
   * Emitted when the input loses focus.
   */
  'tkBlur': EventEmitter<CustomEvent<void>>;
  /**
   * Emitted when the input has focus.
   */
  'tkFocus': EventEmitter<CustomEvent<void>>;
}

@ProxyCmp({
  defineCustomElementFn: defineTkDatepicker,
  inputs: [
    'allowedDates',
    'clearable',
    'dateFormat',
    'disableMask',
    'disabled',
    'disabledDates',
    'disabledWeekDays',
    'error',
    'firstDayOfWeekIndex',
    'footerType',
    'headerType',
    'hint',
    'hourStep',
    'icon',
    'iconPosition',
    'inline',
    'invalid',
    'label',
    'locale',
    'maxDate',
    'maxTime',
    'minDate',
    'minTime',
    'minuteStep',
    'mode',
    'name',
    'placeholder',
    'showAsterisk',
    'showTimePicker',
    'size',
    'timeFormat',
    'value',
  ],
  methods: ['setToday', 'closePanel'],
})
@Component({
  selector: 'tk-datepicker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'allowedDates',
    'clearable',
    'dateFormat',
    'disableMask',
    'disabled',
    'disabledDates',
    'disabledWeekDays',
    'error',
    'firstDayOfWeekIndex',
    'footerType',
    'headerType',
    'hint',
    'hourStep',
    'icon',
    'iconPosition',
    'inline',
    'invalid',
    'label',
    'locale',
    'maxDate',
    'maxTime',
    'minDate',
    'minTime',
    'minuteStep',
    'mode',
    'name',
    'placeholder',
    'showAsterisk',
    'showTimePicker',
    'size',
    'timeFormat',
    'value',
  ],
  outputs: ['tk-input-change', 'tk-change'],
})
export class TkDatepicker {
  protected el: HTMLTkDatepickerElement;
  @Output() tkInputChange = new EventEmitter<CustomEvent<string>>();
  @Output() tkChange = new EventEmitter<CustomEvent<ITkDatepickerIDateSelection | string>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import type { IDateSelection as ITkDatepickerIDateSelection } from '@takeoff-ui/core/components';

export declare interface TkDatepicker extends Components.TkDatepicker {
  /**
   * Emitted on input value changes
   */
  'tk-input-change': EventEmitter<CustomEvent<string>>;
  /**
   * Emitted on date selection changes
   */
  'tk-change': EventEmitter<CustomEvent<ITkDatepickerIDateSelection | string>>;
}

@ProxyCmp({
  defineCustomElementFn: defineTkDialog,
  inputs: [
    'containerStyle',
    'header',
    'headerType',
    'hideBackdrop',
    'isMaskBlur',
    'maskVariant',
    'preventDismiss',
    'showCloseButton',
    'showHeader',
    'showVariantSign',
    'subheader',
    'variant',
    'visible',
  ],
  methods: ['open', 'close'],
})
@Component({
  selector: 'tk-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'containerStyle',
    'header',
    'headerType',
    'hideBackdrop',
    'isMaskBlur',
    'maskVariant',
    'preventDismiss',
    'showCloseButton',
    'showHeader',
    'showVariantSign',
    'subheader',
    'variant',
    'visible',
  ],
  outputs: ['tk-close', 'tk-open', 'tk-visible-change'],
})
export class TkDialog {
  protected el: HTMLTkDialogElement;
  @Output() tkClose = new EventEmitter<CustomEvent<void>>();
  @Output() tkOpen = new EventEmitter<CustomEvent<void>>();
  @Output() tkVisibleChange = new EventEmitter<CustomEvent<boolean>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkDialog extends Components.TkDialog {
  /**
   * Event emitted when the dialog is closed
   */
  'tk-close': EventEmitter<CustomEvent<void>>;
  /**
   * Event emitted when the dialog is opened
   */
  'tk-open': EventEmitter<CustomEvent<void>>;
  /**
   * Event emitted when the dialog visibility changes
   */
  'tk-visible-change': EventEmitter<CustomEvent<boolean>>;
}

@ProxyCmp({
  defineCustomElementFn: defineTkDivider,
  inputs: ['mx', 'my', 'orientation'],
})
@Component({
  selector: 'tk-divider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['mx', 'my', 'orientation'],
})
export class TkDivider {
  protected el: HTMLTkDividerElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkDivider extends Components.TkDivider {}

@ProxyCmp({
  defineCustomElementFn: defineTkDrawer,
  inputs: ['containerStyle', 'footerType', 'header', 'headerType', 'hideBackdrop', 'hideCloseIcon', 'maskVariant', 'open', 'position', 'preventDismiss', 'unblockScroll'],
  methods: ['show', 'close'],
})
@Component({
  selector: 'tk-drawer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['containerStyle', 'footerType', 'header', 'headerType', 'hideBackdrop', 'hideCloseIcon', 'maskVariant', 'open', 'position', 'preventDismiss', 'unblockScroll'],
  outputs: ['tk-drawer-close', 'tk-drawer-open', 'tk-drawer-enter', 'tk-drawer-leave', 'tk-drawer-change'],
})
export class TkDrawer {
  protected el: HTMLTkDrawerElement;
  @Output() tkDrawerClose = new EventEmitter<CustomEvent<void>>();
  @Output() tkDrawerOpen = new EventEmitter<CustomEvent<void>>();
  @Output() tkDrawerEnter = new EventEmitter<CustomEvent<void>>();
  @Output() tkDrawerLeave = new EventEmitter<CustomEvent<void>>();
  @Output() tkDrawerChange = new EventEmitter<CustomEvent<boolean>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkDrawer extends Components.TkDrawer {
  /**
   * Emitted when the drawer is closed
   */
  'tk-drawer-close': EventEmitter<CustomEvent<void>>;
  /**
   * Emitted when the drawer is opened
   */
  'tk-drawer-open': EventEmitter<CustomEvent<void>>;
  /**
   * Emitted when the drawer starts to enter
   */
  'tk-drawer-enter': EventEmitter<CustomEvent<void>>;
  /**
   * Emitted when the drawer starts to leave
   */
  'tk-drawer-leave': EventEmitter<CustomEvent<void>>;
  /**
   * Emitted when the drawer's open state changes
   */
  'tk-drawer-change': EventEmitter<CustomEvent<boolean>>;
}

@ProxyCmp({
  defineCustomElementFn: defineTkDropdown,
  inputs: ['disabled', 'emptyMessage', 'groupNameKey', 'groupOptionsKey', 'optionHtml', 'optionLabelKey', 'optionValueKey', 'options', 'optionsAlign', 'position'],
})
@Component({
  selector: 'tk-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'emptyMessage', 'groupNameKey', 'groupOptionsKey', 'optionHtml', 'optionLabelKey', 'optionValueKey', 'options', 'optionsAlign', 'position'],
  outputs: ['tk-item-click'],
})
export class TkDropdown {
  protected el: HTMLTkDropdownElement;
  @Output() tkItemClick = new EventEmitter<CustomEvent<any>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkDropdown extends Components.TkDropdown {
  /**
   * Emitted when the value has changed.
   */
  'tk-item-click': EventEmitter<CustomEvent<any>>;
}

@ProxyCmp({
  defineCustomElementFn: defineTkEditor,
  inputs: [
    'contentStyle',
    'customToolbarButtons',
    'disabled',
    'error',
    'extensions',
    'hideToolbar',
    'hint',
    'invalid',
    'label',
    'placeholder',
    'readonly',
    'showAsterisk',
    'toolbar',
    'value',
  ],
  methods: ['getContent', 'setContent', 'getEditor'],
})
@Component({
  selector: 'tk-editor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'contentStyle',
    'customToolbarButtons',
    'disabled',
    'error',
    'extensions',
    'hideToolbar',
    'hint',
    'invalid',
    'label',
    'placeholder',
    'readonly',
    'showAsterisk',
    'toolbar',
    'value',
  ],
  outputs: ['tk-change', 'tkFocus', 'tkBlur'],
})
export class TkEditor {
  protected el: HTMLTkEditorElement;
  @Output() tkChange = new EventEmitter<CustomEvent<string>>();
  @Output() tkFocus = new EventEmitter<CustomEvent<void>>();
  @Output() tkBlur = new EventEmitter<CustomEvent<void>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkEditor extends Components.TkEditor {
  /**
   * Emitted when editor content changes
   */
  'tk-change': EventEmitter<CustomEvent<string>>;
  /**
   * Emitted when editor gets focus
   */
  'tkFocus': EventEmitter<CustomEvent<void>>;
  /**
   * Emitted when editor loses focus
   */
  'tkBlur': EventEmitter<CustomEvent<void>>;
}

@ProxyCmp({
  defineCustomElementFn: defineTkIcon,
  inputs: ['backgroundColor', 'borderColor', 'color', 'fill', 'icon', 'iconColor', 'iconTag', 'iconType', 'sign', 'size', 'variant'],
})
@Component({
  selector: 'tk-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['backgroundColor', 'borderColor', 'color', 'fill', 'icon', 'iconColor', 'iconTag', 'iconType', 'sign', 'size', 'variant'],
})
export class TkIcon {
  protected el: HTMLTkIconElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkIcon extends Components.TkIcon {}

@ProxyCmp({
  defineCustomElementFn: defineTkInput,
  inputs: [
    'chipLabelKey',
    'chipOptions',
    'clearable',
    'disabled',
    'error',
    'hint',
    'icon',
    'iconPosition',
    'invalid',
    'label',
    'maskOptions',
    'max',
    'min',
    'mode',
    'name',
    'placeholder',
    'pre',
    'readonly',
    'showAsterisk',
    'showSafetyStatus',
    'size',
    'step',
    'value',
  ],
  methods: ['setFocus'],
})
@Component({
  selector: 'tk-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'chipLabelKey',
    'chipOptions',
    'clearable',
    'disabled',
    'error',
    'hint',
    'icon',
    'iconPosition',
    'invalid',
    'label',
    'maskOptions',
    'max',
    'min',
    'mode',
    'name',
    'placeholder',
    'pre',
    'readonly',
    'showAsterisk',
    'showSafetyStatus',
    'size',
    'step',
    'value',
  ],
  outputs: ['tk-change', 'tk-blur', 'tk-focus', 'tk-clear-click'],
})
export class TkInput {
  protected el: HTMLTkInputElement;
  @Output() tkChange = new EventEmitter<CustomEvent<any>>();
  @Output() tkBlur = new EventEmitter<CustomEvent<void>>();
  @Output() tkFocus = new EventEmitter<CustomEvent<void>>();
  @Output() tkClearClick = new EventEmitter<CustomEvent<void>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkInput extends Components.TkInput {
  /**
   * Emitted when the value has changed.
   */
  'tk-change': EventEmitter<CustomEvent<any>>;
  /**
   * Emitted when the input loses focus.
   */
  'tk-blur': EventEmitter<CustomEvent<void>>;
  /**
   * Emitted when the input has focus.
   */
  'tk-focus': EventEmitter<CustomEvent<void>>;
  /**
   * Emitted when the clear button has click.
   */
  'tk-clear-click': EventEmitter<CustomEvent<void>>;
}

@ProxyCmp({
  defineCustomElementFn: defineTkOrgChart,
  inputs: ['accessibilityLabel', 'collapsible', 'data', 'options'],
  methods: ['getOrgChart', 'refresh', 'addNode', 'fit'],
})
@Component({
  selector: 'tk-org-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['accessibilityLabel', 'collapsible', { name: 'data', required: true }, 'options'],
  outputs: ['tk-node-click'],
})
export class TkOrgChart {
  protected el: HTMLTkOrgChartElement;
  @Output() tkNodeClick = new EventEmitter<CustomEvent<any>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkOrgChart extends Components.TkOrgChart {
  /**
   * Node click event
   */
  'tk-node-click': EventEmitter<CustomEvent<any>>;
}

@ProxyCmp({
  defineCustomElementFn: defineTkPagination,
  inputs: ['currentPage', 'mode', 'rounded', 'rowsPerPage', 'rowsPerPageOptions', 'totalItems', 'type'],
})
@Component({
  selector: 'tk-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['currentPage', 'mode', 'rounded', 'rowsPerPage', 'rowsPerPageOptions', 'totalItems', 'type'],
  outputs: ['tk-next-page', 'tk-page-change', 'tk-prev-page', 'tk-rows-per-page-change'],
})
export class TkPagination {
  protected el: HTMLTkPaginationElement;
  @Output() tkNextPage = new EventEmitter<CustomEvent<{ page: number }>>();
  @Output() tkPageChange = new EventEmitter<CustomEvent<{ page: number; totalPages: number; startItem: number; endItem: number }>>();
  @Output() tkPrevPage = new EventEmitter<CustomEvent<{ page: number }>>();
  @Output() tkRowsPerPageChange = new EventEmitter<CustomEvent<number>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkPagination extends Components.TkPagination {
  /**
   * Pagination next button click event
   */
  'tk-next-page': EventEmitter<CustomEvent<{ page: number }>>;
  /**
   * Pagination page change event
   */
  'tk-page-change': EventEmitter<CustomEvent<{ page: number; totalPages: number; startItem: number; endItem: number }>>;
  /**
   * Pagination prev button click event
   */
  'tk-prev-page': EventEmitter<CustomEvent<{ page: number }>>;
  /**
   * RowsPerPage change event
   */
  'tk-rows-per-page-change': EventEmitter<CustomEvent<number>>;
}

@ProxyCmp({
  defineCustomElementFn: defineTkPhoneInput,
  inputs: ['countryList', 'defaultCountry', 'disabled', 'error', 'hint', 'invalid', 'label', 'placeholder', 'readonly', 'showAsterisk', 'size', 'value'],
})
@Component({
  selector: 'tk-phone-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['countryList', 'defaultCountry', 'disabled', 'error', 'hint', 'invalid', 'label', 'placeholder', 'readonly', 'showAsterisk', 'size', 'value'],
  outputs: ['tk-change', 'tk-blur', 'tk-focus'],
})
export class TkPhoneInput {
  protected el: HTMLTkPhoneInputElement;
  @Output() tkChange = new EventEmitter<CustomEvent<any>>();
  @Output() tkBlur = new EventEmitter<CustomEvent<void>>();
  @Output() tkFocus = new EventEmitter<CustomEvent<void>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkPhoneInput extends Components.TkPhoneInput {
  /**
   * Emitted when the value has changed.
   */
  'tk-change': EventEmitter<CustomEvent<any>>;
  /**
   * Emitted when the input loses focus.
   */
  'tk-blur': EventEmitter<CustomEvent<void>>;
  /**
   * Emitted when the input has focus.
   */
  'tk-focus': EventEmitter<CustomEvent<void>>;
}

@ProxyCmp({
  defineCustomElementFn: defineTkPopover,
  inputs: ['containerStyle', 'position', 'trigger', 'type'],
  methods: ['close'],
})
@Component({
  selector: 'tk-popover',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['containerStyle', 'position', 'trigger', 'type'],
})
export class TkPopover {
  protected el: HTMLTkPopoverElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkPopover extends Components.TkPopover {}

@ProxyCmp({
  defineCustomElementFn: defineTkRadio,
  inputs: ['checked', 'description', 'disabled', 'invalid', 'label', 'name', 'position', 'value'],
})
@Component({
  selector: 'tk-radio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checked', 'description', 'disabled', 'invalid', 'label', 'name', 'position', 'value'],
  outputs: ['tk-change'],
})
export class TkRadio {
  protected el: HTMLTkRadioElement;
  @Output() tkChange = new EventEmitter<CustomEvent<any>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkRadio extends Components.TkRadio {
  /**
   * Emitted when the radio button's checked state changes.
   */
  'tk-change': EventEmitter<CustomEvent<any>>;
}

@ProxyCmp({
  defineCustomElementFn: defineTkRadioGroup,
  inputs: ['direction', 'invalid', 'label', 'position', 'showAsterisk', 'spread', 'type', 'value'],
})
@Component({
  selector: 'tk-radio-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['direction', 'invalid', 'label', 'position', 'showAsterisk', 'spread', 'type', 'value'],
  outputs: ['tk-change'],
})
export class TkRadioGroup {
  protected el: HTMLTkRadioGroupElement;
  @Output() tkChange = new EventEmitter<CustomEvent<any>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkRadioGroup extends Components.TkRadioGroup {
  /**
   * Emitted when the value has changed.
   */
  'tk-change': EventEmitter<CustomEvent<any>>;
}

@ProxyCmp({
  defineCustomElementFn: defineTkRating,
  inputs: ['disabled', 'maxRating', 'readonly', 'showRatingValue', 'type', 'value'],
})
@Component({
  selector: 'tk-rating',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'maxRating', 'readonly', 'showRatingValue', 'type', 'value'],
  outputs: ['tk-change'],
})
export class TkRating {
  protected el: HTMLTkRatingElement;
  @Output() tkChange = new EventEmitter<CustomEvent<number>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkRating extends Components.TkRating {
  /**
   * Emitted when the value has changed.
   */
  'tk-change': EventEmitter<CustomEvent<number>>;
}

@ProxyCmp({
  defineCustomElementFn: defineTkSelect,
  inputs: [
    'allowCustomValue',
    'chipOptions',
    'clearable',
    'disabled',
    'dropdownWidthMode',
    'editable',
    'emptyMessage',
    'error',
    'filter',
    'filterDebounceDelay',
    'groupNameKey',
    'groupOptionsKey',
    'hint',
    'invalid',
    'label',
    'loading',
    'multiple',
    'name',
    'optionHtml',
    'optionLabelKey',
    'optionValueKey',
    'options',
    'placeholder',
    'readonly',
    'showAsterisk',
    'size',
    'value',
  ],
})
@Component({
  selector: 'tk-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'allowCustomValue',
    'chipOptions',
    'clearable',
    'disabled',
    'dropdownWidthMode',
    'editable',
    'emptyMessage',
    'error',
    'filter',
    'filterDebounceDelay',
    'groupNameKey',
    'groupOptionsKey',
    'hint',
    'invalid',
    'label',
    'loading',
    'multiple',
    'name',
    'optionHtml',
    'optionLabelKey',
    'optionValueKey',
    'options',
    'placeholder',
    'readonly',
    'showAsterisk',
    'size',
    'value',
  ],
  outputs: ['tk-change'],
})
export class TkSelect {
  protected el: HTMLTkSelectElement;
  @Output() tkChange = new EventEmitter<CustomEvent<any>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkSelect extends Components.TkSelect {
  /**
   * Emitted when the value has changed.
   */
  'tk-change': EventEmitter<CustomEvent<any>>;
}

@ProxyCmp({
  defineCustomElementFn: defineTkSlider,
  inputs: ['disabled', 'error', 'hint', 'invalid', 'label', 'max', 'min', 'range', 'rangeVisibility', 'showAsterisk', 'step', 'type', 'value'],
})
@Component({
  selector: 'tk-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'error', 'hint', 'invalid', 'label', 'max', 'min', 'range', 'rangeVisibility', 'showAsterisk', 'step', 'type', 'value'],
  outputs: ['tkChange'],
})
export class TkSlider {
  protected el: HTMLTkSliderElement;
  @Output() tkChange = new EventEmitter<CustomEvent<number | [number, number]>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkSlider extends Components.TkSlider {
  /**
   * Emitted when the slider value changes.
Emits a number for single mode, or a [min, max] tuple for range mode.
   */
  tkChange: EventEmitter<CustomEvent<number | [number, number]>>;
}

@ProxyCmp({
  defineCustomElementFn: defineTkSpinner,
  inputs: ['label', 'orientation', 'size', 'type'],
})
@Component({
  selector: 'tk-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['label', 'orientation', 'size', 'type'],
})
export class TkSpinner {
  protected el: HTMLTkSpinnerElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkSpinner extends Components.TkSpinner {}

@ProxyCmp({
  defineCustomElementFn: defineTkStep,
  inputs: [
    'activeIcon',
    'complete',
    'completeIcon',
    'disabled',
    'error',
    'errorIcon',
    'header',
    'icon',
    'inactiveIcon',
    'index',
    'isActive',
    'isClickable',
    'labelPosition',
    'stepMode',
    'subheader',
  ],
})
@Component({
  selector: 'tk-step',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'activeIcon',
    'complete',
    'completeIcon',
    'disabled',
    'error',
    'errorIcon',
    'header',
    'icon',
    'inactiveIcon',
    'index',
    'isActive',
    'isClickable',
    'labelPosition',
    'stepMode',
    'subheader',
  ],
})
export class TkStep {
  protected el: HTMLTkStepElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkStep extends Components.TkStep {}

@ProxyCmp({
  defineCustomElementFn: defineTkStepper,
  inputs: [
    'active',
    'activeIcon',
    'completeIcon',
    'containerStyle',
    'contentStyle',
    'controlled',
    'errorIcon',
    'inactiveIcon',
    'linear',
    'orientation',
    'showCompleteState',
    'signStyle',
    'stepMode',
  ],
  methods: ['setActive'],
})
@Component({
  selector: 'tk-stepper',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'active',
    'activeIcon',
    'completeIcon',
    'containerStyle',
    'contentStyle',
    'controlled',
    'errorIcon',
    'inactiveIcon',
    'linear',
    'orientation',
    'showCompleteState',
    'signStyle',
    'stepMode',
  ],
  outputs: ['tk-step-change', 'tk-step-click'],
})
export class TkStepper {
  protected el: HTMLTkStepperElement;
  @Output() tkStepChange = new EventEmitter<CustomEvent<number>>();
  @Output() tkStepClick = new EventEmitter<CustomEvent<ITkStepperIStepClickDetail>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import type { IStepClickDetail as ITkStepperIStepClickDetail } from '@takeoff-ui/core/components';

export declare interface TkStepper extends Components.TkStepper {
  /**
   * Emitted when the active step changes.
   */
  'tk-step-change': EventEmitter<CustomEvent<number>>;
  /**
   * Emitted when a step is clicked.
   */
  'tk-step-click': EventEmitter<CustomEvent<ITkStepperIStepClickDetail>>;
}

@ProxyCmp({
  defineCustomElementFn: defineTkTable,
  inputs: [
    'cardTitle',
    'cellStyle',
    'columns',
    'containerStyle',
    'data',
    'dataKey',
    'expandedRows',
    'headerType',
    'loading',
    'multiSort',
    'paginationMethod',
    'paginationType',
    'rowStyle',
    'rowsPerPage',
    'rowsPerPageOptions',
    'selection',
    'selectionMode',
    'selectionRowDisabled',
    'size',
    'striped',
    'totalItems',
  ],
  methods: ['serverRequest', 'exportFile', 'clearFilters', 'clearSorting', 'getFilters', 'getSorting', 'setCurrentPage'],
})
@Component({
  selector: 'tk-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'cardTitle',
    'cellStyle',
    'columns',
    'containerStyle',
    'data',
    'dataKey',
    'expandedRows',
    'headerType',
    'loading',
    'multiSort',
    'paginationMethod',
    'paginationType',
    'rowStyle',
    'rowsPerPage',
    'rowsPerPageOptions',
    'selection',
    'selectionMode',
    'selectionRowDisabled',
    'size',
    'striped',
    'totalItems',
  ],
  outputs: ['tk-selection-change', 'tk-request', 'tk-expanded-rows-change', 'tk-cell-edit', 'tk-row-click'],
})
export class TkTable {
  protected el: HTMLTkTableElement;
  @Output() tkSelectionChange = new EventEmitter<CustomEvent<any[] | any>>();
  @Output() tkRequest = new EventEmitter<CustomEvent<ITkTableITableRequest>>();
  @Output() tkExpandedRowsChange = new EventEmitter<CustomEvent<any[]>>();
  @Output() tkCellEdit = new EventEmitter<CustomEvent<ITkTableITableCellEdit>>();
  @Output() tkRowClick = new EventEmitter<CustomEvent<any>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import type { ITableRequest as ITkTableITableRequest } from '@takeoff-ui/core/components';
import type { ITableCellEdit as ITkTableITableCellEdit } from '@takeoff-ui/core/components';

export declare interface TkTable extends Components.TkTable {
  'tk-selection-change': EventEmitter<CustomEvent<any[] | any>>;
  /**
   * Emitted when a request needs to be made to the server.
   */
  'tk-request': EventEmitter<CustomEvent<ITkTableITableRequest>>;
  /**
   * Emitted when the expanded rows change.
   */
  'tk-expanded-rows-change': EventEmitter<CustomEvent<any[]>>;
  /**
   * Emitted when a cell is edited.
   */
  'tk-cell-edit': EventEmitter<CustomEvent<ITkTableITableCellEdit>>;
  /**
   * Emitted when a row is clicked. @param row The row data that was clicked
   */
  'tk-row-click': EventEmitter<CustomEvent<any>>;
}

@ProxyCmp({
  defineCustomElementFn: defineTkTabs,
  inputs: [
    'activeIndex',
    'alignHeaders',
    'containerStyle',
    'contentStyle',
    'controlled',
    'defaultActiveIndex',
    'headerContainerStyle',
    'isClosable',
    'isExtendable',
    'orientation',
    'size',
    'spreadHeaders',
    'type',
    'variant',
  ],
})
@Component({
  selector: 'tk-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'activeIndex',
    'alignHeaders',
    'containerStyle',
    'contentStyle',
    'controlled',
    'defaultActiveIndex',
    'headerContainerStyle',
    'isClosable',
    'isExtendable',
    'orientation',
    'size',
    'spreadHeaders',
    'type',
    'variant',
  ],
  outputs: ['tk-tab-click', 'tk-tab-change'],
})
export class TkTabs {
  protected el: HTMLTkTabsElement;
  @Output() tkTabClick = new EventEmitter<CustomEvent<number>>();
  @Output() tkTabChange = new EventEmitter<CustomEvent<number>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkTabs extends Components.TkTabs {
  /**
   * Triggered when a tab is clicked. Returns the clicked tab index.
   */
  'tk-tab-click': EventEmitter<CustomEvent<number>>;
  /**
   * Triggered when the currently open tab changes. Returns the active index.
   */
  'tk-tab-change': EventEmitter<CustomEvent<number>>;
}

@ProxyCmp({
  defineCustomElementFn: defineTkTabsItem,
  inputs: ['badgeCount', 'badgeLabel', 'badged', 'disabled', 'icon', 'label', 'tooltipOptions'],
})
@Component({
  selector: 'tk-tabs-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['badgeCount', 'badgeLabel', 'badged', 'disabled', 'icon', 'label', 'tooltipOptions'],
})
export class TkTabsItem {
  protected el: HTMLTkTabsItemElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkTabsItem extends Components.TkTabsItem {}

@ProxyCmp({
  defineCustomElementFn: defineTkTextarea,
  inputs: ['disabled', 'error', 'hint', 'invalid', 'label', 'maxLength', 'name', 'placeholder', 'readonly', 'rows', 'showAsterisk', 'size', 'value'],
  methods: ['setFocus'],
})
@Component({
  selector: 'tk-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'error', 'hint', 'invalid', 'label', 'maxLength', 'name', 'placeholder', 'readonly', 'rows', 'showAsterisk', 'size', 'value'],
  outputs: ['tk-input', 'tk-change', 'tk-blur', 'tk-focus'],
})
export class TkTextarea {
  protected el: HTMLTkTextareaElement;
  @Output() tkInput = new EventEmitter<CustomEvent<KeyboardEvent>>();
  @Output() tkChange = new EventEmitter<CustomEvent<string | number | undefined | null>>();
  @Output() tkBlur = new EventEmitter<CustomEvent<void>>();
  @Output() tkFocus = new EventEmitter<CustomEvent<void>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkTextarea extends Components.TkTextarea {
  /**
   * Emitted when a keyboard input occurred.
   */
  'tk-input': EventEmitter<CustomEvent<KeyboardEvent>>;
  /**
   * Emitted when the value has changed.
   */
  'tk-change': EventEmitter<CustomEvent<string | number | undefined | null>>;
  /**
   * Emitted when the input loses focus.
   */
  'tk-blur': EventEmitter<CustomEvent<void>>;
  /**
   * Emitted when the input has focus.
   */
  'tk-focus': EventEmitter<CustomEvent<void>>;
}

@ProxyCmp({
  defineCustomElementFn: defineTkTimeline,
  inputs: ['alternate', 'items', 'orientation'],
})
@Component({
  selector: 'tk-timeline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['alternate', 'items', 'orientation'],
})
export class TkTimeline {
  protected el: HTMLTkTimelineElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkTimeline extends Components.TkTimeline {}

@ProxyCmp({
  defineCustomElementFn: defineTkTimelineItem,
})
@Component({
  selector: 'tk-timeline-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class TkTimelineItem {
  protected el: HTMLTkTimelineItemElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkTimelineItem extends Components.TkTimelineItem {}

@ProxyCmp({
  defineCustomElementFn: defineTkToggle,
  inputs: ['ariaLabelledby', 'disabled', 'icon', 'inputId', 'invalid', 'label', 'name', 'showIcon', 'size', 'value', 'variant'],
  methods: ['getInputElement'],
})
@Component({
  selector: 'tk-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['ariaLabelledby', 'disabled', 'icon', 'inputId', 'invalid', 'label', 'name', 'showIcon', 'size', 'value', 'variant'],
  outputs: ['tk-change'],
})
export class TkToggle {
  protected el: HTMLTkToggleElement;
  @Output() tkChange = new EventEmitter<CustomEvent<boolean>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkToggle extends Components.TkToggle {
  /**
   * Event emitted when the toggle value changes. @event onChange
   */
  'tk-change': EventEmitter<CustomEvent<boolean>>;
}

@ProxyCmp({
  defineCustomElementFn: defineTkToggleButton,
  inputs: ['disabled', 'icon', 'iconPosition', 'label', 'rounded', 'selected', 'size', 'type', 'value', 'variant'],
})
@Component({
  selector: 'tk-toggle-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'icon', 'iconPosition', 'label', 'rounded', 'selected', 'size', 'type', 'value', 'variant'],
  outputs: ['tk-toggle'],
})
export class TkToggleButton {
  protected el: HTMLTkToggleButtonElement;
  @Output() tkToggle = new EventEmitter<CustomEvent<any>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkToggleButton extends Components.TkToggleButton {
  /**
   * Emitted when the toggle button is toggled.
   */
  'tk-toggle': EventEmitter<CustomEvent<any>>;
}

@ProxyCmp({
  defineCustomElementFn: defineTkToggleButtonGroup,
  inputs: ['direction', 'rounded', 'type', 'value'],
})
@Component({
  selector: 'tk-toggle-button-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['direction', 'rounded', 'type', 'value'],
  outputs: ['tk-change'],
})
export class TkToggleButtonGroup {
  protected el: HTMLTkToggleButtonGroupElement;
  @Output() tkChange = new EventEmitter<CustomEvent<any>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkToggleButtonGroup extends Components.TkToggleButtonGroup {
  /**
   * Emitted when the selected value changes.
   */
  'tk-change': EventEmitter<CustomEvent<any>>;
}

@ProxyCmp({
  defineCustomElementFn: defineTkTooltip,
  inputs: ['containerStyle', 'description', 'header', 'icon', 'position', 'variant'],
})
@Component({
  selector: 'tk-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['containerStyle', 'description', 'header', 'icon', 'position', 'variant'],
})
export class TkTooltip {
  protected el: HTMLTkTooltipElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkTooltip extends Components.TkTooltip {}

@ProxyCmp({
  defineCustomElementFn: defineTkTreeView,
  inputs: ['badgeOptions', 'branchIcon', 'disabled', 'items', 'leafIcon', 'mode', 'selectable', 'showBadge', 'showPointer', 'size', 'type', 'value'],
})
@Component({
  selector: 'tk-tree-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['badgeOptions', 'branchIcon', 'disabled', 'items', 'leafIcon', 'mode', 'selectable', 'showBadge', 'showPointer', 'size', 'type', 'value'],
  outputs: ['tk-item-click', 'tk-change'],
})
export class TkTreeView {
  protected el: HTMLTkTreeViewElement;
  @Output() tkItemClick = new EventEmitter<CustomEvent<ITkTreeViewITreeItem>>();
  @Output() tkChange = new EventEmitter<CustomEvent<string[]>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import type { ITreeItem as ITkTreeViewITreeItem } from '@takeoff-ui/core/components';

export declare interface TkTreeView extends Components.TkTreeView {
  /**
   * Event emitted when a tree item is clicked.
   */
  'tk-item-click': EventEmitter<CustomEvent<ITkTreeViewITreeItem>>;
  /**
   * Event emitted when the selected value changes.
   */
  'tk-change': EventEmitter<CustomEvent<string[]>>;
}

@ProxyCmp({
  defineCustomElementFn: defineTkUpload,
  inputs: [
    'accept',
    'autoUpload',
    'chooseButtonLabel',
    'description',
    'disabled',
    'downloadable',
    'dragDrop',
    'dragDropDescription',
    'dragDropTitle',
    'error',
    'hint',
    'invalid',
    'label',
    'loading',
    'maxFileCount',
    'maxFileSize',
    'multiple',
    'showAsterisk',
    'showFiles',
    'title',
    'type',
    'uploadButtonLabel',
    'value',
  ],
})
@Component({
  selector: 'tk-upload',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'accept',
    'autoUpload',
    'chooseButtonLabel',
    'description',
    'disabled',
    'downloadable',
    'dragDrop',
    'dragDropDescription',
    'dragDropTitle',
    'error',
    'hint',
    'invalid',
    'label',
    'loading',
    'maxFileCount',
    'maxFileSize',
    'multiple',
    'showAsterisk',
    'showFiles',
    'title',
    'type',
    'uploadButtonLabel',
    'value',
  ],
  outputs: ['tk-change', 'tk-files-rejected', 'tk-upload', 'tk-removed-file', 'tk-download-file'],
})
export class TkUpload {
  protected el: HTMLTkUploadElement;
  @Output() tkChange = new EventEmitter<CustomEvent<File[]>>();
  @Output() tkFilesRejected = new EventEmitter<CustomEvent<{ reason: string; file: File | FileList }[]>>();
  @Output() tkUpload = new EventEmitter<CustomEvent<File[]>>();
  @Output() tkRemovedFile = new EventEmitter<CustomEvent<File>>();
  @Output() tkDownloadFile = new EventEmitter<CustomEvent<File>>();
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface TkUpload extends Components.TkUpload {
  /**
   * Emitted when one or more files pass validation.
   */
  'tk-change': EventEmitter<CustomEvent<File[]>>;
  /**
   * Emitted when one or more files fail validation, with reasons.
   */
  'tk-files-rejected': EventEmitter<CustomEvent<{ reason: string; file: File | FileList }[]>>;
  /**
   * Emitted when the user initiates file upload.
   */
  'tk-upload': EventEmitter<CustomEvent<File[]>>;
  /**
   * Emitted when a file is removed from the accepted list.
   */
  'tk-removed-file': EventEmitter<CustomEvent<File>>;
  /**
   * Emitted when a file is download button is clicked.
   */
  'tk-download-file': EventEmitter<CustomEvent<File>>;
}
