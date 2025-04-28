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
