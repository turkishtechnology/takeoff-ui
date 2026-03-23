import { TkGanttChart } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const tasks = [
  { id: '1', name: 'Task A', startDate: '2026-04-01', endDate: '2026-04-14', progress: 100 },
  { id: '2', name: 'Task B', startDate: '2026-04-10', endDate: '2026-04-25', progress: 50 },
  { id: '3', name: 'Task C', startDate: '2026-04-20', endDate: '2026-05-05', progress: 20 },
];

const columns = [
  { field: 'name', header: 'Task', width: '160px' },
  { field: 'startDate', header: 'Start', width: '100px' },
  { field: 'endDate', header: 'End', width: '100px' },
  {
    field: 'progress',
    header: 'Progress',
    width: '80px',
    html: task => `<strong>${task.progress ?? 0}%</strong>`,
  },
];

const Example = () => {
  return <TkGanttChart tasks={tasks} columns={columns} panelWidth={440} />;
};

const Columns = () => {
  const reactCode = `const tasks = [
  { id: '1', name: 'Task A', startDate: '2026-04-01', endDate: '2026-04-14', progress: 100 },
  { id: '2', name: 'Task B', startDate: '2026-04-10', endDate: '2026-04-25', progress: 50 },
  { id: '3', name: 'Task C', startDate: '2026-04-20', endDate: '2026-05-05', progress: 20 },
];

const columns = [
  { field: 'name', header: 'Task', width: '160px' },
  { field: 'startDate', header: 'Start', width: '100px' },
  { field: 'endDate', header: 'End', width: '100px' },
  {
    field: 'progress',
    header: 'Progress',
    width: '80px',
    html: (task) => \`<strong>\${task.progress ?? 0}%</strong>\`,
  },
];

<TkGanttChart tasks={tasks} columns={columns} panelWidth={440} />`;

  const vueCode = `<script setup>
import { TkGanttChart } from '@takeoff-ui/vue'

const tasks = [
  { id: '1', name: 'Task A', startDate: '2026-04-01', endDate: '2026-04-14', progress: 100 },
  { id: '2', name: 'Task B', startDate: '2026-04-10', endDate: '2026-04-25', progress: 50 },
  { id: '3', name: 'Task C', startDate: '2026-04-20', endDate: '2026-05-05', progress: 20 },
]

const columns = [
  { field: 'name', header: 'Task', width: '160px' },
  { field: 'startDate', header: 'Start', width: '100px' },
  { field: 'endDate', header: 'End', width: '100px' },
  {
    field: 'progress',
    header: 'Progress',
    width: '80px',
    html: (task) => \`<strong>\${task.progress ?? 0}%</strong>\`,
  },
]
</script>

<template>
  <TkGanttChart :tasks="tasks" :columns="columns" :panel-width="440" />
</template>`;

  const angularCode = `<tk-gantt-chart
  [tasks]="tasks"
  [columns]="columns"
  [panel-width]="440"
></tk-gantt-chart>

// component.ts
tasks = [
  { id: '1', name: 'Task A', startDate: '2026-04-01', endDate: '2026-04-14', progress: 100 },
  { id: '2', name: 'Task B', startDate: '2026-04-10', endDate: '2026-04-25', progress: 50 },
  { id: '3', name: 'Task C', startDate: '2026-04-20', endDate: '2026-05-05', progress: 20 },
];

columns = [
  { field: 'name', header: 'Task', width: '160px' },
  { field: 'startDate', header: 'Start', width: '100px' },
  { field: 'endDate', header: 'End', width: '100px' },
  {
    field: 'progress',
    header: 'Progress',
    width: '80px',
    html: (task) => \`<strong>\${task.progress ?? 0}%</strong>\`,
  },
];`;

  const demo = <Example />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Columns;
