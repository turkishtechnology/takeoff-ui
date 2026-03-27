import { TkGanttChart } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const tasks = [
  { id: '1', name: 'Sprint 1', startDate: '2026-04-01', endDate: '2026-04-15', progress: 80 },
  { id: '2', name: 'Sprint 2', startDate: '2026-04-16', endDate: '2026-04-30', progress: 30 },
];

const holidays = [
  { date: '2026-04-10', label: 'Company Holiday' },
  { date: '2026-04-23', label: 'National Holiday' },
];

const Holidays = () => {
  const reactCode = `const tasks = [
  { id: '1', name: 'Sprint 1', startDate: '2026-04-01', endDate: '2026-04-15', progress: 80 },
  { id: '2', name: 'Sprint 2', startDate: '2026-04-16', endDate: '2026-04-30', progress: 30 },
];

const holidays = [
  { date: '2026-04-10', label: 'Company Holiday' },
  { date: '2026-04-23', label: 'National Holiday' },
];

<TkGanttChart tasks={tasks} holidays={holidays} highlightWeekends={true} />`;

  const vueCode = `<script setup>
import { TkGanttChart } from '@takeoff-ui/vue'

const tasks = [
  { id: '1', name: 'Sprint 1', startDate: '2026-04-01', endDate: '2026-04-15', progress: 80 },
  { id: '2', name: 'Sprint 2', startDate: '2026-04-16', endDate: '2026-04-30', progress: 30 },
]

const holidays = [
  { date: '2026-04-10', label: 'Company Holiday' },
  { date: '2026-04-23', label: 'National Holiday' },
]
</script>

<template>
  <TkGanttChart :tasks="tasks" :holidays="holidays" :highlight-weekends="true" />
</template>`;

  const angularCode = `<tk-gantt-chart
  [tasks]="tasks"
  [holidays]="holidays"
  [highlight-weekends]="true"
></tk-gantt-chart>

// component.ts
tasks = [
  { id: '1', name: 'Sprint 1', startDate: '2026-04-01', endDate: '2026-04-15', progress: 80 },
  { id: '2', name: 'Sprint 2', startDate: '2026-04-16', endDate: '2026-04-30', progress: 30 },
];

holidays = [
  { date: '2026-04-10', label: 'Company Holiday' },
  { date: '2026-04-23', label: 'National Holiday' },
];`;

  const demo = <TkGanttChart tasks={tasks} holidays={holidays} highlightWeekends={true} />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Holidays;
