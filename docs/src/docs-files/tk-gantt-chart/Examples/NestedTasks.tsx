import { TkGanttChart } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const tasks = [
  {
    id: '1',
    name: 'Backend',
    startDate: '2026-04-01',
    endDate: '2026-05-10',
    progress: 60,
    children: [
      { id: '1-1', name: 'API Design', startDate: '2026-04-01', endDate: '2026-04-10', progress: 100 },
      { id: '1-2', name: 'Database Schema', startDate: '2026-04-08', endDate: '2026-04-18', progress: 80 },
      { id: '1-3', name: 'Implementation', startDate: '2026-04-15', endDate: '2026-05-10', progress: 30 },
    ],
  },
  {
    id: '2',
    name: 'Frontend',
    startDate: '2026-04-10',
    endDate: '2026-05-15',
    progress: 40,
    children: [
      { id: '2-1', name: 'Wireframes', startDate: '2026-04-10', endDate: '2026-04-18', progress: 100 },
      { id: '2-2', name: 'UI Development', startDate: '2026-04-18', endDate: '2026-05-08', progress: 50 },
      { id: '2-3', name: 'Integration', startDate: '2026-05-05', endDate: '2026-05-15', progress: 0 },
    ],
  },
  { id: '3', name: 'Deployment', startDate: '2026-05-12', endDate: '2026-05-20', progress: 0 },
];

const NestedTasks = () => {
  const reactCode = `const tasks = [
  {
    id: '1',
    name: 'Backend',
    startDate: '2026-04-01',
    endDate: '2026-05-10',
    progress: 60,
    children: [
      { id: '1-1', name: 'API Design', startDate: '2026-04-01', endDate: '2026-04-10', progress: 100 },
      { id: '1-2', name: 'Database Schema', startDate: '2026-04-08', endDate: '2026-04-18', progress: 80 },
      { id: '1-3', name: 'Implementation', startDate: '2026-04-15', endDate: '2026-05-10', progress: 30 },
    ],
  },
  {
    id: '2',
    name: 'Frontend',
    startDate: '2026-04-10',
    endDate: '2026-05-15',
    progress: 40,
    children: [
      { id: '2-1', name: 'Wireframes', startDate: '2026-04-10', endDate: '2026-04-18', progress: 100 },
      { id: '2-2', name: 'UI Development', startDate: '2026-04-18', endDate: '2026-05-08', progress: 50 },
      { id: '2-3', name: 'Integration', startDate: '2026-05-05', endDate: '2026-05-15', progress: 0 },
    ],
  },
  { id: '3', name: 'Deployment', startDate: '2026-05-12', endDate: '2026-05-20', progress: 0 },
];

<TkGanttChart tasks={tasks} />`;

  const vueCode = `<script setup>
import { TkGanttChart } from '@takeoff-ui/vue'

const tasks = [
  {
    id: '1',
    name: 'Backend',
    startDate: '2026-04-01',
    endDate: '2026-05-10',
    progress: 60,
    children: [
      { id: '1-1', name: 'API Design', startDate: '2026-04-01', endDate: '2026-04-10', progress: 100 },
      { id: '1-2', name: 'Database Schema', startDate: '2026-04-08', endDate: '2026-04-18', progress: 80 },
      { id: '1-3', name: 'Implementation', startDate: '2026-04-15', endDate: '2026-05-10', progress: 30 },
    ],
  },
  {
    id: '2',
    name: 'Frontend',
    startDate: '2026-04-10',
    endDate: '2026-05-15',
    progress: 40,
    children: [
      { id: '2-1', name: 'Wireframes', startDate: '2026-04-10', endDate: '2026-04-18', progress: 100 },
      { id: '2-2', name: 'UI Development', startDate: '2026-04-18', endDate: '2026-05-08', progress: 50 },
      { id: '2-3', name: 'Integration', startDate: '2026-05-05', endDate: '2026-05-15', progress: 0 },
    ],
  },
  { id: '3', name: 'Deployment', startDate: '2026-05-12', endDate: '2026-05-20', progress: 0 },
]
</script>

<template>
  <TkGanttChart :tasks="tasks" />
</template>`;

  const angularCode = `<tk-gantt-chart [tasks]="tasks"></tk-gantt-chart>

// component.ts
tasks = [
  {
    id: '1',
    name: 'Backend',
    startDate: '2026-04-01',
    endDate: '2026-05-10',
    progress: 60,
    children: [
      { id: '1-1', name: 'API Design', startDate: '2026-04-01', endDate: '2026-04-10', progress: 100 },
      { id: '1-2', name: 'Database Schema', startDate: '2026-04-08', endDate: '2026-04-18', progress: 80 },
      { id: '1-3', name: 'Implementation', startDate: '2026-04-15', endDate: '2026-05-10', progress: 30 },
    ],
  },
  {
    id: '2',
    name: 'Frontend',
    startDate: '2026-04-10',
    endDate: '2026-05-15',
    progress: 40,
    children: [
      { id: '2-1', name: 'Wireframes', startDate: '2026-04-10', endDate: '2026-04-18', progress: 100 },
      { id: '2-2', name: 'UI Development', startDate: '2026-04-18', endDate: '2026-05-08', progress: 50 },
      { id: '2-3', name: 'Integration', startDate: '2026-05-05', endDate: '2026-05-15', progress: 0 },
    ],
  },
  { id: '3', name: 'Deployment', startDate: '2026-05-12', endDate: '2026-05-20', progress: 0 },
];`;

  const demo = <TkGanttChart tasks={tasks} />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default NestedTasks;
