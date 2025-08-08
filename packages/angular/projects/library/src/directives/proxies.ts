/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from '@takeoff-ui/core';

@ProxyCmp({
  inputs: ['activeIndex', 'allowMultiple', 'arrowPosition', 'collapseIcon', 'expandIcon', 'hideArrows', 'type'],
})
@Component({
  selector: 'tk-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['activeIndex', 'allowMultiple', 'arrowPosition', 'collapseIcon', 'expandIcon', 'hideArrows', 'type'],
})
export class TkAccordion {
  protected el: HTMLTkAccordionElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tkAccordionItemSelected']);
  }
}

import type { IAccordionItemSelect as ITkAccordionIAccordionItemSelect } from '@takeoff-ui/core';

export declare interface TkAccordion extends Components.TkAccordion {
  /**
   * Emitted when an accordion item is selected
   */
  tkAccordionItemSelected: EventEmitter<CustomEvent<ITkAccordionIAccordionItemSelect>>;
}

@ProxyCmp({
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
  inputs: ['disabled', 'fullWidth', 'href', 'icon', 'iconPosition', 'label', 'loading', 'mode', 'rounded', 'size', 'target', 'type', 'underline', 'variant'],
})
@Component({
  selector: 'tk-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'fullWidth', 'href', 'icon', 'iconPosition', 'label', 'loading', 'mode', 'rounded', 'size', 'target', 'type', 'underline', 'variant'],
})
export class TkButton {
  protected el: HTMLTkButtonElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tk-click']);
  }
}

export declare interface TkButton extends Components.TkButton {
  /**
   * Emitted when the button click.
   */
  'tk-click': EventEmitter<CustomEvent<MouseEvent>>;
}

@ProxyCmp({
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
  inputs: ['description', 'disabled', 'indeterminate', 'invalid', 'label', 'name', 'type', 'value'],
})
@Component({
  selector: 'tk-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['description', 'disabled', 'indeterminate', 'invalid', 'label', 'name', 'type', 'value'],
})
export class TkCheckbox {
  protected el: HTMLTkCheckboxElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tk-change']);
  }
}

export declare interface TkCheckbox extends Components.TkCheckbox {
  /**
   * Emitted when the checkbox checked state changes.
   */
  'tk-change': EventEmitter<CustomEvent<boolean>>;
}

@ProxyCmp({
  inputs: ['autoSelfDestroy', 'disabled', 'icon', 'label', 'removable', 'size', 'type', 'value', 'variant'],
})
@Component({
  selector: 'tk-chips',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autoSelfDestroy', 'disabled', 'icon', 'label', 'removable', 'size', 'type', 'value', 'variant'],
})
export class TkChips {
  protected el: HTMLTkChipsElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tk-remove']);
  }
}

export declare interface TkChips extends Components.TkChips {
  /**
   * When an element is deleted, it is triggered. It returns the label.
   */
  'tk-remove': EventEmitter<CustomEvent<any>>;
}

@ProxyCmp({
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
})
export class TkCurrencyInput {
  protected el: HTMLTkCurrencyInputElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tk-change', 'tkBlur', 'tkFocus']);
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
})
export class TkDatepicker {
  protected el: HTMLTkDatepickerElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tk-input-change', 'tk-change']);
  }
}

import type { IDateSelection as ITkDatepickerIDateSelection } from '@takeoff-ui/core';

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
})
export class TkDialog {
  protected el: HTMLTkDialogElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tk-close', 'tk-open', 'tk-visible-change']);
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
  inputs: ['containerStyle', 'footerType', 'header', 'headerType', 'hideBackdrop', 'hideCloseIcon', 'maskVariant', 'open', 'position', 'preventDismiss', 'unblockScroll'],
  methods: ['show', 'close'],
})
@Component({
  selector: 'tk-drawer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['containerStyle', 'footerType', 'header', 'headerType', 'hideBackdrop', 'hideCloseIcon', 'maskVariant', 'open', 'position', 'preventDismiss', 'unblockScroll'],
})
export class TkDrawer {
  protected el: HTMLTkDrawerElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tk-drawer-close', 'tk-drawer-open', 'tk-drawer-enter', 'tk-drawer-leave', 'tk-drawer-change']);
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
  inputs: ['disabled', 'emptyMessage', 'groupNameKey', 'groupOptionsKey', 'optionHtml', 'optionLabelKey', 'optionValueKey', 'options', 'optionsAlign', 'position'],
})
@Component({
  selector: 'tk-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'emptyMessage', 'groupNameKey', 'groupOptionsKey', 'optionHtml', 'optionLabelKey', 'optionValueKey', 'options', 'optionsAlign', 'position'],
})
export class TkDropdown {
  protected el: HTMLTkDropdownElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tk-item-click']);
  }
}

