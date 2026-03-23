import { useState } from 'react';
import { TkGanttChart, TkButton, TkCard } from '@takeoff-ui/react';
import type { IGanttTask, IGanttColumn, IGanttIndicator, IGanttHoliday, GanttViewType } from '@takeoff-ui/core';

const sampleTasks: IGanttTask[] = [
  {
    id: '1',
    name: 'Project Planning',
    startDate: '2025-03-01',
    endDate: '2025-03-15',
    progress: 100,
    children: [
      {
        id: '1-1',
        name: 'Requirements Gathering',
        startDate: '2026-03-01',
        endDate: '2026-03-05',
        progress: 100,
      },
      {
        id: '1-2',
        name: 'Architecture Design',
        startDate: '2026-03-06',
        endDate: '2026-03-10',
        progress: 100,
        children: [
          {
            id: '1-2-1',
            name: 'Frontend Architecture',
            startDate: '2026-03-06',
            endDate: '2026-03-08',
            progress: 100,
          },
          {
            id: '1-2-2',
            name: 'Backend Architecture',
            startDate: '2026-03-08',
            endDate: '2026-03-10',
            progress: 100,
          },
        ],
      },
      {
        id: '1-3',
        name: 'Resource Allocation',
        startDate: '2026-03-11',
        endDate: '2026-03-15',
        progress: 80,
      },
    ],
  },
  {
    id: '2',
    name: 'Development Phase',
    startDate: '2026-03-16',
    endDate: '2026-04-30',
    progress: 45,
    children: [
      {
        id: '2-1',
        name: 'Sprint 1',
        startDate: '2026-03-16',
        endDate: '2026-03-29',
        progress: 90,
      },
      {
        id: '2-2',
        name: 'Sprint 2',
        startDate: '2026-03-30',
        endDate: '2026-04-12',
        progress: 40,
      },
      {
        id: '2-3',
        name: 'Sprint 3',
        startDate: '2026-04-13',
        endDate: '2026-04-30',
        progress: 0,
      },
    ],
  },
  {
    id: '3',
    name: 'Testing & QA',
    startDate: '2026-05-01',
    endDate: '2026-05-20',
    progress: 0,
    children: [
      {
        id: '3-1',
        name: 'Unit Tests',
        startDate: '2026-05-01',
        endDate: '2026-05-10',
        progress: 0,
      },
      {
        id: '3-2',
        name: 'Integration Tests',
        startDate: '2026-05-11',
        endDate: '2026-05-20',
        progress: 0,
      },
    ],
  },
  {
    id: '4',
    name: 'Deployment',
    startDate: '2026-05-21',
    endDate: '2026-05-31',
    progress: 0,
  },
];

const customColumns: IGanttColumn[] = [
  { field: 'name', header: 'Task', width: '180px' },
  { field: 'startDate', header: 'Start', width: '90px' },
  { field: 'endDate', header: 'End', width: '90px' },
  {
    field: 'progress',
    header: 'Progress',
    width: '80px',
    html: (task: IGanttTask) => `<strong>${task.progress ?? 0}%</strong>`,
  },
];

const holidays: IGanttHoliday[] = [
  { date: '2026-04-23', label: 'National Sovereignty Day' },
  { date: '2026-05-01', label: 'Labour Day' },
  { date: '2026-05-19', label: 'Youth Day' },
];

const indicators: IGanttIndicator[] = [
  { date: '2026-03-18', label: 'Today', color: 'var(--primary-base)', lineStyle: 'solid' },
  { date: '2026-04-01', label: 'Freeze Date', color: '#e67e22', lineStyle: 'dashed' },
];

