// src/codeExamples.js

type IReleaseItem = {
  title: string;
  description?: string;
  version: string;
  date: string;
  bugFixes?: string[];
  newComponents?: string[];
  newFeatures?: string[];
  refactor?: string[];
};

export const releases: IReleaseItem[] = [
  {
    title: 'Patch Release',
    version: '1.7.0',
    date: '07.04.2025',
    newComponents: ['Icon component has been developed'],
    newFeatures: [
      'Add contentStyle prop to card',
      'Add firstDayOfWeekIndex prop to datepicker',
      'Add type, description props to checkbox',
      'Add position prop to radio group',
      'Add maxLength prop to textarea',
    ],
    bugFixes: ['Fixed toaster z-index on dialog'],
    refactor: ['Refactor stepper component'],
  },
  {
    title: 'Patch Release',
    version: '1.6.1',
    date: '24.03.2025',
    bugFixes: [
      'Add break-word to file name in upload',
      'Fix checkbox click problem to multiple select',
      'Fixed the panel appearance when using the select from within the dialog',
    ],
  },
  {
    title: 'Minor Release',
    version: '1.6.0',
    date: '13.03.2025',
    newFeatures: [
      'Add label, hint and showAsterisk props to upload',
      'Add ignoreColumnsFields field on interface for export file to table',
      'Add loading and invalid prop to upload',
    ],
  },
  {
    title: 'Minor Release',
    version: '1.5.0',
    date: '11.03.2025',
    newFeatures: [
      'Add description, spread, showAsterisk, type props to radio and radio group',
      'Add filterDebounceDelay prop for filter to select',
      'Add action button size prop to button in toaster',
      'Add scope option to exportFile method to table',
    ],
  },
  {
    title: 'Minor Release',
    version: '1.4.0',
    date: '07.03.2025',
    newFeatures: ['Added pre prop to input.', 'Added loading prop to select.'],
    bugFixes: [
      'Placeholder visibility value null check to multiple select.',
      'Fixed form submit triggered when clicked editor and pagination button.',
    ],
    refactor: ['The shadow feature has been removed to radio.'],
  },
  {
    title: 'Minor Release',
    version: '1.3.0',
    date: '05.03.2025',
    bugFixes: ['Fixed datepicker appearance inside accordion.'],
  },
  {
    title: 'Patch Release',
    version: '1.2.2',
    date: '28.02.2025',
    newFeatures: ['Added working option label/value with nested value.'],
  },
  {
    title: 'Patch Release',
    version: '1.2.1',
    date: '27.02.2025',
    refactor: ['The shadow feature has been removed to editor.'],
  },
  {
    title: 'Minor Release',
    version: '1.2.0',
    date: '20.02.2025',
    bugFixes: [
      'The issue in the upload component in single mode has been fixed.',
      'The problem of the custom cell being visible when there is no data in the outside filter has been fixed.',
    ],
    newFeatures: [
      'The radio feature has been added to the selection modes in the table.',
      'The clearable feature has been added to the select component.',
      'The clearable feature has been added to the input component.',
    ],
  },
  {
    title: 'Minor Release',
    version: '1.1.0',
    date: '18.02.2025',
    bugFixes: [
      'The panel position error in the use of dropdown within table cells has been fixed',
    ],
    newFeatures: [
      'Add activeIndex property that allows active tab items to change programmatically.',
      'Add containerStyle prop to drawer',
    ],
  },
  {
    title: 'Major Release',
    version: '1.0.0',
    date: '14.02.2025',
    newFeatures: [
      'Added set actions feature to toaster usage',
      'Added text overflow ellipsis feature to table column header and sub header',
      'Added sticky column feature to table',
      'Added alignHeaders prop to tabs',
      'Added expandIcon and collapseIcon props to accordion',
      'Added showAsterisk prop to datepicker',
      'Unit tests were written for 14 components.',
    ],
    refactor: [
      'The paginationType prop in the table has been changed to paginationMethod',
      'the tk-accepted-files event in the upload component has been changed to tk-change',
    ],
  },
  {
    title: 'Patch Release',
    version: '0.0.58',
    date: '27.01.2025',
    bugFixes: ['Fixed outside filter change page to table'],
    newFeatures: [
      'Added showAsterisk prop to datepicker',
      'Unit tests were written for 14 components.',
    ],
  },
  {
    title: 'Patch Release',
    version: '0.0.57',
    date: '27.01.2025',
    bugFixes: ['Fixed add after remove bug in upload'],
    newFeatures: [
      'Added slot for custom content in tooltip',
      'Updated message prop to handle string[] type in alert',
      'Added action slots to alert',
      'Added subHeader to column defination to table',
      'Added max file count prop to upload',
      'Added rowsPerPageOptions prop to table',
    ],
  },
  {
    title: 'Patch Release',
    version: '0.0.55',
    date: '21.01.2025',
    bugFixes: [
      'Fixed change event trigger to checkbox',
      'Fixed icon style, add to fill to dialog',
    ],
  },
  {
    title: 'Patch Release',
    version: '0.0.54',
    date: '20.01.2025',
    newFeatures: ['Added select all feature to table'],
  },
  {
    title: 'Patch Release',
    version: '0.0.53',
    date: '19.01.2025',
    newFeatures: [
      'Added multi select usage to select',
      'Added autoUpload prop to upload',
      'Added pageSizeOptions prop to pagination',
    ],
  },
  {
    title: 'Patch Release',
    version: '0.0.52',
    date: '17.01.2025',
    newFeatures: [
      'Added IIconOptions for icon usage in all components',
      'Added button loading state',
      'Added chooseButtonLabel and uploadButtonLabel prop to upload',
      'Added autoUpload prop to upload',
    ],
    bugFixes: [
      'Fixed upload component events in vue usage',
      'Fixed tailwind plugin bundle',
    ],
  },
  {
    title: 'Patch Release',
    version: '0.0.51',
    date: '14.01.2025',
    newFeatures: [
      'Add all font weight to geologica font',
      'Add icon options feature to badge',
      'Add cellStyle and rowStyle feature to table',
    ],
    bugFixes: ['Fixed panel position to select'],
  },
  {
    title: 'Patch Release',
    version: '0.0.49',
    date: '09.01.2025',
    newComponents: [
      'TkEditor component has been developed',
      'TkUpload component has been developed',
    ],
    newFeatures: ['Add activeIndex and hideArrows feature to accordion'],
  },
  {
    title: 'Patch Release',
    version: '0.0.48',
    date: '31.12.2024',
    newFeatures: [
      'Add export feature to table',
      'Add select and datepicker usage to inline editing on table',
      'Add readonly feature to rating',
      'Add options align prop to dropdown',
      'Add disable option feature to dropdown',
    ],
  },
  {
    title: 'Patch Release',
    version: '0.0.47',
    date: '27.12.2024',
    newFeatures: [
      'Drawer component maximize feature and header-actions slot added',
    ],
    refactor: [
      'Refactor resize and outside click listener on all components',
      'Refactor model prop usage on Breadcrumb',
    ],
    newComponents: ['TkDropdown component has been developed'],
    bugFixes: ['Fixed value delete on blur'],
  },
  {
    title: 'Patch Release',
    version: '0.0.46',
    date: '21.12.2024',
    newFeatures: ['Radio component single usage feature added.'],
    bugFixes: ['Fixed v-model usage in Vue', 'Fix button disable state'],
  },
  {
    title: 'Patch Release',
    version: '0.0.45',
    date: '20.12.2024',
    bugFixes: ['Fix outside click issue on dialog and drawer'],
  },
  {
    title: 'Patch Release',
    version: '0.0.41',
    date: '19.12.2024',
    newFeatures: [
      'Added editable prop to the select component.',
      'Added dropdownWidthMode prop to the select component.',
      'Added showAsterisk prop to the input component.',
      'Added label prop to the toggle component.',
    ],
    bugFixes: [
      'Updated styles for the counter type in the input component.',
      'Updated styles for the grouped type in the accordion component.',
    ],
    refactor: [
      'Refactored the datepicker component.',
      'Refactored styles for the TkBadge component.',
      'Refactored the mode property in the TkPagination component.',
      'Added comments for interfaces.',
    ],
  },
  {
    title: 'Patch Release',
    version: '0.0.40',
    date: '06.12.2024',
    refactor: [
      'Custom cell feature usage has been updated to the table component.',
    ],
  },
  {
    title: 'Patch Release',
    version: '0.0.39',
    date: '05.12.2024',
    newFeatures: [
      'The autoSelfDestroy has been added to the TkChips component.',
    ],
    refactor: ['Updated components styles.'],
  },
  {
    title: 'Patch Release',
    version: '0.0.36',
    date: '04.12.2024',
    newFeatures: [
      'The tkTabChange event has been added to the tabs component.',
    ],
    refactor: ['Updated components styles.'],
  },
  {
    title: 'Patch Release',
    version: '0.0.35',
    date: '29.11.2024',
    bugFixes: ['datepicker manual input has been enabled.'],
  },
  {
    title: 'Patch Release',
    version: '0.0.34',
    date: '28.11.2024',
    newFeatures: ['Inline editing feature added to table'],
  },
  {
    title: 'Patch Release',
    version: '0.0.33',
    date: '26.11.2024',
    bugFixes: [
      'Fixed maximum call stack errors to from components',
      'Scrolling problem solved when navigating with arrow keys in select component',
    ],
  },
  {
    title: 'Patch Release',
    version: '0.0.32',
    date: '26.11.2024',
    newFeatures: [
      'Added mx, my probes to TkDivider component',
      'Added allowCustomValue to select component',
      'Added header and content style to tabs component',
    ],
  },
  {
    title: 'Patch Release',
    version: '0.0.31',
    date: '24.11.2024',
    newComponents: ['The TkDivider component has been developed.'],
    newFeatures: ['The @takeoff-ui/tailwind package has been released.'],
  },
  {
    title: 'Patch Release',
    version: '0.0.30',
    date: '21.11.2024',
    newComponents: ['The TkSpinner component has been developed.'],
    newFeatures: [
      'The maskOptions feature has been added to input.',
      'The spreadHeaders feature has been added to tabs.',
      'The requirement to pass the slot prop to tabs item has been removed.',
    ],
  },
  {
    title: 'Patch Release',
    version: '0.0.29',
    date: '19.11.2024',
    newFeatures: [
      'A containerStyle prop has been added to the dialog component.',
    ],
    bugFixes: [
      'The value in number mode for input has been fixed.',
      'The height scroll issue in select has been fixed.',
    ],
  },
  {
    title: 'Patch Release',
    version: '0.0.28',
    date: '19.11.2024',
    newFeatures: [
      'The icon prop in tabs has been updated to allow setting fill, color, style, and name properties as an object.',
      'An empty-data slot has been added to table.',
    ],
  },
  {
    title: 'Patch Release',
    version: '0.0.27',
    date: '18.11.2024',
    newFeatures: [
      'Added optionLabelKey, optionValueKey probes to select component',
      'Form reset support has been provided to form components.',
    ],
  },
  {
    title: 'Patch Release',
    version: '0.0.26',
    date: '18.11.2024',
    newFeatures: [
      'Added optionLabelKey, optionValueKey probes to select component',
      'Added deep key feature to table component ',
    ],
    newComponents: [
      'The TkRating component has been improved.',
      'The TkStepper component has been improved.',
    ],
  },
];
