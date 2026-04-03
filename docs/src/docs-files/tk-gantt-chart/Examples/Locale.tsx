import { TkGanttChart } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import * as React from 'react';

const Locale = () => {
  const tasks = [
    { id: '1', name: 'Araştırma', startDate: '2026-04-01', endDate: '2026-04-10', progress: 100 },
    { id: '2', name: 'Tasarım', startDate: '2026-04-08', endDate: '2026-04-18', progress: 75 },
    { id: '3', name: 'Geliştirme', startDate: '2026-04-15', endDate: '2026-05-05', progress: 40 },
  ];

  const reactCode = `const tasks = [
  { id: '1', name: 'Araştırma', startDate: '2026-04-01', endDate: '2026-04-10', progress: 100 },
  { id: '2', name: 'Tasarım', startDate: '2026-04-08', endDate: '2026-04-18', progress: 75 },
  { id: '3', name: 'Geliştirme', startDate: '2026-04-15', endDate: '2026-05-05', progress: 40 },
];

<TkGanttChart tasks={tasks} locale="tr-TR" />`;

  const vueCode = `<script setup>
import { TkGanttChart } from '@takeoff-ui/vue'

const tasks = [
  { id: '1', name: 'Araştırma', startDate: '2026-04-01', endDate: '2026-04-10', progress: 100 },
  { id: '2', name: 'Tasarım', startDate: '2026-04-08', endDate: '2026-04-18', progress: 75 },
  { id: '3', name: 'Geliştirme', startDate: '2026-04-15', endDate: '2026-05-05', progress: 40 },
]
</script>

<template>
  <TkGanttChart :tasks="tasks" locale="tr-TR" />
</template>`;

  const angularCode = `<tk-gantt-chart
  [tasks]="tasks"
  locale="tr-TR"
></tk-gantt-chart>

// component.ts
tasks = [
  { id: '1', name: 'Araştırma', startDate: '2026-04-01', endDate: '2026-04-10', progress: 100 },
  { id: '2', name: 'Tasarım', startDate: '2026-04-08', endDate: '2026-04-18', progress: 75 },
  { id: '3', name: 'Geliştirme', startDate: '2026-04-15', endDate: '2026-05-05', progress: 40 },
];`;

  const demo = <TkGanttChart tasks={tasks} locale="tr-TR" />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Locale;
