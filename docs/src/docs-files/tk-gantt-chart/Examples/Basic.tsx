import { TkGanttChart } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const tasks = [
  {
    id: 1,
    name: 'Project Planning',
    startDate: '2025-02-01',
    endDate: '2025-02-07',
    progress: 100,
    color: '#3B82F6',
  },
  {
    id: 2,
    name: 'Design Phase',
    startDate: '2025-02-05',
    endDate: '2025-02-15',
    progress: 75,
    color: '#10B981',
  },
  {
    id: 3,
    name: 'Development',
    startDate: '2025-02-12',
    endDate: '2025-02-28',
    progress: 30,
    color: '#F59E0B',
  },
  {
    id: 4,
    name: 'Testing',
    startDate: '2025-02-25',
    endDate: '2025-03-05',
    progress: 0,
    color: '#EF4444',
  },
];

const Basic = () => {
  const reactCode = `import { TkGanttChart } from '@takeoff-ui/react';

const tasks = [
  {
    id: 1,
    name: 'Project Planning',
    startDate: '2025-02-01',
    endDate: '2025-02-07',
    progress: 100,
    color: '#3B82F6',
  },
  {
    id: 2,
    name: 'Design Phase',
    startDate: '2025-02-05',
    endDate: '2025-02-15',
    progress: 75,
    color: '#10B981',
  },
  {
    id: 3,
    name: 'Development',
    startDate: '2025-02-12',
    endDate: '2025-02-28',
    progress: 30,
    color: '#F59E0B',
  },
  {
    id: 4,
    name: 'Testing',
    startDate: '2025-02-25',
    endDate: '2025-03-05',
    progress: 0,
    color: '#EF4444',
  },
];

<TkGanttChart tasks={tasks} />`;

  const vueCode = `<script setup>
import { TkGanttChart } from '@takeoff-ui/vue';

const tasks = [
  {
    id: 1,
    name: 'Project Planning',
    startDate: '2025-02-01',
    endDate: '2025-02-07',
    progress: 100,
    color: '#3B82F6',
  },
  {
    id: 2,
    name: 'Design Phase',
    startDate: '2025-02-05',
    endDate: '2025-02-15',
    progress: 75,
    color: '#10B981',
  },
  {
    id: 3,
    name: 'Development',
    startDate: '2025-02-12',
    endDate: '2025-02-28',
    progress: 30,
    color: '#F59E0B',
  },
  {
    id: 4,
    name: 'Testing',
    startDate: '2025-02-25',
    endDate: '2025-03-05',
    progress: 0,
    color: '#EF4444',
  },
];
</script>

<template>
  <TkGanttChart :tasks.prop="tasks" />
</template>`;

  const angularCode = `<tk-gantt-chart [tasks]="tasks"></tk-gantt-chart>

// In component.ts
tasks = [
  {
    id: 1,
    name: 'Project Planning',
    startDate: '2025-02-01',
    endDate: '2025-02-07',
    progress: 100,
    color: '#3B82F6',
  },
  {
    id: 2,
    name: 'Design Phase',
    startDate: '2025-02-05',
    endDate: '2025-02-15',
    progress: 75,
    color: '#10B981',
  },
  {
    id: 3,
    name: 'Development',
    startDate: '2025-02-12',
    endDate: '2025-02-28',
    progress: 30,
    color: '#F59E0B',
  },
  {
    id: 4,
    name: 'Testing',
    startDate: '2025-02-25',
    endDate: '2025-03-05',
    progress: 0,
    color: '#EF4444',
  },
];`;

  const demo = (
    <div>
      <TkGanttChart tasks={tasks} />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode} />;
};

export default Basic;
