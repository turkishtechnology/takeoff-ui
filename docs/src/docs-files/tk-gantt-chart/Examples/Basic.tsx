import { TkGanttChart } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Basic = () => {
  const tasks = [
    { id: '1', name: 'Research', startDate: '2026-04-01', endDate: '2026-04-10', progress: 100 },
    { id: '2', name: 'Design', startDate: '2026-04-08', endDate: '2026-04-18', progress: 75 },
    { id: '3', name: 'Development', startDate: '2026-04-15', endDate: '2026-05-05', progress: 40 },
    { id: '4', name: 'Testing', startDate: '2026-05-01', endDate: '2026-05-12', progress: 0 },
    { id: '5', name: 'Deployment', startDate: '2026-05-10', endDate: '2026-05-15', progress: 0 },
  ];

  const reactCode = `const tasks = [
  { id: '1', name: 'Research', startDate: '2026-04-01', endDate: '2026-04-10', progress: 100 },
  { id: '2', name: 'Design', startDate: '2026-04-08', endDate: '2026-04-18', progress: 75 },
  { id: '3', name: 'Development', startDate: '2026-04-15', endDate: '2026-05-05', progress: 40 },
  { id: '4', name: 'Testing', startDate: '2026-05-01', endDate: '2026-05-12', progress: 0 },
  { id: '5', name: 'Deployment', startDate: '2026-05-10', endDate: '2026-05-15', progress: 0 },
];

<TkGanttChart tasks={tasks} />`;

  const vueCode = `<script setup>
import { TkGanttChart } from '@takeoff-ui/vue'

const tasks = [
  { id: '1', name: 'Research', startDate: '2026-04-01', endDate: '2026-04-10', progress: 100 },
  { id: '2', name: 'Design', startDate: '2026-04-08', endDate: '2026-04-18', progress: 75 },
  { id: '3', name: 'Development', startDate: '2026-04-15', endDate: '2026-05-05', progress: 40 },
  { id: '4', name: 'Testing', startDate: '2026-05-01', endDate: '2026-05-12', progress: 0 },
  { id: '5', name: 'Deployment', startDate: '2026-05-10', endDate: '2026-05-15', progress: 0 },
]
</script>

<template>
  <TkGanttChart :tasks="tasks" />
</template>`;

  const angularCode = `<tk-gantt-chart [tasks]="tasks"></tk-gantt-chart>

// component.ts
tasks = [
  { id: '1', name: 'Research', startDate: '2026-04-01', endDate: '2026-04-10', progress: 100 },
  { id: '2', name: 'Design', startDate: '2026-04-08', endDate: '2026-04-18', progress: 75 },
  { id: '3', name: 'Development', startDate: '2026-04-15', endDate: '2026-05-05', progress: 40 },
  { id: '4', name: 'Testing', startDate: '2026-05-01', endDate: '2026-05-12', progress: 0 },
  { id: '5', name: 'Deployment', startDate: '2026-05-10', endDate: '2026-05-15', progress: 0 },
];`;

  const demo = <TkGanttChart tasks={tasks} />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Basic;
