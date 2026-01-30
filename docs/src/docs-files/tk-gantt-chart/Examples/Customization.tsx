import { TkGanttChart } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const tasks = [
  {
    id: 1,
    name: 'Research & Analysis',
    startDate: '2025-02-01',
    endDate: '2025-02-10',
    progress: 100,
    color: '#8B5CF6',
  },
  {
    id: 2,
    name: 'UI/UX Design',
    startDate: '2025-02-08',
    endDate: '2025-02-20',
    progress: 80,
    color: '#EC4899',
  },
  {
    id: 3,
    name: 'Frontend Development',
    startDate: '2025-02-18',
    endDate: '2025-03-05',
    progress: 45,
    color: '#06B6D4',
  },
  {
    id: 4,
    name: 'Backend Development',
    startDate: '2025-02-20',
    endDate: '2025-03-10',
    progress: 30,
    color: '#14B8A6',
  },
  {
    id: 5,
    name: 'QA Testing',
    startDate: '2025-03-05',
    endDate: '2025-03-15',
    progress: 0,
    color: '#F97316',
  },
];

const Customization = () => {
  const reactCode = `import { TkGanttChart } from '@takeoff-ui/react';

const tasks = [
  {
    id: 1,
    name: 'Research & Analysis',
    startDate: '2025-02-01',
    endDate: '2025-02-10',
    progress: 100,
    color: '#8B5CF6',
  },
  {
    id: 2,
    name: 'UI/UX Design',
    startDate: '2025-02-08',
    endDate: '2025-02-20',
    progress: 80,
    color: '#EC4899',
  },
  // ... more tasks
];

<TkGanttChart 
  tasks={tasks} 
  rowHeight={50}
  showProgress={true}
  showTooltip={true}
  locale="tr-TR"
/>`;

  const vueCode = `<script setup>
import { TkGanttChart } from '@takeoff-ui/vue';

const tasks = [
  {
    id: 1,
    name: 'Research & Analysis',
    startDate: '2025-02-01',
    endDate: '2025-02-10',
    progress: 100,
    color: '#8B5CF6',
  },
  {
    id: 2,
    name: 'UI/UX Design',
    startDate: '2025-02-08',
    endDate: '2025-02-20',
    progress: 80,
    color: '#EC4899',
  },
  // ... more tasks
];
</script>

<template>
  <TkGanttChart 
    :tasks.prop="tasks" 
    :rowHeight="50"
    :showProgress="true"
    :showTooltip="true"
    locale="tr-TR"
  />
</template>`;

  const angularCode = `<tk-gantt-chart 
  [tasks]="tasks" 
  [rowHeight]="50"
  [showProgress]="true"
  [showTooltip]="true"
  locale="tr-TR">
</tk-gantt-chart>`;

  const demo = (
    <div>
      <TkGanttChart tasks={tasks} rowHeight={50} showProgress={true} showTooltip={true} locale="tr-TR" />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode} />;
};

export default Customization;
