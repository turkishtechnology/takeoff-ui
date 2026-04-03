import { TkGanttChart } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import * as React from 'react';

const SizingLayout = () => {
  const tasks = [
    { id: '1', name: 'Phase 1 - Project Scoping', startDate: '2026-04-01', endDate: '2026-04-10', progress: 100 },
    { id: '2', name: 'Phase 2 - Design Concepts', startDate: '2026-04-05', endDate: '2026-04-20', progress: 60 },
    { id: '3', name: 'Phase 3 - Prototyping and Testing', startDate: '2026-04-15', endDate: '2026-04-30', progress: 10 },
  ];

  const reactCode = `const tasks = [
  { id: '1', name: 'Phase 1 - Project Scoping', startDate: '2026-04-01', endDate: '2026-04-10', progress: 100 },
  { id: '2', name: 'Phase 2 - Design Concepts', startDate: '2026-04-05', endDate: '2026-04-20', progress: 60 },
  { id: '3', name: 'Phase 3 - Prototyping and Testing', startDate: '2026-04-15', endDate: '2026-04-30', progress: 10 },
];

<TkGanttChart 
  tasks={tasks} 
  rowHeight={64} 
  panelWidth={400} 
/>`;

  const vueCode = `<script setup>
import { TkGanttChart } from '@takeoff-ui/vue'

const tasks = [
  { id: '1', name: 'Phase 1 - Project Scoping', startDate: '2026-04-01', endDate: '2026-04-10', progress: 100 },
  { id: '2', name: 'Phase 2 - Design Concepts', startDate: '2026-04-05', endDate: '2026-04-20', progress: 60 },
  { id: '3', name: 'Phase 3 - Prototyping and Testing', startDate: '2026-04-15', endDate: '2026-04-30', progress: 10 },
]
</script>

<template>
  <TkGanttChart 
    :tasks="tasks" 
    :row-height="64" 
    :panel-width="400" 
  />
</template>`;

  const angularCode = `<tk-gantt-chart
  [tasks]="tasks"
  [rowHeight]="64"
  [panelWidth]="400"
></tk-gantt-chart>

// component.ts
tasks = [
  { id: '1', name: 'Phase 1 - Project Scoping', startDate: '2026-04-01', endDate: '2026-04-10', progress: 100 },
  { id: '2', name: 'Phase 2 - Design Concepts', startDate: '2026-04-05', endDate: '2026-04-20', progress: 60 },
  { id: '3', name: 'Phase 3 - Prototyping and Testing', startDate: '2026-04-15', endDate: '2026-04-30', progress: 10 },
];`;

  const demo = <TkGanttChart tasks={tasks} rowHeight={64} panelWidth={400} />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default SizingLayout;
