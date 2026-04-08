import { TkGanttChart } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import * as React from 'react';

const SecondaryHeader = () => {
  const tasks = [
    { id: '1', name: 'Phase 1', startDate: '2026-04-01', endDate: '2026-04-30', progress: 80 },
    { id: '2', name: 'Phase 2', startDate: '2026-05-01', endDate: '2026-05-31', progress: 10 },
  ];

  const reactCode = `const tasks = [
  { id: '1', name: 'Phase 1', startDate: '2026-04-01', endDate: '2026-04-30', progress: 80 },
  { id: '2', name: 'Phase 2', startDate: '2026-05-01', endDate: '2026-05-31', progress: 10 },
];

<TkGanttChart 
  tasks={tasks} 
  viewType="monthly"
  secondaryHeaderMode="weeks" 
/>`;

  const vueCode = `<script setup>
import { TkGanttChart } from '@takeoff-ui/vue'

const tasks = [
  { id: '1', name: 'Phase 1', startDate: '2026-04-01', endDate: '2026-04-30', progress: 80 },
  { id: '2', name: 'Phase 2', startDate: '2026-05-01', endDate: '2026-05-31', progress: 10 },
]
</script>

<template>
  <TkGanttChart 
    :tasks="tasks" 
    view-type="monthly"
    secondary-header-mode="weeks" 
  />
</template>`;

  const angularCode = `<tk-gantt-chart
  [tasks]="tasks"
  viewType="monthly"
  secondaryHeaderMode="weeks"
></tk-gantt-chart>

// component.ts
tasks = [
  { id: '1', name: 'Phase 1', startDate: '2026-04-01', endDate: '2026-04-30', progress: 80 },
  { id: '2', name: 'Phase 2', startDate: '2026-05-01', endDate: '2026-05-31', progress: 10 },
];`;

  // Showing months with weekly secondary headers
  const demo = <TkGanttChart tasks={tasks} viewType="monthly" secondaryHeaderMode="weeks" />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default SecondaryHeader;
