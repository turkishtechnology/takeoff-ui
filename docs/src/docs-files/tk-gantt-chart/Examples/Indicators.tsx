import { TkGanttChart } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const tasks = [
  { id: '1', name: 'Research', startDate: '2026-04-01', endDate: '2026-04-12', progress: 100 },
  { id: '2', name: 'Design', startDate: '2026-04-10', endDate: '2026-04-22', progress: 50 },
  { id: '3', name: 'Development', startDate: '2026-04-20', endDate: '2026-05-10', progress: 20 },
];

const indicators = [
  { date: '2026-04-07', label: 'Kickoff', color: '#2563eb', lineStyle: 'solid' },
  { date: '2026-04-25', label: 'Milestone', color: '#f59e0b', lineStyle: 'dashed' },
  { date: '2026-05-05', label: 'Deadline', color: '#ef4444', lineStyle: 'solid' },
];

const Indicators = () => {
  const reactCode = `const tasks = [
  { id: '1', name: 'Research', startDate: '2026-04-01', endDate: '2026-04-12', progress: 100 },
  { id: '2', name: 'Design', startDate: '2026-04-10', endDate: '2026-04-22', progress: 50 },
  { id: '3', name: 'Development', startDate: '2026-04-20', endDate: '2026-05-10', progress: 20 },
];

const indicators = [
  { date: '2026-04-07', label: 'Kickoff', color: '#2563eb', lineStyle: 'solid' },
  { date: '2026-04-25', label: 'Milestone', color: '#f59e0b', lineStyle: 'dashed' },
  { date: '2026-05-05', label: 'Deadline', color: '#ef4444', lineStyle: 'solid' },
];

<TkGanttChart tasks={tasks} indicators={indicators} showTodayIndicator={true} />`;

  const vueCode = `<script setup>
import { TkGanttChart } from '@takeoff-ui/vue'

const tasks = [
  { id: '1', name: 'Research', startDate: '2026-04-01', endDate: '2026-04-12', progress: 100 },
  { id: '2', name: 'Design', startDate: '2026-04-10', endDate: '2026-04-22', progress: 50 },
  { id: '3', name: 'Development', startDate: '2026-04-20', endDate: '2026-05-10', progress: 20 },
]

const indicators = [
  { date: '2026-04-07', label: 'Kickoff', color: '#2563eb', lineStyle: 'solid' },
  { date: '2026-04-25', label: 'Milestone', color: '#f59e0b', lineStyle: 'dashed' },
  { date: '2026-05-05', label: 'Deadline', color: '#ef4444', lineStyle: 'solid' },
]
</script>

<template>
  <TkGanttChart :tasks="tasks" :indicators="indicators" :show-today-indicator="true" />
</template>`;

  const angularCode = `<tk-gantt-chart
  [tasks]="tasks"
  [indicators]="indicators"
  [show-today-indicator]="true"
></tk-gantt-chart>

// component.ts
tasks = [
  { id: '1', name: 'Research', startDate: '2026-04-01', endDate: '2026-04-12', progress: 100 },
  { id: '2', name: 'Design', startDate: '2026-04-10', endDate: '2026-04-22', progress: 50 },
  { id: '3', name: 'Development', startDate: '2026-04-20', endDate: '2026-05-10', progress: 20 },
];

indicators = [
  { date: '2026-04-07', label: 'Kickoff', color: '#2563eb', lineStyle: 'solid' },
  { date: '2026-04-25', label: 'Milestone', color: '#f59e0b', lineStyle: 'dashed' },
  { date: '2026-05-05', label: 'Deadline', color: '#ef4444', lineStyle: 'solid' },
];`;

  const demo = <TkGanttChart tasks={tasks} indicators={indicators} showTodayIndicator={true} />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Indicators;
