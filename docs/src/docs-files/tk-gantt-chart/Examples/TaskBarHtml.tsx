import { TkGanttChart } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import * as React from 'react';

const TaskBarHtml = () => {
  const tasks = [
    { id: '1', name: 'Research', startDate: '2026-04-01', endDate: '2026-04-10', progress: 100 },
    { id: '2', name: 'Design', startDate: '2026-04-08', endDate: '2026-04-18', progress: 75 },
    { id: '3', name: 'Development', startDate: '2026-04-15', endDate: '2026-05-05', progress: 40 },
  ];

  const taskBarHtml = (task: any) => {
    const p = task.progress ?? 0;
    const bg = `linear-gradient(to right, #4caf50 ${p}%, #83d397 ${p}%)`;
    return `<div style="display:flex;align-items:center;gap:4px;border-radius:4px;padding:0 8px;background:${bg};">
      <tk-icon icon="rocket" color="#fff" size="small"></tk-icon>
      <span style="font-weight:bold;color:#fff;">${task.name}</span>
    </div>`;
  };

  const reactCode = `const tasks = [
  { id: '1', name: 'Research', startDate: '2026-04-01', endDate: '2026-04-10', progress: 100 },
  { id: '2', name: 'Design', startDate: '2026-04-08', endDate: '2026-04-18', progress: 75 },
  { id: '3', name: 'Development', startDate: '2026-04-15', endDate: '2026-05-05', progress: 40 },
];

const taskBarHtml = (task) => {
  const p = task.progress ?? 0;
  const bg = \`linear-gradient(to right, #4caf50 \${p}%, #83d397\${p}%)\`;
  return \`<div style="display:flex;align-items:center;gap:4px;border-radius:4px;padding:0 8px;background:\${bg};">
    <tk-icon icon="rocket" color="#fff" size="small"></tk-icon>
    <span style="font-weight:bold;color:#fff;">\${task.name}</span>
  </div>\`;
};

<TkGanttChart tasks={tasks} taskBarHtml={taskBarHtml} />`;

  const vueCode = `<script setup>
import { TkGanttChart } from '@takeoff-ui/vue'

const tasks = [
  { id: '1', name: 'Research', startDate: '2026-04-01', endDate: '2026-04-10', progress: 100 },
  { id: '2', name: 'Design', startDate: '2026-04-08', endDate: '2026-04-18', progress: 75 },
  { id: '3', name: 'Development', startDate: '2026-04-15', endDate: '2026-05-05', progress: 40 },
]

const taskBarHtml = (task) => {
  const p = task.progress ?? 0;
  const bg = \`linear-gradient(to right, #4caf50 \${p}%, #83d397 \${p}%)\`;
  return \`<div style="display:flex;align-items:center;gap:4px;border-radius:4px;padding:0 8px;background:\${bg};">
    <tk-icon icon="rocket" color="#fff" size="small"></tk-icon>
    <span style="font-weight:bold;color:#fff;">\${task.name}</span>
  </div>\`;
};
</script>

<template>
  <TkGanttChart :tasks="tasks" :task-bar-html="taskBarHtml" />
</template>`;

  const angularCode = `<tk-gantt-chart
  [tasks]="tasks"
  [taskBarHtml]="taskBarHtml"
></tk-gantt-chart>

// component.ts
tasks = [
  { id: '1', name: 'Research', startDate: '2026-04-01', endDate: '2026-04-10', progress: 100 },
  { id: '2', name: 'Design', startDate: '2026-04-08', endDate: '2026-04-18', progress: 75 },
  { id: '3', name: 'Development', startDate: '2026-04-15', endDate: '2026-05-05', progress: 40 },
];

taskBarHtml = (task: any) => {
  const p = task.progress ?? 0;
  const bg = \`linear-gradient(to right, #4caf50 \${p}%, #83d397 \${p}%)\`;
  return \`<div style="display:flex;align-items:center;gap:4px;border-radius:4px;padding:0 8px;background:\${bg};">
    <tk-icon icon="rocket" color="#fff" size="small"></tk-icon>
    <span style="font-weight:bold;color:#fff;">\${task.name}</span>
  </div>\`;
};`;

  const demo = <TkGanttChart tasks={tasks} taskBarHtml={taskBarHtml} />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default TaskBarHtml;
