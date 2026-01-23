/**
 * @fileoverview Barrel file for all component interfaces
 *
 * This file consolidates all public interfaces from components.
 */

// tk-alert
export type { IAlertActionButton } from './components/tk-alert/interfaces';

// tk-breadcrumb
export type { IBreadcrumbModel } from './components/tk-breadcrumb/interfaces';

// tk-chips
export type { IChipOptions } from './components/tk-chips/interfaces';

// tk-editor
export type { TkEditorCustomButton, HeadingLevel, TkEditorToolbarButtonBehavior, TkEditorDefaultButton, TkEditorToolbarConfig } from './components/tk-editor/interfaces';

// tk-input
export type { IInputMaskOptions } from './components/tk-input/interfaces';

// tk-phone-input
export type { ICountry, IPhoneInputValue } from './components/tk-phone-input/interfaces';

// tk-stepper
export type { IStep, IStepClickDetail } from './components/tk-stepper/interfaces';

// tk-table
export type {
  ITableColumn,
  ITableGroup,
  ITableExportExcelColumn,
  ITableExportOptions,
  ITableSort,
  ITableRequest,
  ITableFilter,
  ITableCellEdit,
  IFilterOption,
} from './components/tk-table/interfaces';

// tk-timeline
export type { TimelineItem } from './components/tk-timeline/interfaces';

// tk-treeview
export type { ITreeItem } from './components/tk-treeview/interfaces';