export declare interface TkDropdown extends Components.TkDropdown {
  /**
   * Emitted when the value has changed.
   */
  'tk-item-click': EventEmitter<CustomEvent<any>>;
}

@ProxyCmp({
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
})
export class TkEditor {
  protected el: HTMLTkEditorElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tk-change', 'tkFocus', 'tkBlur']);
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
})
export class TkInput {
  protected el: HTMLTkInputElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tk-change', 'tk-blur', 'tk-focus', 'tk-clear-click']);
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
  inputs: ['accessibilityLabel', 'collapsible', 'data', 'options'],
  methods: ['getOrgChart', 'refresh', 'addNode', 'fit'],
})
@Component({
  selector: 'tk-org-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['accessibilityLabel', 'collapsible', 'data', 'options'],
})
export class TkOrgChart {
  protected el: HTMLTkOrgChartElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tk-node-click']);
  }
}

export declare interface TkOrgChart extends Components.TkOrgChart {
  /**
   * Node click event
   */
  'tk-node-click': EventEmitter<CustomEvent<any>>;
}

@ProxyCmp({
  inputs: ['currentPage', 'mode', 'rounded', 'rowsPerPage', 'rowsPerPageOptions', 'totalItems', 'type'],
})
@Component({
  selector: 'tk-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['currentPage', 'mode', 'rounded', 'rowsPerPage', 'rowsPerPageOptions', 'totalItems', 'type'],
})
export class TkPagination {
  protected el: HTMLTkPaginationElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tk-next-page', 'tk-page-change', 'tk-prev-page', 'tk-rows-per-page-change']);
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
  inputs: ['countryList', 'defaultCountry', 'disabled', 'error', 'hint', 'invalid', 'label', 'placeholder', 'readonly', 'showAsterisk', 'size', 'value'],
})
@Component({
  selector: 'tk-phone-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['countryList', 'defaultCountry', 'disabled', 'error', 'hint', 'invalid', 'label', 'placeholder', 'readonly', 'showAsterisk', 'size', 'value'],
})
export class TkPhoneInput {
  protected el: HTMLTkPhoneInputElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tk-change', 'tk-blur', 'tk-focus']);
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
  inputs: ['checked', 'description', 'disabled', 'invalid', 'label', 'name', 'position', 'value'],
})
@Component({
  selector: 'tk-radio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checked', 'description', 'disabled', 'invalid', 'label', 'name', 'position', 'value'],
})
export class TkRadio {
  protected el: HTMLTkRadioElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tk-change']);
  }
}

export declare interface TkRadio extends Components.TkRadio {
  /**
   * Emitted when the radio button's checked state changes.
   */
  'tk-change': EventEmitter<CustomEvent<any>>;
}

@ProxyCmp({
  inputs: ['direction', 'invalid', 'label', 'position', 'showAsterisk', 'spread', 'type', 'value'],
})
@Component({
  selector: 'tk-radio-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['direction', 'invalid', 'label', 'position', 'showAsterisk', 'spread', 'type', 'value'],
})
export class TkRadioGroup {
  protected el: HTMLTkRadioGroupElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tk-change']);
  }
}

export declare interface TkRadioGroup extends Components.TkRadioGroup {
  /**
   * Emitted when the value has changed.
   */
  'tk-change': EventEmitter<CustomEvent<any>>;
}

@ProxyCmp({
  inputs: ['disabled', 'maxRating', 'readonly', 'showRatingValue', 'type', 'value'],
})
@Component({
  selector: 'tk-rating',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'maxRating', 'readonly', 'showRatingValue', 'type', 'value'],
})
export class TkRating {
  protected el: HTMLTkRatingElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tk-change']);
  }
}

export declare interface TkRating extends Components.TkRating {
  /**
   * Emitted when the value has changed.
   */
  'tk-change': EventEmitter<CustomEvent<number>>;
}

@ProxyCmp({
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
})
export class TkSelect {
  protected el: HTMLTkSelectElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tk-change']);
  }
}

export declare interface TkSelect extends Components.TkSelect {
  /**
   * Emitted when the value has changed.
   */
  'tk-change': EventEmitter<CustomEvent<any>>;
}

