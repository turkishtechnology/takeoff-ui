/**
 * @fileoverview Barrel file for all component and shared types
 */

// ============================================================================
// Global Interfaces
// ============================================================================
export type { IBadgeOptions } from './global/interfaces/IBadgeOptions';
export type { IIconOptions, IMultiIconOptions } from './global/interfaces/IIconOptions';
export type { ITooltipOptions } from './global/interfaces/ITooltipOptions';

// ============================================================================
// Component Interfaces and Types
// ============================================================================

// tk-accordion
export type { IAccordionItemSelect } from './components/tk-accordion/types';

// tk-alert
export type { IAlertActionButton } from './components/tk-alert/types';

// tk-breadcrumb
export type { IBreadcrumbModel } from './components/tk-breadcrumb/types';

// tk-chips
export type { IChipOptions } from './components/tk-chips/types';

// tk-currency-input
export type { ICurrency, CurrencyInputChangeEvent, Separator } from './components/tk-currency-input/types';

// tk-datepicker
export type { IDateSelection } from './components/tk-datepicker/types';

// tk-editor
export type { HeadingLevel, TkEditorToolbarButtonBehavior, TkEditorDefaultButton, TkEditorCustomButton, TkEditorToolbarConfig } from './components/tk-editor/types';

// tk-gantt-chart
export type {
  IGanttTaskSegment,
  IGanttTask,
  GanttViewType,
  GanttSecondaryHeaderMode,
  GanttWeekStartDay,
  IGanttIndicator,
  IGanttHoliday,
  IGanttColumn,
  GanttTooltipFunction,
  GanttTaskBarFunction,
  IGanttHeaderCell,
  IGanttFlatRow,
} from './components/tk-gantt-chart/types';

// tk-input
export type { IInputMaskOptions } from './components/tk-input/types';

// tk-phone-input
export type { ICountry, IPhoneInputValue } from './components/tk-phone-input/types';

// tk-stepper
export type { IStep, IStepClickDetail } from './components/tk-stepper/types';

// tk-table
export type {
  ITableColumn,
  IFilterOption,
  ITableSort,
  ITableRequest,
  ITableFilter,
  ITableCellEdit,
  ITableExportOptions,
  ITableExportExcelColumn,
  ITableGroup,
} from './components/tk-table/types';

// tk-timeline
export type { TimelineItem } from './components/tk-timeline/types';

// tk-treeview
export type { ITreeItem } from './components/tk-treeview/types';
