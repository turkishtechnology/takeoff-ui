import { TkGanttChart } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const tasks = [
  {
    id: '1',
    name: 'Design Phase',
    startDate: '2026-04-01',
    endDate: '2026-04-30',
    segments: [
      { startDate: '2026-04-01', endDate: '2026-04-10', label: 'Research', progress: 100 },
      { startDate: '2026-04-15', endDate: '2026-04-25', label: 'Prototyping', progress: 60 },
    ],
  },
  {
    id: '2',
    name: 'Development',
    startDate: '2026-04-10',
    endDate: '2026-05-20',
    segments: [
      { startDate: '2026-04-10', endDate: '2026-04-22', label: 'Sprint 1', progress: 100 },
      { startDate: '2026-04-25', endDate: '2026-05-08', label: 'Sprint 2', progress: 40 },
      { startDate: '2026-05-10', endDate: '2026-05-20', label: 'Sprint 3', progress: 0 },
    ],
  },
  { id: '3', name: 'Release', startDate: '2026-05-18', endDate: '2026-05-25', progress: 0 },
];

const Segments = () => {
  const reactCode = `const tasks = [
  {
    id: '1',
    name: 'Design Phase',
    startDate: '2026-04-01',
    endDate: '2026-04-30',
    segments: [
      { startDate: '2026-04-01', endDate: '2026-04-10', label: 'Research', progress: 100 },
      { startDate: '2026-04-15', endDate: '2026-04-25', label: 'Prototyping', progress: 60 },
    ],
  },
  {
    id: '2',
    name: 'Development',
    startDate: '2026-04-10',
    endDate: '2026-05-20',
    segments: [
      { startDate: '2026-04-10', endDate: '2026-04-22', label: 'Sprint 1', progress: 100 },
      { startDate: '2026-04-25', endDate: '2026-05-08', label: 'Sprint 2', progress: 40 },
      { startDate: '2026-05-10', endDate: '2026-05-20', label: 'Sprint 3', progress: 0 },
    ],
  },
  { id: '3', name: 'Release', startDate: '2026-05-18', endDate: '2026-05-25', progress: 0 },
];

<TkGanttChart tasks={tasks} />`;

  const vueCode = `<script setup>
import { TkGanttChart } from '@takeoff-ui/vue'

const tasks = [
  {
    id: '1',
    name: 'Design Phase',
    startDate: '2026-04-01',
    endDate: '2026-04-30',
    segments: [
      { startDate: '2026-04-01', endDate: '2026-04-10', label: 'Research', progress: 100 },
      { startDate: '2026-04-15', endDate: '2026-04-25', label: 'Prototyping', progress: 60 },
    ],
  },
  {
    id: '2',
    name: 'Development',
    startDate: '2026-04-10',
    endDate: '2026-05-20',
    segments: [
      { startDate: '2026-04-10', endDate: '2026-04-22', label: 'Sprint 1', progress: 100 },
      { startDate: '2026-04-25', endDate: '2026-05-08', label: 'Sprint 2', progress: 40 },
      { startDate: '2026-05-10', endDate: '2026-05-20', label: 'Sprint 3', progress: 0 },
    ],
  },
  { id: '3', name: 'Release', startDate: '2026-05-18', endDate: '2026-05-25', progress: 0 },
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
    name: 'Design Phase',
    startDate: '2026-04-01',
    endDate: '2026-04-30',
    segments: [
      { startDate: '2026-04-01', endDate: '2026-04-10', label: 'Research', progress: 100 },
      { startDate: '2026-04-15', endDate: '2026-04-25', label: 'Prototyping', progress: 60 },
    ],
  },
  {
    id: '2',
    name: 'Development',
    startDate: '2026-04-10',
    endDate: '2026-05-20',
    segments: [
      { startDate: '2026-04-10', endDate: '2026-04-22', label: 'Sprint 1', progress: 100 },
      { startDate: '2026-04-25', endDate: '2026-05-08', label: 'Sprint 2', progress: 40 },
      { startDate: '2026-05-10', endDate: '2026-05-20', label: 'Sprint 3', progress: 0 },
    ],
  },
  { id: '3', name: 'Release', startDate: '2026-05-18', endDate: '2026-05-25', progress: 0 },
];`;

  const demo = <TkGanttChart tasks={tasks} />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Segments;
