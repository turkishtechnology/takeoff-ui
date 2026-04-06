import { TkGanttChart, TkRadioGroup, TkRadio } from '@takeoff-ui/react';
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
      <div className="mb-4">
        <TkRadioGroup label="View Type" value={viewType} direction="horizontal" onTkChange={e => setViewType(e.detail)}>
          {['weekly', 'monthly', 'quarterly', 'yearly'].map(vt => (
            <TkRadio key={vt} value={vt} label={vt.charAt(0).toUpperCase() + vt.slice(1)} />
          ))}
        </TkRadioGroup>
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
