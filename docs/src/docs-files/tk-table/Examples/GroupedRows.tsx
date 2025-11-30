import { ITableColumn } from '@takeoff-ui/core';
import { TkButton, TkTable, TkAlert } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useRef, useState, useEffect } from 'react';

const GroupedRows = () => {
  const controlledTableRef = useRef<HTMLTkTableElement>(null);
  const uncontrolledTableRef = useRef<HTMLTkTableElement>(null);

  // Controlled table state
  const [controlledGroupBy, setControlledGroupBy] = useState<string>('status');
  const [controlledSelectedRows, setControlledSelectedRows] = useState<any[]>([]);
  const [uncontrolledSelectedRows, setUncontrolledSelectedRows] = useState<any[]>([]);

  // Enhanced sample data for better grouping demonstration
  const sampleData = [
    { id: 1, name: 'Website Redesign', status: 'In Progress', priority: 'High', department: 'Design', assignee: 'Alice Johnson', budget: 15000 },
    { id: 2, name: 'API Development', status: 'In Progress', priority: 'High', department: 'Engineering', assignee: 'Bob Smith', budget: 25000 },
    { id: 3, name: 'Database Migration', status: 'Completed', priority: 'Critical', department: 'Engineering', assignee: 'Charlie Brown', budget: 12000 },
    { id: 4, name: 'Marketing Campaign', status: 'Planning', priority: 'Medium', department: 'Marketing', assignee: 'Diana Prince', budget: 8000 },
    { id: 5, name: 'User Testing', status: 'Completed', priority: 'High', department: 'Design', assignee: 'Eve Wilson', budget: 5000 },
    { id: 6, name: 'Security Audit', status: 'In Progress', priority: 'Critical', department: 'Engineering', assignee: 'Frank Miller', budget: 18000 },
    { id: 7, name: 'Content Creation', status: 'Planning', priority: 'Medium', department: 'Marketing', assignee: 'Grace Lee', budget: 6000 },
    { id: 8, name: 'Mobile App Testing', status: 'Completed', priority: 'Low', department: 'QA', assignee: 'Henry Davis', budget: 4000 },
    { id: 9, name: 'SEO Optimization', status: 'Planning', priority: 'Medium', department: 'Marketing', assignee: 'Ivy Chen', budget: 7500 },
    { id: 10, name: 'Performance Optimization', status: 'In Progress', priority: 'High', department: 'Engineering', assignee: 'Jack Thompson', budget: 20000 },
    { id: 11, name: 'Brand Guidelines', status: 'Completed', priority: 'Low', department: 'Design', assignee: 'Kate Rodriguez', budget: 3000 },
    { id: 12, name: 'Load Testing', status: 'Planning', priority: 'Medium', department: 'QA', assignee: "Liam O'Connor", budget: 5500 },
  ];

  const [data] = useState(sampleData);

  // Column definitions with enhanced headers
  const columns: ITableColumn[] = [
    {
      header: 'Project Name',
      field: 'name',
      sortable: true,
      searchable: true,
      width: '200px',
    },
    {
      header: 'Status',
      field: 'status',
      sortable: true,
      searchable: true,
      width: '120px',
    },
    {
      header: 'Priority',
      field: 'priority',
      sortable: true,
      searchable: true,
      width: '100px',
    },
    {
      header: 'Department',
      field: 'department',
      sortable: true,
      searchable: true,
      width: '120px',
    },
    {
      header: 'Assignee',
      field: 'assignee',
      sortable: true,
      searchable: true,
      width: '150px',
    },
    {
      header: 'Budget',
      field: 'budget',
      sortable: true,
      width: '100px',
      html: row => `$${row.budget.toLocaleString()}`,
    },
  ];

  // Controlled table handlers
  const handleControlledGrouping = (field: string) => {
    setControlledGroupBy(field);
  };

  const clearControlledGrouping = () => {
    setControlledGroupBy('');
  };

  // Uncontrolled table handlers (using imperative methods)
  const handleUncontrolledGrouping = async (field: string) => {
    await uncontrolledTableRef.current?.groupByColumn(field);
  };

  const clearUncontrolledGrouping = async () => {
    await uncontrolledTableRef.current?.clearGrouping();
  };

  // Selection change handlers
  const handleControlledSelectionChange = (e: any) => {
    console.log('🎛️ Controlled selection changed:', e.detail);
    setControlledSelectedRows(e.detail);
  };

  const handleUncontrolledSelectionChange = (e: any) => {
    console.log('🔧 Uncontrolled selection changed:', e.detail);
    setUncontrolledSelectedRows(e.detail);
  };

  // Group by change handlers
  const handleControlledGroupByChange = (e: any) => {
    console.log('🎛️ Controlled groupBy changed to:', e.detail || 'none');
  };

  const handleUncontrolledGroupByChange = (e: any) => {
    console.log('🔧 Uncontrolled groupBy changed to:', e.detail || 'none');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Info Alert */}
      <TkAlert variant="info" style={{ marginBottom: '16px' }} message="Open your browser's developer console to see detailed logging of grouping operations and state changes." />

      {/* Controlled Table Section */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>🎛️ Controlled Grouping (State-driven)</h3>
          <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#64748b' }}>
            Current groupBy value: <strong style={{ color: '#0f172a' }}>{controlledGroupBy || 'none'}</strong>
          </p>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
            <TkButton onTkClick={() => handleControlledGrouping('status')} label="Group by Status" type="outlined" size="small" />
            <TkButton onTkClick={() => handleControlledGrouping('priority')} label="Group by Priority" type="outlined" size="small" />
            <TkButton onTkClick={() => handleControlledGrouping('department')} label="Group by Department" type="outlined" size="small" />
            <TkButton onTkClick={clearControlledGrouping} label="Clear Grouping" type="text" size="small" />
          </div>
        </div>

        <TkTable
          ref={controlledTableRef}
          dataKey="id"
          size="base"
          cardTitle="Controlled Table - State Management"
          rowsPerPage={8}
          paginationMethod="client"
          totalItems={data.length}
          columns={columns}
          data={data}
          selectionMode="checkbox"
          selection={controlledSelectedRows}
          onTkSelectionChange={handleControlledSelectionChange}
          onTkGroupByChange={handleControlledGroupByChange}
          groupBy={controlledGroupBy}
          striped={true}
        />
      </div>

      {/* Uncontrolled Table Section */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#f0f9ff',
          borderRadius: '8px',
          border: '1px solid #0ea5e9',
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>🔧 Uncontrolled Grouping (Method-driven)</h3>
          <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#64748b' }}>
            Grouping is controlled internally via imperative methods. Use the buttons below to trigger grouping changes.
          </p>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
            <TkButton onTkClick={() => handleUncontrolledGrouping('status')} label="Group by Status" type="outlined" size="small" />
            <TkButton onTkClick={() => handleUncontrolledGrouping('priority')} label="Group by Priority" type="outlined" size="small" />
            <TkButton onTkClick={() => handleUncontrolledGrouping('department')} label="Group by Department" type="outlined" size="small" />
            <TkButton onTkClick={clearUncontrolledGrouping} label="Clear Grouping" type="text" size="small" />
          </div>
        </div>

        <TkTable
          ref={uncontrolledTableRef}
          dataKey="id"
          size="base"
          cardTitle="Uncontrolled Table - Method Calls"
          rowsPerPage={8}
          paginationMethod="client"
          totalItems={data.length}
          columns={columns}
          data={data}
          selectionMode="checkbox"
          selection={uncontrolledSelectedRows}
          onTkSelectionChange={handleUncontrolledSelectionChange}
          onTkGroupByChange={handleUncontrolledGroupByChange}
          striped={true}
        />
      </div>

      {/* Usage Examples */}
      <div
        style={{
          padding: '16px',
          backgroundColor: '#fefce8',
          borderRadius: '8px',
          border: '1px solid #facc15',
        }}
      >
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600' }}>💡 Key Features:</h4>
        <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '12px', color: '#713f12' }}>
          <li>
            <strong>Controlled Grouping:</strong> Use the <code>groupBy</code> prop with React state for external control
          </li>
          <li>
            <strong>Uncontrolled Grouping:</strong> Use <code>groupByColumn()</code> and <code>clearGrouping()</code> methods
          </li>
          <li>
            <strong>Event Handling:</strong> Listen to <code>onTkGroupByChange</code> for grouping state changes
          </li>
          <li>
            <strong>Visual Grouping:</strong> Rows are visually grouped with headers showing group name and count
          </li>
          <li>
            <strong>Pagination Support:</strong> Grouping works seamlessly with both client and server-side pagination
          </li>
          <li>
            <strong>Selection Persistence:</strong> Row selection is maintained across grouping changes
          </li>
        </ul>
      </div>
    </div>
  );
};

