import { TkGanttChart } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';

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
];

const TaskClick = () => {
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const handleTaskClick = (e: CustomEvent) => {
    setSelectedTask(e.detail);
  };

  const reactCode = `import { TkGanttChart } from '@takeoff-ui/react';
import { useState } from 'react';

const [selectedTask, setSelectedTask] = useState(null);

const handleTaskClick = (e) => {
  setSelectedTask(e.detail);
  console.log('Task clicked:', e.detail);
};

<TkGanttChart 
  tasks={tasks} 
  onTkTaskClick={handleTaskClick}
/>

{selectedTask && (
  <div>
    <p>Selected: {selectedTask.task.name}</p>
    <p>Progress: {selectedTask.task.progress}%</p>
  </div>
)}`;

  const vueCode = `<script setup>
import { TkGanttChart } from '@takeoff-ui/vue';
import { ref } from 'vue';

const selectedTask = ref(null);

const handleTaskClick = (e) => {
  selectedTask.value = e.detail;
  console.log('Task clicked:', e.detail);
};
</script>

<template>
  <TkGanttChart 
    :tasks.prop="tasks" 
    @tk-task-click="handleTaskClick"
  />
  <div v-if="selectedTask">
    <p>Selected: {{ selectedTask.task.name }}</p>
    <p>Progress: {{ selectedTask.task.progress }}%</p>
  </div>
</template>`;

  const angularCode = `<tk-gantt-chart 
  [tasks]="tasks" 
  (tkTaskClick)="onTaskClick($event)">
</tk-gantt-chart>

<div *ngIf="selectedTask">
  <p>Selected: {{ selectedTask.task.name }}</p>
  <p>Progress: {{ selectedTask.task.progress }}%</p>
</div>

// In component.ts
selectedTask: any = null;

onTaskClick(event: CustomEvent) {
  this.selectedTask = event.detail;
  console.log('Task clicked:', event.detail);
}`;

  const demo = (
    <div>
      <TkGanttChart tasks={tasks} onTkTaskClick={handleTaskClick} />
      {selectedTask && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p className="font-semibold">Selected Task: {selectedTask.task.name}</p>
          <p>Progress: {selectedTask.task.progress}%</p>
          <p>Start: {selectedTask.task.startDate}</p>
          <p>End: {selectedTask.task.endDate}</p>
        </div>
      )}
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode} />;
};

export default TaskClick;
