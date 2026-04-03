import { TkGanttChart } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import * as React from 'react';

const WeekStartDay = () => {
  const tasks = [
    { id: '1', name: 'Task Alpha', startDate: '2026-04-05', endDate: '2026-04-19', progress: 40 },
    { id: '2', name: 'Task Beta', startDate: '2026-04-10', endDate: '2026-04-25', progress: 15 },
  ];

  const reactCode = `const tasks = [
  { id: '1', name: 'Task Alpha', startDate: '2026-04-05', endDate: '2026-04-19', progress: 40 },
  { id: '2', name: 'Task Beta', startDate: '2026-04-10', endDate: '2026-04-25', progress: 15 },
];

{/* weekStartDay=1 sets the week to start on Monday (0 is Sunday) */}
<TkGanttChart 
  tasks={tasks} 
  viewType="weekly"
  weekStartDay={1} 
/>`;

  const vueCode = `<script setup>
import { TkGanttChart } from '@takeoff-ui/vue'

const tasks = [
  { id: '1', name: 'Task Alpha', startDate: '2026-04-05', endDate: '2026-04-19', progress: 40 },
  { id: '2', name: 'Task Beta', startDate: '2026-04-10', endDate: '2026-04-25', progress: 15 },
]
</script>

<template>
  <!-- weekStartDay=1 sets the week to start on Monday (0 is Sunday) -->
  <TkGanttChart 
    :tasks="tasks" 
    view-type="weekly"
    :week-start-day="1" 
  />
</template>`;

  const angularCode = `<!-- weekStartDay=1 sets the week to start on Monday (0 is Sunday) -->
<tk-gantt-chart
  [tasks]="tasks"
  viewType="weekly"
  [weekStartDay]="1"
></tk-gantt-chart>

// component.ts
tasks = [
  { id: '1', name: 'Task Alpha', startDate: '2026-04-05', endDate: '2026-04-19', progress: 40 },
  { id: '2', name: 'Task Beta', startDate: '2026-04-10', endDate: '2026-04-25', progress: 15 },
];`;

  const demo = <TkGanttChart tasks={tasks} viewType="weekly" weekStartDay={2} />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default WeekStartDay;