const Example = () => {
  return <GroupedRows />;
};

const GroupedRowsDemo = () => {
  const reactCode = `import { ITableColumn } from '@takeoff-ui/core';
import { TkButton, TkTable } from '@takeoff-ui/react';
import { useRef, useState } from 'react';

function GroupedRowsExample() {
  const controlledTableRef = useRef<HTMLTkTableElement>(null);
  const uncontrolledTableRef = useRef<HTMLTkTableElement>(null);

  // Controlled table state
  const [controlledGroupBy, setControlledGroupBy] = useState<string>('status');
  const [controlledSelectedRows, setControlledSelectedRows] = useState<any[]>([]);
  const [uncontrolledSelectedRows, setUncontrolledSelectedRows] = useState<any[]>([]);

  // Sample data
  const sampleData = [
    { id: 1, name: 'Website Redesign', status: 'In Progress', priority: 'High', department: 'Design' },
    { id: 2, name: 'API Development', status: 'In Progress', priority: 'High', department: 'Engineering' },
    { id: 3, name: 'Database Migration', status: 'Completed', priority: 'Critical', department: 'Engineering' },
    { id: 4, name: 'Marketing Campaign', status: 'Planning', priority: 'Medium', department: 'Marketing' },
    // ... more data
  ];

  const columns: ITableColumn[] = [
    { header: 'Project Name', field: 'name', sortable: true, searchable: true },
    { header: 'Status', field: 'status', sortable: true, searchable: true },
    { header: 'Priority', field: 'priority', sortable: true, searchable: true },
    { header: 'Department', field: 'department', sortable: true, searchable: true },
  ];

  // Controlled grouping handlers
  const handleControlledGrouping = (field: string) => {
    setControlledGroupBy(field);
  };

  const clearControlledGrouping = () => {
    setControlledGroupBy('');
  };

  // Uncontrolled grouping handlers (using imperative methods)
  const handleUncontrolledGrouping = async (field: string) => {
    await uncontrolledTableRef.current?.groupByColumn(field);
  };

  const clearUncontrolledGrouping = async () => {
    await uncontrolledTableRef.current?.clearGrouping();
  };

  // Event handlers
  const handleControlledSelectionChange = (e: any) => {
    setControlledSelectedRows(e.detail);
  };

  const handleControlledGroupByChange = (e: any) => {
    console.log('GroupBy changed to:', e.detail || 'none');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Controlled Table */}
      <div>
        <h3>🎛️ Controlled Grouping (State-driven)</h3>
        <p>Current groupBy: <strong>{controlledGroupBy || 'none'}</strong></p>
        
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <TkButton onTkClick={() => handleControlledGrouping('status')} label="Group by Status" type="outlined" />
          <TkButton onTkClick={() => handleControlledGrouping('priority')} label="Group by Priority" type="outlined" />
          <TkButton onTkClick={() => handleControlledGrouping('department')} label="Group by Department" type="outlined" />
          <TkButton onTkClick={clearControlledGrouping} label="Clear Grouping" type="text" />
        </div>

        <TkTable
          ref={controlledTableRef}
          dataKey="id"
          cardTitle="Controlled Table"
          rowsPerPage={8}
          paginationMethod="client"
          columns={columns}
          data={sampleData}
          selectionMode="checkbox"
          selection={controlledSelectedRows}
          onTkSelectionChange={handleControlledSelectionChange}
          onTkGroupByChange={handleControlledGroupByChange}
          groupBy={controlledGroupBy}
          striped={true}
        />
      </div>

      {/* Uncontrolled Table */}
      <div>
        <h3>🔧 Uncontrolled Grouping (Method-driven)</h3>
        <p>Grouping controlled internally via imperative methods</p>
        
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <TkButton onTkClick={() => handleUncontrolledGrouping('status')} label="Group by Status" type="outlined" />
          <TkButton onTkClick={() => handleUncontrolledGrouping('priority')} label="Group by Priority" type="outlined" />
          <TkButton onTkClick={() => handleUncontrolledGrouping('department')} label="Group by Department" type="outlined" />
          <TkButton onTkClick={clearUncontrolledGrouping} label="Clear Grouping" type="text" />
        </div>

        <TkTable
          ref={uncontrolledTableRef}
          dataKey="id"
          cardTitle="Uncontrolled Table"
          rowsPerPage={8}
          paginationMethod="client"
          columns={columns}
          data={sampleData}
          selectionMode="checkbox"
          selection={uncontrolledSelectedRows}
          onTkSelectionChange={handleUncontrolledSelectionChange}
          onTkGroupByChange={handleUncontrolledGroupByChange}
          striped={true}
        />
      </div>
    </div>
  );
}`;

  const vueCode = `<script setup>
import { ITableColumn } from '@takeoff-ui/core';
import { TkButton, TkTable } from '@takeoff-ui/vue';
import { ref } from 'vue';

const controlledTableRef = ref(null);
const uncontrolledTableRef = ref(null);

// Controlled table state
const controlledGroupBy = ref('status');
const controlledSelectedRows = ref([]);
const uncontrolledSelectedRows = ref([]);

// Sample data
const sampleData = [
  { id: 1, name: 'Website Redesign', status: 'In Progress', priority: 'High', department: 'Design' },
  { id: 2, name: 'API Development', status: 'In Progress', priority: 'High', department: 'Engineering' },
  { id: 3, name: 'Database Migration', status: 'Completed', priority: 'Critical', department: 'Engineering' },
  { id: 4, name: 'Marketing Campaign', status: 'Planning', priority: 'Medium', department: 'Marketing' },
  // ... more data
];

const columns = [
  { header: 'Project Name', field: 'name', sortable: true, searchable: true },
  { header: 'Status', field: 'status', sortable: true, searchable: true },
  { header: 'Priority', field: 'priority', sortable: true, searchable: true },
  { header: 'Department', field: 'department', sortable: true, searchable: true },
];

// Controlled grouping handlers
const handleControlledGrouping = (field) => {
  controlledGroupBy.value = field;
};

const clearControlledGrouping = () => {
  controlledGroupBy.value = '';
};

// Uncontrolled grouping handlers
const handleUncontrolledGrouping = async (field) => {
  await uncontrolledTableRef.value?.groupByColumn(field);
};

const clearUncontrolledGrouping = async () => {
  await uncontrolledTableRef.value?.clearGrouping();
};

// Event handlers
const handleControlledSelectionChange = (e) => {
  controlledSelectedRows.value = e.detail;
};

const handleControlledGroupByChange = (e) => {
  console.log('GroupBy changed to:', e.detail || 'none');
};
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <!-- Controlled Table -->
    <div>
      <h3>🎛️ Controlled Grouping (State-driven)</h3>
      <p>Current groupBy: <strong>{{ controlledGroupBy || 'none' }}</strong></p>
      
      <div style="display: flex; gap: 8px; margin-bottom: 16px;">
        <TkButton @tk-click="() => handleControlledGrouping('status')" label="Group by Status" type="outlined" />
        <TkButton @tk-click="() => handleControlledGrouping('priority')" label="Group by Priority" type="outlined" />
        <TkButton @tk-click="() => handleControlledGrouping('department')" label="Group by Department" type="outlined" />
        <TkButton @tk-click="clearControlledGrouping" label="Clear Grouping" type="text" />
      </div>

      <TkTable
        ref="controlledTableRef"
        :data-key.prop="'id'"
        card-title="Controlled Table"
        :rows-per-page.prop="8"
        pagination-method="client"
        :columns.prop="columns"
        :data.prop="sampleData"
        selection-mode="checkbox"
        :selection.prop="controlledSelectedRows"
        @tk-selection-change="handleControlledSelectionChange"
        @tk-group-by-change="handleControlledGroupByChange"
        :group-by.prop="controlledGroupBy"
        :striped.prop="true"
      />
    </div>

    <!-- Uncontrolled Table -->
    <div>
      <h3>🔧 Uncontrolled Grouping (Method-driven)</h3>
      <p>Grouping controlled internally via imperative methods</p>
      
      <div style="display: flex; gap: 8px; margin-bottom: 16px;">
        <TkButton @tk-click="() => handleUncontrolledGrouping('status')" label="Group by Status" type="outlined" />
        <TkButton @tk-click="() => handleUncontrolledGrouping('priority')" label="Group by Priority" type="outlined" />
        <TkButton @tk-click="() => handleUncontrolledGrouping('department')" label="Group by Department" type="outlined" />
        <TkButton @tk-click="clearUncontrolledGrouping" label="Clear Grouping" type="text" />
      </div>

      <TkTable
        ref="uncontrolledTableRef"
        :data-key.prop="'id'"
        card-title="Uncontrolled Table"
        :rows-per-page.prop="8"
        pagination-method="client"
        :columns.prop="columns"
        :data.prop="sampleData"
        selection-mode="checkbox"
        :selection.prop="uncontrolledSelectedRows"
        @tk-selection-change="handleUncontrolledSelectionChange"
        @tk-group-by-change="handleUncontrolledGroupByChange"
        :striped.prop="true"
      />
    </div>
  </div>
</template>`;

  const angularCode = `import { Component, ViewChild, ElementRef } from '@angular/core';
import { ITableColumn } from '@takeoff-ui/core';

@Component({
  selector: 'app-grouped-rows',
  template: \`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <!-- Controlled Table -->
      <div>
        <h3>🎛️ Controlled Grouping (State-driven)</h3>
        <p>Current groupBy: <strong>{{ controlledGroupBy || 'none' }}</strong></p>
        
        <div style="display: flex; gap: 8px; margin-bottom: 16px;">
          <tk-button (tk-click)="handleControlledGrouping('status')" label="Group by Status" type="outlined"></tk-button>
          <tk-button (tk-click)="handleControlledGrouping('priority')" label="Group by Priority" type="outlined"></tk-button>
          <tk-button (tk-click)="handleControlledGrouping('department')" label="Group by Department" type="outlined"></tk-button>
          <tk-button (tk-click)="clearControlledGrouping()" label="Clear Grouping" type="text"></tk-button>
        </div>

        <tk-table
          #controlledTableRef
          [dataKey]="'id'"
          cardTitle="Controlled Table"
          [rowsPerPage]="8"
          paginationMethod="client"
          [columns]="columns"
          [data]="sampleData"
          selectionMode="checkbox"
          [selection]="controlledSelectedRows"
          (tk-selection-change)="handleControlledSelectionChange($event)"
          (tk-group-by-change)="handleControlledGroupByChange($event)"
          [groupBy]="controlledGroupBy"
          [striped]="true">
        </tk-table>
      </div>

      <!-- Uncontrolled Table -->
      <div>
        <h3>🔧 Uncontrolled Grouping (Method-driven)</h3>
        <p>Grouping controlled internally via imperative methods</p>
        
        <div style="display: flex; gap: 8px; margin-bottom: 16px;">
          <tk-button (tk-click)="handleUncontrolledGrouping('status')" label="Group by Status" type="outlined"></tk-button>
          <tk-button (tk-click)="handleUncontrolledGrouping('priority')" label="Group by Priority" type="outlined"></tk-button>
          <tk-button (tk-click)="handleUncontrolledGrouping('department')" label="Group by Department" type="outlined"></tk-button>
          <tk-button (tk-click)="clearUncontrolledGrouping()" label="Clear Grouping" type="text"></tk-button>
        </div>

        <tk-table
          #uncontrolledTableRef
          [dataKey]="'id'"
          cardTitle="Uncontrolled Table"
          [rowsPerPage]="8"
          paginationMethod="client"
          [columns]="columns"
          [data]="sampleData"
          selectionMode="checkbox"
          [selection]="uncontrolledSelectedRows"
          (tk-selection-change)="handleUncontrolledSelectionChange($event)"
          (tk-group-by-change)="handleUncontrolledGroupByChange($event)"
          [striped]="true">
        </tk-table>
      </div>
    </div>
  \`
})
export class GroupedRowsComponent {
  @ViewChild('controlledTableRef') controlledTableRef!: ElementRef;
  @ViewChild('uncontrolledTableRef') uncontrolledTableRef!: ElementRef;

  controlledGroupBy: string = 'status';
  controlledSelectedRows: any[] = [];
  uncontrolledSelectedRows: any[] = [];

  sampleData = [
    { id: 1, name: 'Website Redesign', status: 'In Progress', priority: 'High', department: 'Design' },
    { id: 2, name: 'API Development', status: 'In Progress', priority: 'High', department: 'Engineering' },
    { id: 3, name: 'Database Migration', status: 'Completed', priority: 'Critical', department: 'Engineering' },
    { id: 4, name: 'Marketing Campaign', status: 'Planning', priority: 'Medium', department: 'Marketing' },
    // ... more data
  ];

  columns: ITableColumn[] = [
    { header: 'Project Name', field: 'name', sortable: true, searchable: true },
    { header: 'Status', field: 'status', sortable: true, searchable: true },
    { header: 'Priority', field: 'priority', sortable: true, searchable: true },
    { header: 'Department', field: 'department', sortable: true, searchable: true },
  ];

  // Controlled grouping handlers
  handleControlledGrouping(field: string) {
    this.controlledGroupBy = field;
  }

  clearControlledGrouping() {
    this.controlledGroupBy = '';
  }

  // Uncontrolled grouping handlers
  async handleUncontrolledGrouping(field: string) {
    await this.uncontrolledTableRef.nativeElement.groupByColumn(field);
  }

  async clearUncontrolledGrouping() {
    await this.uncontrolledTableRef.nativeElement.clearGrouping();
  }

  // Event handlers
  handleControlledSelectionChange(event: any) {
    this.controlledSelectedRows = event.detail;
  }

  handleControlledGroupByChange(event: any) {
    console.log('GroupBy changed to:', event.detail || 'none');
  }

  handleUncontrolledSelectionChange(event: any) {
    this.uncontrolledSelectedRows = event.detail;
  }

  handleUncontrolledGroupByChange(event: any) {
    console.log('GroupBy changed to:', event.detail || 'none');
  }
}`;

  const demo = <Example />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default GroupedRowsDemo;