@ProxyCmp({
  inputs: ['disabled', 'error', 'hint', 'invalid', 'label', 'max', 'min', 'range', 'rangeVisibility', 'showAsterisk', 'step', 'type', 'value'],
})
@Component({
  selector: 'tk-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'error', 'hint', 'invalid', 'label', 'max', 'min', 'range', 'rangeVisibility', 'showAsterisk', 'step', 'type', 'value'],
})
export class TkSlider {
  protected el: HTMLTkSliderElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tkChange']);
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
})
export class TkStepper {
  protected el: HTMLTkStepperElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tk-step-change', 'tk-step-click']);
  }
}

import type { IStepClickDetail as ITkStepperIStepClickDetail } from '@takeoff-ui/core';

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
})
export class TkTable {
  protected el: HTMLTkTableElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tk-selection-change', 'tk-request', 'tk-expanded-rows-change', 'tk-cell-edit', 'tk-row-click']);
  }
}

import type { ITableRequest as ITkTableITableRequest } from '@takeoff-ui/core';
import type { ITableCellEdit as ITkTableITableCellEdit } from '@takeoff-ui/core';

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
})
export class TkTabs {
  protected el: HTMLTkTabsElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tk-tab-click', 'tk-tab-change']);
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
  inputs: ['disabled', 'error', 'hint', 'invalid', 'label', 'maxLength', 'name', 'placeholder', 'readonly', 'rows', 'showAsterisk', 'size', 'value'],
  methods: ['setFocus'],
})
@Component({
  selector: 'tk-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'error', 'hint', 'invalid', 'label', 'maxLength', 'name', 'placeholder', 'readonly', 'rows', 'showAsterisk', 'size', 'value'],
})
export class TkTextarea {
  protected el: HTMLTkTextareaElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tk-input', 'tk-change', 'tk-blur', 'tk-focus']);
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

@ProxyCmp({})
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
  inputs: ['ariaLabelledby', 'disabled', 'icon', 'inputId', 'invalid', 'label', 'name', 'showIcon', 'size', 'value', 'variant'],
  methods: ['getInputElement'],
})
@Component({
  selector: 'tk-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['ariaLabelledby', 'disabled', 'icon', 'inputId', 'invalid', 'label', 'name', 'showIcon', 'size', 'value', 'variant'],
})
export class TkToggle {
  protected el: HTMLTkToggleElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tk-change']);
  }
}

export declare interface TkToggle extends Components.TkToggle {
  /**
   * Event emitted when the toggle value changes. @event onChange
   */
  'tk-change': EventEmitter<CustomEvent<boolean>>;
}

@ProxyCmp({
  inputs: ['disabled', 'icon', 'iconPosition', 'label', 'rounded', 'selected', 'size', 'type', 'value', 'variant'],
})
@Component({
  selector: 'tk-toggle-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'icon', 'iconPosition', 'label', 'rounded', 'selected', 'size', 'type', 'value', 'variant'],
})
export class TkToggleButton {
  protected el: HTMLTkToggleButtonElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tk-toggle']);
  }
}

export declare interface TkToggleButton extends Components.TkToggleButton {
  /**
   * Emitted when the toggle button is toggled.
   */
  'tk-toggle': EventEmitter<CustomEvent<any>>;
}

@ProxyCmp({
  inputs: ['direction', 'rounded', 'type', 'value'],
})
@Component({
  selector: 'tk-toggle-button-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['direction', 'rounded', 'type', 'value'],
})
export class TkToggleButtonGroup {
  protected el: HTMLTkToggleButtonGroupElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tk-change']);
  }
}

export declare interface TkToggleButtonGroup extends Components.TkToggleButtonGroup {
  /**
   * Emitted when the selected value changes.
   */
  'tk-change': EventEmitter<CustomEvent<any>>;
}

@ProxyCmp({
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
  inputs: ['badgeOptions', 'branchIcon', 'disabled', 'items', 'leafIcon', 'mode', 'selectable', 'showBadge', 'showPointer', 'size', 'type', 'value'],
})
@Component({
  selector: 'tk-tree-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['badgeOptions', 'branchIcon', 'disabled', 'items', 'leafIcon', 'mode', 'selectable', 'showBadge', 'showPointer', 'size', 'type', 'value'],
})
export class TkTreeView {
  protected el: HTMLTkTreeViewElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tk-item-click', 'tk-change']);
  }
}

import type { ITreeItem as ITkTreeViewITreeItem } from '@takeoff-ui/core';

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
})
export class TkUpload {
  protected el: HTMLTkUploadElement;
  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tk-change', 'tk-files-rejected', 'tk-upload', 'tk-removed-file', 'tk-download-file']);
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
