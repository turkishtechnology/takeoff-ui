import { TkGanttChart } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import * as React from 'react';

const Weekend = () => {
  const tasks = [
    { id: '1', name: 'Task A', startDate: '2026-04-01', endDate: '2026-04-14', progress: 100 },
    { id: '2', name: 'Task B', startDate: '2026-04-10', endDate: '2026-04-25', progress: 50 },
    { id: '3', name: 'Task C', startDate: '2026-04-20', endDate: '2026-05-05', progress: 20 },
  ];

  const reactCode = `const tasks = [
  { id: '1', name: 'Task A', startDate: '2026-04-01', endDate: '2026-04-14', progress: 100 },
  { id: '2', name: 'Task B', startDate: '2026-04-10', endDate: '2026-04-25', progress: 50 },
  { id: '3', name: 'Task C', startDate: '2026-04-20', endDate: '2026-05-05', progress: 20 },
];

<TkGanttChart tasks={tasks} highlightWeekends={false} />`;

  const vueCode = `<script setup>
import { TkGanttChart } from '@takeoff-ui/vue'

const tasks = [
  { id: '1', name: 'Task A', startDate: '2026-04-01', endDate: '2026-04-14', progress: 100 },
  { id: '2', name: 'Task B', startDate: '2026-04-10', endDate: '2026-04-25', progress: 50 },
  { id: '3', name: 'Task C', startDate: '2026-04-20', endDate: '2026-05-05', progress: 20 },
]
</script>

<template>
  <TkGanttChart :tasks="tasks" :highlight-weekends="false" />
</template>`;

  const angularCode = `<tk-gantt-chart
  [tasks]="tasks"
  [highlightWeekends]="false"
></tk-gantt-chart>

// component.ts
tasks = [
  { id: '1', name: 'Task A', startDate: '2026-04-01', endDate: '2026-04-14', progress: 100 },
  { id: '2', name: 'Task B', startDate: '2026-04-10', endDate: '2026-04-25', progress: 50 },
  { id: '3', name: 'Task C', startDate: '2026-04-20', endDate: '2026-05-05', progress: 20 },
];`;

  const demo = <TkGanttChart tasks={tasks} highlightWeekends={false} />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Weekend;
