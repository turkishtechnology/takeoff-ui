import { TkGanttChart } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import * as React from 'react';

const TooltipHtml = () => {
  const tasks = [
    { id: '1', name: 'Research', startDate: '2026-04-01', endDate: '2026-04-10', progress: 100, customDetail: 'Market analysis' },
    { id: '2', name: 'Design', startDate: '2026-04-08', endDate: '2026-04-18', progress: 75, customDetail: 'UI/UX mockups' },
    { id: '3', name: 'Development', startDate: '2026-04-15', endDate: '2026-05-05', progress: 40, customDetail: 'Frontend & Backend' },
  ];

  const tooltipHtml = (task: any) =>
    `<div style="padding: 4px; display: flex; flex-direction: column; gap: 6px; min-width: 180px;">
      <div style="display: flex; align-items: center; gap: 6px; border-bottom: 1px solid var(--tk-color-border-subtle); padding-bottom: 6px;">
      <tk-icon icon="calendar_month" size="small"></tk-icon>
      <span style="font-weight: bold; font-size: 14px;">${task.name}</span>
      </div>
      <div style="font-size: 12px; display: flex; flex-direction: column; gap: 4px;">
        <div style="display: flex; justify-content: space-between;">
          <span style="color: var(--tk-color-text-subtlest);">Timeline:</span>
          <span>${task.startDate} / ${task.endDate}</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: var(--tk-color-text-subtlest);">Deliverable:</span>
          <strong>${task.customDetail}</strong>
        </div>
      </div>
      <div style="margin-top: 4px;">
        <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
          <span style="color: var(--tk-color-text-subtlest);">Progress</span>
          <strong>${task.progress}%</strong>
        </div>
        <div style="background: var(--tk-color-border-subtle); border-radius: 4px; height: 6px; width: 100%; overflow: hidden;">
          <div style="background: var(--tk-color-primary); width: ${task.progress}%; height: 100%;"></div>
        </div>
      </div>
    </div>`;

  const reactCode = `const tasks = [
  { id: '1', name: 'Research', startDate: '2026-04-01', endDate: '2026-04-10', progress: 100, customDetail: 'Market analysis' },
  { id: '2', name: 'Design', startDate: '2026-04-08', endDate: '2026-04-18', progress: 75, customDetail: 'UI/UX mockups' },
  { id: '3', name: 'Development', startDate: '2026-04-15', endDate: '2026-05-05', progress: 40, customDetail: 'Frontend & Backend' },
];

const tooltipHtml = (task) =>
  \`<div style="padding: 4px; display: flex; flex-direction: column; gap: 6px; min-width: 180px;">
    <div style="display: flex; align-items: center; gap: 6px; border-bottom: 1px solid var(--tk-color-border-subtle); padding-bottom: 6px;">
      <tk-icon name="calendar" style="color: #f9fafc"></tk-icon>
      <span style="font-weight: bold; font-size: 14px;">\${task.name}</span>
    </div>
    <div style="font-size: 12px; display: flex; flex-direction: column; gap: 4px;">
      <div style="display: flex; justify-content: space-between;">
        <span style="color: var(--tk-color-text-subtlest);">Timeline:</span>
        <span>\${task.startDate} / \${task.endDate}</span>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span style="color: var(--tk-color-text-subtlest);">Deliverable:</span>
        <strong>\${task.customDetail}</strong>
      </div>
    </div>
    <div style="margin-top: 4px;">
      <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
        <span style="color: var(--tk-color-text-subtlest);">Progress</span>
        <strong>\${task.progress}%</strong>
      </div>
      <div style="background: var(--tk-color-border-subtle); border-radius: 4px; height: 6px; width: 100%; overflow: hidden;">
        <div style="background: var(--tk-color-primary); width: \${task.progress}%; height: 100%;"></div>
      </div>
    </div>
  </div>\`;

<TkGanttChart tasks={tasks} tooltipHtml={tooltipHtml} />`;

  const vueCode = `<script setup>
import { TkGanttChart } from '@takeoff-ui/vue'

const tasks = [
  { id: '1', name: 'Research', startDate: '2026-04-01', endDate: '2026-04-10', progress: 100, customDetail: 'Market analysis' },
  { id: '2', name: 'Design', startDate: '2026-04-08', endDate: '2026-04-18', progress: 75, customDetail: 'UI/UX mockups' },
  { id: '3', name: 'Development', startDate: '2026-04-15', endDate: '2026-05-05', progress: 40, customDetail: 'Frontend & Backend' },
]

const tooltipHtml = (task) =>
  \`<div style="padding: 4px; display: flex; flex-direction: column; gap: 6px; min-width: 180px;">
    <div style="display: flex; align-items: center; gap: 6px; border-bottom: 1px solid var(--tk-color-border-subtle); padding-bottom: 6px;">
      <tk-icon name="calendar" style="color: var(--tk-color-primary)"></tk-icon>
      <span style="font-weight: bold; font-size: 14px;">\${task.name}</span>
    </div>
    <div style="font-size: 12px; display: flex; flex-direction: column; gap: 4px;">
      <div style="display: flex; justify-content: space-between;">
        <span style="color: var(--tk-color-text-subtlest);">Timeline:</span>
        <span>\${task.startDate} / \${task.endDate}</span>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span style="color: var(--tk-color-text-subtlest);">Deliverable:</span>
        <strong>\${task.customDetail}</strong>
      </div>
    </div>
    <div style="margin-top: 4px;">
      <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
        <span style="color: var(--tk-color-text-subtlest);">Progress</span>
        <strong>\${task.progress}%</strong>
      </div>
      <div style="background: var(--tk-color-border-subtle); border-radius: 4px; height: 6px; width: 100%; overflow: hidden;">
        <div style="background: var(--tk-color-primary); width: \${task.progress}%; height: 100%;"></div>
      </div>
    </div>
  </div>\`;
</script>

<template>
  <TkGanttChart :tasks="tasks" :tooltip-html="tooltipHtml" />
</template>`;

  const angularCode = `<tk-gantt-chart
  [tasks]="tasks"
  [tooltipHtml]="tooltipHtml"
></tk-gantt-chart>

// component.ts
tasks = [
  { id: '1', name: 'Research', startDate: '2026-04-01', endDate: '2026-04-10', progress: 100, customDetail: 'Market analysis' },
  { id: '2', name: 'Design', startDate: '2026-04-08', endDate: '2026-04-18', progress: 75, customDetail: 'UI/UX mockups' },
  { id: '3', name: 'Development', startDate: '2026-04-15', endDate: '2026-05-05', progress: 40, customDetail: 'Frontend & Backend' },
];

tooltipHtml = (task: any) =>
  \`<div style="padding: 4px; display: flex; flex-direction: column; gap: 6px; min-width: 180px;">
    <div style="display: flex; align-items: center; gap: 6px; border-bottom: 1px solid var(--tk-color-border-subtle); padding-bottom: 6px;">
      <tk-icon name="calendar" style="color: var(--tk-color-primary)"></tk-icon>
      <span style="font-weight: bold; font-size: 14px;">\${task.name}</span>
    </div>
    <div style="font-size: 12px; display: flex; flex-direction: column; gap: 4px;">
      <div style="display: flex; justify-content: space-between;">
        <span style="color: var(--tk-color-text-subtlest);">Timeline:</span>
        <span>\${task.startDate} / \${task.endDate}</span>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span style="color: var(--tk-color-text-subtlest);">Deliverable:</span>
        <strong>\${task.customDetail}</strong>
      </div>
    </div>
    <div style="margin-top: 4px;">
      <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
        <span style="color: var(--tk-color-text-subtlest);">Progress</span>
        <strong>\${task.progress}%</strong>
      </div>
      <div style="background: var(--tk-color-border-subtle); border-radius: 4px; height: 6px; width: 100%; overflow: hidden;">
        <div style="background: var(--tk-color-primary); width: \${task.progress}%; height: 100%;"></div>
      </div>
    </div>
  </div>\`;`;

  const demo = <TkGanttChart tasks={tasks} tooltipHtml={tooltipHtml} />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default TooltipHtml;
