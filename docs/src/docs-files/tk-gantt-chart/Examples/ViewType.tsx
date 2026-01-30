import { TkGanttChart } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const tasks = [
  {
    id: 1,
    name: 'Sprint 1',
    startDate: '2025-02-01',
    endDate: '2025-02-14',
    progress: 100,
    color: '#3B82F6',
  },
  {
    id: 2,
    name: 'Sprint 2',
    startDate: '2025-02-15',
    endDate: '2025-02-28',
    progress: 60,
    color: '#10B981',
  },
  {
    id: 3,
    name: 'Sprint 3',
    startDate: '2025-03-01',
    endDate: '2025-03-14',
    progress: 0,
    color: '#F59E0B',
  },
];

const ViewType = () => {
  const [viewType, setViewType] = useState<'day' | 'week' | 'month'>('week');

  const reactCode = `import { TkGanttChart } from '@takeoff-ui/react';
import { useState } from 'react';

const [viewType, setViewType] = useState('week');

const tasks = [
  {
    id: 1,
    name: 'Sprint 1',
    startDate: '2025-02-01',
    endDate: '2025-02-14',
    progress: 100,
    color: '#3B82F6',
  },
  {
    id: 2,
    name: 'Sprint 2',
    startDate: '2025-02-15',
    endDate: '2025-02-28',
    progress: 60,
    color: '#10B981',
  },
  {
    id: 3,
    name: 'Sprint 3',
    startDate: '2025-03-01',
    endDate: '2025-03-14',
    progress: 0,
    color: '#F59E0B',
  },
];

<TkGanttChart 
  tasks={tasks} 
  viewType={viewType}
  onTkViewChange={(e) => setViewType(e.detail)}
/>`;

  const vueCode = `<script setup>
import { TkGanttChart } from '@takeoff-ui/vue';
import { ref } from 'vue';

const viewType = ref('week');

const tasks = [
  {
    id: 1,
    name: 'Sprint 1',
    startDate: '2025-02-01',
    endDate: '2025-02-14',
    progress: 100,
    color: '#3B82F6',
  },
  {
    id: 2,
    name: 'Sprint 2',
    startDate: '2025-02-15',
    endDate: '2025-02-28',
    progress: 60,
    color: '#10B981',
  },
  {
    id: 3,
    name: 'Sprint 3',
    startDate: '2025-03-01',
    endDate: '2025-03-14',
    progress: 0,
    color: '#F59E0B',
  },
];
</script>

<template>
  <TkGanttChart 
    :tasks.prop="tasks" 
    :viewType="viewType"
    @tk-view-change="(e) => viewType = e.detail"
  />
</template>`;

  const angularCode = `<tk-gantt-chart 
  [tasks]="tasks" 
  [viewType]="viewType"
  (tkViewChange)="onViewChange($event)">
</tk-gantt-chart>

// In component.ts
viewType = 'week';

onViewChange(event: CustomEvent) {
  this.viewType = event.detail;
}`;

  const demo = (
    <div>
      <TkGanttChart tasks={tasks} viewType={viewType} onTkViewChange={(e: CustomEvent) => setViewType(e.detail)} />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode} />;
};

export default ViewType;
