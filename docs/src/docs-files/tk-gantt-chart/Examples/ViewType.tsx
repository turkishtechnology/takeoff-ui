import { TkGanttChart } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

const tasks = [
  { id: '1', name: 'Sprint Planning', startDate: '2026-04-01', endDate: '2026-04-03', progress: 100 },
  { id: '2', name: 'Development', startDate: '2026-04-04', endDate: '2026-05-15', progress: 60 },
  { id: '3', name: 'QA Testing', startDate: '2026-05-10', endDate: '2026-06-10', progress: 20 },
  { id: '4', name: 'Release', startDate: '2026-06-01', endDate: '2026-07-01', progress: 0 },
];

const Example = () => {
  const [viewType, setViewType] = useState('monthly');

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {['weekly', 'monthly', 'quarterly', 'yearly'].map(vt => (
          <button key={vt} className={`px-3 py-1 rounded text-sm ${viewType === vt ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => setViewType(vt)}>
            {vt.charAt(0).toUpperCase() + vt.slice(1)}
          </button>
        ))}
      </div>
      <TkGanttChart tasks={tasks} viewType={viewType} />
    </div>
  );
};

const ViewType = () => {
  const reactCode = `const [viewType, setViewType] = useState('monthly');

const tasks = [
  { id: '1', name: 'Sprint Planning', startDate: '2026-04-01', endDate: '2026-04-03', progress: 100 },
  { id: '2', name: 'Development', startDate: '2026-04-04', endDate: '2026-05-15', progress: 60 },
  { id: '3', name: 'QA Testing', startDate: '2026-05-10', endDate: '2026-06-10', progress: 20 },
  { id: '4', name: 'Release', startDate: '2026-06-01', endDate: '2026-07-01', progress: 0 },
];

<TkGanttChart tasks={tasks} viewType="weekly" />
<TkGanttChart tasks={tasks} viewType="monthly" />
<TkGanttChart tasks={tasks} viewType="quarterly" />
<TkGanttChart tasks={tasks} viewType="yearly" />`;

  const vueCode = `<script setup>
import { ref } from 'vue'
import { TkGanttChart } from '@takeoff-ui/vue'

const viewType = ref('monthly')

const tasks = [
  { id: '1', name: 'Sprint Planning', startDate: '2026-04-01', endDate: '2026-04-03', progress: 100 },
  { id: '2', name: 'Development', startDate: '2026-04-04', endDate: '2026-05-15', progress: 60 },
  { id: '3', name: 'QA Testing', startDate: '2026-05-10', endDate: '2026-06-10', progress: 20 },
  { id: '4', name: 'Release', startDate: '2026-06-01', endDate: '2026-07-01', progress: 0 },
]
</script>

<template>
  <TkGanttChart :tasks="tasks" :view-type="viewType" />
</template>`;

  const angularCode = `<tk-gantt-chart [tasks]="tasks" view-type="monthly"></tk-gantt-chart>

// component.ts
tasks = [
  { id: '1', name: 'Sprint Planning', startDate: '2026-04-01', endDate: '2026-04-03', progress: 100 },
  { id: '2', name: 'Development', startDate: '2026-04-04', endDate: '2026-05-15', progress: 60 },
  { id: '3', name: 'QA Testing', startDate: '2026-05-10', endDate: '2026-06-10', progress: 20 },
  { id: '4', name: 'Release', startDate: '2026-06-01', endDate: '2026-07-01', progress: 0 },
];`;

  const demo = <Example />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default ViewType;