function GanttChart() {
  const [viewType, setViewType] = useState<GanttViewType | undefined>(undefined);
  const [highlightWeekends, setHighlightWeekends] = useState(true);
  const [hidePanel, setHidePanel] = useState(false);
  const [locale, setLocale] = useState('en-US');
  const [secondaryHeaderMode, setSecondaryHeaderMode] = useState<'days' | 'weeks'>('days');

  return (
    <div className="flex flex-col gap-6 p-4">
      <TkCard>
        <div slot="header">
          <h1 className="p-3 text-3xl font-semibold text-slate-500">Gantt Chart</h1>
        </div>
        <p className="mb-4 text-gray-600">
          A display-only Gantt chart with expandable tasks, multiple view types, two-layer headers, indicators, and customisable tooltips/task bars.
        </p>
      </TkCard>

      {/* ---------- Example 1: Basic ---------- */}
      <TkCard>
        <div slot="header">
          <h2 className="p-3 text-xl font-semibold text-slate-500">Basic Usage</h2>
        </div>
        <TkGanttChart tasks={sampleTasks} />
      </TkCard>

      {/* ---------- Example 2: View Type Controls ---------- */}
      <TkCard>
        <div slot="header">
          <h2 className="p-3 text-xl font-semibold text-slate-500">View Types</h2>
        </div>
        <div className="flex gap-2 mb-4 flex-wrap">
          <TkButton label="Auto-fit" variant={viewType === undefined ? 'primary' : 'secondary'} size="small" onTkClick={() => setViewType(undefined)} />
          <TkButton label="Weekly" variant={viewType === 'weekly' ? 'primary' : 'secondary'} size="small" onTkClick={() => setViewType('weekly')} />
          <TkButton label="Monthly" variant={viewType === 'monthly' ? 'primary' : 'secondary'} size="small" onTkClick={() => setViewType('monthly')} />
          <TkButton label="Quarterly" variant={viewType === 'quarterly' ? 'primary' : 'secondary'} size="small" onTkClick={() => setViewType('quarterly')} />
          <TkButton label="Yearly" variant={viewType === 'yearly' ? 'primary' : 'secondary'} size="small" onTkClick={() => setViewType('yearly')} />
        </div>
        <TkGanttChart tasks={sampleTasks} viewType={viewType} />
      </TkCard>

      {/* ---------- Example 3: Secondary Header Mode ---------- */}
      <TkCard>
        <div slot="header">
          <h2 className="p-3 text-xl font-semibold text-slate-500">Secondary Header Mode (Days vs Weeks)</h2>
        </div>
        <div className="flex gap-2 mb-4">
          <TkButton label="Days" variant={secondaryHeaderMode === 'days' ? 'primary' : 'secondary'} size="small" onTkClick={() => setSecondaryHeaderMode('days')} />
          <TkButton label="Weeks" variant={secondaryHeaderMode === 'weeks' ? 'primary' : 'secondary'} size="small" onTkClick={() => setSecondaryHeaderMode('weeks')} />
        </div>
        <TkGanttChart tasks={sampleTasks} viewType="monthly" secondaryHeaderMode={secondaryHeaderMode} />
      </TkCard>

      {/* ---------- Example 4: Locale ---------- */}
      <TkCard>
        <div slot="header">
          <h2 className="p-3 text-xl font-semibold text-slate-500">Locale Support</h2>
        </div>
        <div className="flex gap-2 mb-4">
          <TkButton label="English" variant={locale === 'en-US' ? 'primary' : 'secondary'} size="small" onTkClick={() => setLocale('en-US')} />
          <TkButton label="Türkçe" variant={locale === 'tr-TR' ? 'primary' : 'secondary'} size="small" onTkClick={() => setLocale('tr-TR')} />
          <TkButton label="Deutsch" variant={locale === 'de-DE' ? 'primary' : 'secondary'} size="small" onTkClick={() => setLocale('de-DE')} />
        </div>
        <TkGanttChart tasks={sampleTasks} viewType="monthly" locale={locale} secondaryHeaderMode="weeks" />
      </TkCard>

      {/* ---------- Example 5: Indicators & Holidays ---------- */}
      <TkCard>
        <div slot="header">
          <h2 className="p-3 text-xl font-semibold text-slate-500">Indicators & Holidays</h2>
        </div>
        <TkGanttChart tasks={sampleTasks} viewType="monthly" indicators={indicators} holidays={holidays} showTodayIndicator={false} />
      </TkCard>

      {/* ---------- Example 6: Weekends & Panel Toggle ---------- */}
      <TkCard>
        <div slot="header">
          <h2 className="p-3 text-xl font-semibold text-slate-500">Weekends & Panel Visibility</h2>
        </div>
        <div className="flex gap-2 mb-4">
          <TkButton label={highlightWeekends ? 'Hide Weekends' : 'Show Weekends'} variant="secondary" size="small" onTkClick={() => setHighlightWeekends(!highlightWeekends)} />
          <TkButton label={hidePanel ? 'Show Panel' : 'Hide Panel'} variant="secondary" size="small" onTkClick={() => setHidePanel(!hidePanel)} />
        </div>
        <TkGanttChart tasks={sampleTasks} viewType="monthly" highlightWeekends={highlightWeekends} hidePanel={hidePanel} />
      </TkCard>

      {/* ---------- Example 7: Custom Columns ---------- */}
      <TkCard>
        <div slot="header">
          <h2 className="p-3 text-xl font-semibold text-slate-500">Custom Columns</h2>
        </div>
        <TkGanttChart tasks={sampleTasks} viewType="monthly" columns={customColumns} />
      </TkCard>

      {/* ---------- Example 8: Custom Tooltip ---------- */}
      <TkCard>
        <div slot="header">
          <h2 className="p-3 text-xl font-semibold text-slate-500">Custom Tooltip</h2>
        </div>
        <TkGanttChart
          tasks={sampleTasks}
          viewType="monthly"
          tooltipHtml={(task: IGanttTask) => {
            const h1 = document.createElement('h1');

            h1.innerHTML = 'harun demir';

            return h1;
          }}
        />
      </TkCard>

      {/* ---------- Example 9: Custom Task Bar ---------- */}
      <TkCard>
        <div slot="header">
          <h2 className="p-3 text-xl font-semibold text-slate-500">Custom Task Bar Template</h2>
        </div>
        <TkGanttChart
          tasks={sampleTasks}
          viewType="monthly"
          taskBarHtml={(task: IGanttTask) =>
            `<div style="display:flex;align-items:center;height:100%;padding:0 6px;background:linear-gradient(90deg,#6366f1,#8b5cf6);border-radius:4px;color:#fff;font-size:11px;">
              <span>${task.name} (${task.progress ?? 0}%)</span>
            </div>`
          }
        />
      </TkCard>

      {/* ---------- Example 10: Events ---------- */}
      <TkCard>
        <div slot="header">
          <h2 className="p-3 text-xl font-semibold text-slate-500">Events (check console)</h2>
        </div>
        <TkGanttChart
          tasks={sampleTasks}
          viewType="monthly"
          onTkTaskClick={e => console.log('tk-task-click:', e.detail)}
          onTkTaskToggle={e => console.log('tk-task-toggle:', e.detail)}
        />
      </TkCard>

      {/* ---------- Example 11: Container Style ---------- */}
      <TkCard>
        <div slot="header">
          <h2 className="p-3 text-xl font-semibold text-slate-500">Container Style</h2>
        </div>
        <TkGanttChart tasks={sampleTasks} viewType="monthly" containerStyle={{ height: '300px', border: '2px solid #6366f1', borderRadius: '12px' }} />
      </TkCard>

      {/* ---------- Example 12: Week Start Day ---------- */}
      <TkCard>
        <div slot="header">
          <h2 className="p-3 text-xl font-semibold text-slate-500">Week Start Day (Sunday)</h2>
        </div>
        <TkGanttChart tasks={sampleTasks} viewType="weekly" weekStartDay={0} />
      </TkCard>

      {/* ---------- Example 13: Segments (Split Tasks) ---------- */}
      <TkCard>
        <div slot="header">
          <h2 className="p-3 text-xl font-semibold text-slate-500">Segments (Split Tasks / Multiple Bars per Row)</h2>
        </div>
        <TkGanttChart
          tasks={[
            {
              id: 'split-1',
              name: 'Split Deployment',
              startDate: '2025-01-06',
              endDate: '2025-01-31',
              segments: [
                { startDate: '2025-01-06', endDate: '2025-01-10', progress: 100, label: 'Phase A' },
                { startDate: '2025-01-15', endDate: '2025-01-20', progress: 60, label: 'Phase B' },
                { startDate: '2025-01-25', endDate: '2025-01-31', progress: 0, label: 'Phase C' },
              ],
            },
            {
              id: 'split-2',
              name: 'Recurring Maintenance',
              startDate: '2025-01-01',
              endDate: '2025-01-28',
              segments: [
                { startDate: '2025-01-01', endDate: '2025-01-03', label: 'Window 1', style: { background: 'var(--warning-base)' } },
                { startDate: '2025-01-13', endDate: '2025-01-15', label: 'Window 2', style: { background: 'var(--warning-base)' } },
                { startDate: '2025-01-27', endDate: '2025-01-28', label: 'Window 3', style: { background: 'var(--warning-base)' } },
              ],
            },
            {
              id: 'normal-1',
              name: 'Normal Task (no segments)',
              startDate: '2025-01-08',
              endDate: '2025-01-22',
              progress: 45,
            },
          ]}
          viewType="monthly"
        />
      </TkCard>
    </div>
  );
}

export default GanttChart;
