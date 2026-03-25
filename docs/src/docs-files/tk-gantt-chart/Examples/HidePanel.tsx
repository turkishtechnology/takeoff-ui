import { TkGanttChart } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const tasks = [
  { id: '1', name: 'Research', startDate: '2026-04-01', endDate: '2026-04-10', progress: 100 },
  { id: '2', name: 'Design', startDate: '2026-04-08', endDate: '2026-04-18', progress: 75 },
  { id: '3', name: 'Development', startDate: '2026-04-15', endDate: '2026-05-05', progress: 40 },
];

const HidePanel = () => {
  const reactCode = `const tasks = [
  { id: '1', name: 'Research', startDate: '2026-04-01', endDate: '2026-04-10', progress: 100 },
  { id: '2', name: 'Design', startDate: '2026-04-08', endDate: '2026-04-18', progress: 75 },
  { id: '3', name: 'Development', startDate: '2026-04-15', endDate: '2026-05-05', progress: 40 },
];

<TkGanttChart tasks={tasks} hidePanel={true} />`;

  const vueCode = `<script setup>
import { TkGanttChart } from '@takeoff-ui/vue'

const tasks = [
  { id: '1', name: 'Research', startDate: '2026-04-01', endDate: '2026-04-10', progress: 100 },
  { id: '2', name: 'Design', startDate: '2026-04-08', endDate: '2026-04-18', progress: 75 },
  { id: '3', name: 'Development', startDate: '2026-04-15', endDate: '2026-05-05', progress: 40 },
]
</script>

<template>
  <TkGanttChart :tasks="tasks" :hide-panel="true" />
</template>`;

  const angularCode = `<tk-gantt-chart [tasks]="tasks" [hide-panel]="true"></tk-gantt-chart>

// component.ts
tasks = [
  { id: '1', name: 'Research', startDate: '2026-04-01', endDate: '2026-04-10', progress: 100 },
  { id: '2', name: 'Design', startDate: '2026-04-08', endDate: '2026-04-18', progress: 75 },
  { id: '3', name: 'Development', startDate: '2026-04-15', endDate: '2026-05-05', progress: 40 },
];`;

  const demo = <TkGanttChart tasks={tasks} hidePanel={true} />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default HidePanel;
