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
    title: 'Beta Release',
    version: '0.0.2-beta.5',
    date: '27.05.2025',
    newFeatures: [
      'Add headerHtml to table column defination for header custumization to table',
    ],
    bugFixes: [
      'Fixed opening problem when popover used from within the table',
      'Fix nested object value to table excel export ',
    ],
  },
  {
    title: 'Beta Release',
    version: '0.0.2-beta.4',
    date: '23.05.2025',
    newComponents: [
      'Popover component has been developed',
      'Organization chart component has been developed',
    ],
    newFeatures: ['Add tooltip to tabs header'],
  },
  {
    title: 'Beta Release',
    version: '0.0.2-beta.3',
    date: '21.05.2025',
    newFeatures: [
      'Label size prop added to datepicker component',
      'Hide page and item numbers for empty data to pagination',
      'Add closePanel method to datepicker component',
      'Checkbox and icons are disabled when the data is empty to table',
    ],
    bugFixes: [
      'Fix checkbox filter to nested field in table',
      'Fix all z-index related issues',
    ],
  },
  {
    title: 'Beta Release',
    version: '0.0.2-beta.2',
    date: '14.05.2025',
    newFeatures: [
      'Add navigation mode style',
      'Added downloadable prop to upload component',
    ],
    bugFixes: ['Fixed filter panel appearance when route of page'],
  },
  {
    title: 'Beta Release',
    version: '0.0.2-beta.1',
    date: '12.05.2025',
    newFeatures: ['Add filter buttons label attributo to IColumn '],
    bugFixes: [
      'Fix sorting icon when clearSorting method is called',
      'Fix loading icon location in table',
      'Fix reset mode usage to button',
    ],
  },
  {
    title: 'Patch Release',
    version: '0.0.1',
    date: '05.05.2025',
    newComponents: ['TkCart has been developed'],
    newFeatures: [
      'Add internal state management for active indexes issue',
      'Add radio and checkbox filterType to table filter',
      'Add externalData and columns feature to exportFile method',
      'Add latterOnly mask to maskOptions',
      'Add setCurrentPage method to table',
      'Integrate Tiptap placeholder extension',
    ],
    bugFixes: ['Fixed DatePicker display issue when used inside a Dialog'],
  },
  {
    title: 'Beta Release',
    version: '0.0.1-beta.8',
    date: '28.04.2025',
    newComponents: ['Icon component has been developed'],
    newFeatures: [
      'Add support for disabling specific weekdays',
      'Added badge to search icon to indicate active filtering',
      'Add hasContentSlot state to checkbox component',
    ],
    bugFixes: [
      'Fix empty-data slot apperance',
      'Fix expanded rows close problem',
    ],
    refactor: ['Refactor stepper component'],
  },
];
