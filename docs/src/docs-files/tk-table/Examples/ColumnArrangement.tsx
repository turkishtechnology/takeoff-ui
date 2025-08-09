import { ITableColumn } from '@takeoff-ui/core';
import { TkButton, TkCheckbox, TkIcon, TkPopover, TkTable } from '@takeoff-ui/react';
import { useState } from 'react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';
import { basicData } from './data';

const Example = () => {
  const data = basicData;

  const [columns, setColumns] = useState<ITableColumn[]>([
    {
      field: 'id',
      header: 'Id',
    },
    {
      field: 'name',
      header: 'Name',
    },
    {
      field: 'category',
      header: 'Category',
    },
    {
      field: 'quantity',
      header: 'Quantity',
    },
  ]);

  const [selectedColumns, setSelectedColumns] = useState<ITableColumn[]>(columns.filter(item => ['id', 'name'].includes(item.field)));

  const handleDragStart = (e: React.DragEvent, index: number) => {
    const parentElement = e.currentTarget.closest('div');
    if (parentElement) {
      e.dataTransfer.setData('text/plain', index.toString());
      parentElement.classList.add('dragging');
      e.dataTransfer.setDragImage(parentElement, 0, 0);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const parentElement = e.currentTarget.closest('div');
    if (parentElement) {
      parentElement.classList.remove('dragging');
    }
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'));
    const newColumns = [...columns];
    const [movedItem] = newColumns.splice(sourceIndex, 1);
    newColumns.splice(targetIndex, 0, movedItem);
    setColumns(newColumns);
    setSelectedColumns(newColumns.filter(item => selectedColumns.map(selectedCol => selectedCol.field).includes(item.field)));
  };

  return (
    <div className="flex flex-col gap-2">
      <TkPopover className="flex justify-end" position="bottom" trigger="click">
        <TkButton variant="neutral" type="outlined" slot="trigger" label="Arrange Columns" />
        <div slot="content">
          <div className="flex flex-col gap-2">
            {columns.map((col, index) => (
              <div key={col.field} className="flex justify-between gap-2 py-2 px-3 hover:bg-gray-100 transition-colors">
                <TkCheckbox
                  label={col.header}
                  value={selectedColumns.findIndex(item => item.field == col.field) > -1}
                  onTkChange={e => {
                    if (e.detail) {
                      setSelectedColumns([...selectedColumns, col]);
                    } else {
                      setSelectedColumns(selectedColumns.filter(item => item.field != col.field));
                    }
                  }}
                />
                <TkIcon
                  icon="drag_indicator"
                  variant="neutral"
                  draggable
                  onDragStart={e => handleDragStart(e, index)}
                  onDragOver={handleDragOver}
                  onDragEnd={handleDragEnd}
                  onDrop={e => handleDrop(e, index)}
                  style={{ cursor: 'move' }}
                />
              </div>
            ))}
          </div>
        </div>
      </TkPopover>
      <TkTable columns={selectedColumns} data={data} />
    </div>
  );
};

const columnArrangement = () => {
  const reactCode = `const [columns, setColumns] = useState<ITableColumn[]>([
    {
      field: 'id',
      header: 'Id',
    },
    {
      field: 'name',
      header: 'Name',
    },
    {
      field: 'category',
      header: 'Category',
    },
    {
      field: 'quantity',
      header: 'Quantity',
    },
  ]);
  const [selectedColumns, setSelectedColumns] = useState<ITableColumn[]>(
    columns.filter((item) => ['id', 'name'].includes(item.field)),
  );

  const handleDragStart = (e: React.DragEvent, index: number) => {
    const parentElement = e.currentTarget.closest('div');
    if (parentElement) {
      e.dataTransfer.setData('text/plain', index.toString());
      parentElement.classList.add('dragging');
      e.dataTransfer.setDragImage(parentElement, 0, 0);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const parentElement = e.currentTarget.closest('div');
    if (parentElement) {
      parentElement.classList.remove('dragging');
    }
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'));
    const newColumns = [...columns];
    const [movedItem] = newColumns.splice(sourceIndex, 1);
    newColumns.splice(targetIndex, 0, movedItem);
    setColumns(newColumns);
    setSelectedColumns(
      newColumns.filter((item) =>
        selectedColumns
          .map((selectedCol) => selectedCol.field)
          .includes(item.field),
      ),
    );
  };
  return (
    <div className="flex flex-col gap-2">
      <TkPopover className="flex justify-end" position="bottom" trigger="click">
        <TkButton
          variant="neutral"
          type="outlined"
          slot="trigger"
          label="Arrange Columns"
        />
        <div slot="content">
          <div className="flex flex-col gap-2">
            {columns.map((col, index) => (
              <div
                key={col.field}
                className="flex justify-between gap-2 py-2 px-3 hover:bg-gray-100 transition-colors"
              >
                <TkCheckbox
                  label={col.header}
                  value={
                    selectedColumns.findIndex(
                      (item) => item.field == col.field,
                    ) > -1
                  }
                  onTkChange={(e) => {
                    if (e.detail) {
                      setSelectedColumns([...selectedColumns, col]);
                    } else {
                      setSelectedColumns(
                        selectedColumns.filter(
                          (item) => item.field != col.field,
                        ),
                      );
                    }
                  }}
                />
                <TkIcon
                  icon="drag_indicator"
                  variant="neutral"
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={handleDragOver}
                  onDragEnd={handleDragEnd}
                  onDrop={(e) => handleDrop(e, index)}
                  style={{ cursor: 'move' }}
                />
              </div>
            ))}
          </div>
        </div>
      </TkPopover>
      <TkTable columns={selectedColumns} data={data} />
    </div>
  );`;

  const vueCode = `<script setup lang="ts">
import { ref } from 'vue';
import { ITableColumn } from '@takeoff-ui/core';
import {
  TkTable,
  TkCheckbox,
  TkIcon,
  TkPopover,
  TkButton,
} from '@takeoff-ui/vue';

const columns = ref<ITableColumn[]>([
  { field: 'id', header: 'Id' },
  { field: 'name', header: 'Name' },
  { field: 'category', header: 'Category' },
  { field: 'quantity', header: 'Quantity' },
]);

const selectedColumns = ref<ITableColumn[]>(
  columns.value.filter((item) => ['id', 'name'].includes(item.field)),
);

const handleDragStart = (e: DragEvent, index: number) => {
  const parentElement = (e.currentTarget as HTMLElement).closest('div');
  if (parentElement) {
    e.dataTransfer?.setData('text/plain', index.toString());
    parentElement.classList.add('dragging');
    e.dataTransfer?.setDragImage(parentElement, 0, 0);
  }
};

const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
};

const handleDragEnd = (e: DragEvent) => {
  const parentElement = (e.currentTarget as HTMLElement).closest('div');
  if (parentElement) {
    parentElement.classList.remove('dragging');
  }
};

const handleDrop = (e: DragEvent, targetIndex: number) => {
  e.preventDefault();
  const sourceIndex = parseInt(e.dataTransfer?.getData('text/plain') || '0');
  const newColumns = [...columns.value];
  const [movedItem] = newColumns.splice(sourceIndex, 1);
  newColumns.splice(targetIndex, 0, movedItem);
  columns.value = newColumns;
  selectedColumns.value = newColumns.filter((item) =>
    selectedColumns.value
      .map((selectedCol) => selectedCol.field)
      .includes(item.field),
  );
};

const handleCheckboxChange = (e: any, col: ITableColumn) => {
  if (e.detail) {
    selectedColumns.value = [...selectedColumns.value, col];
  } else {
    selectedColumns.value = selectedColumns.value.filter(
      (item) => item.field !== col.field,
    );
  }
};
</script>
<template>
  <div class="flex flex-col gap-2">
    <TkPopover
      style="display: flex; justify-content: flex-end"
      position="bottom"
      trigger="click"
    >
      <TkButton
        variant="neutral"
        type="outlined"
        slot="trigger"
        label="Arrange Columns"
      />
      <div slot="content">
        <div
          style="display: flex; flex-direction: column; gap: 8px; padding: 8px"
        >
          <div
            v-for="(col, index) in columns"
            :key="col.field"
            style="
              display: flex;
              justify-content: space-between;
              gap: 8px;
              padding: 8px;
              transition: background-color 0.3s ease;
            "
          >
            <TkCheckbox
              :label="col.header"
              :value="
                selectedColumns.findIndex((item) => item.field === col.field) >
                -1
              "
              @tk-change="(e) => handleCheckboxChange(e, col)"
            />
            <TkIcon
              icon="drag_indicator"
              variant="neutral"
              draggable="true"
              @dragstart="(e) => handleDragStart(e, index)"
              @dragover="handleDragOver"
              @dragend="handleDragEnd"
              @drop="(e) => handleDrop(e, index)"
              style="cursor: move"
            />
          </div>
        </div>
      </div>
    </TkPopover>
    <TkTable :columns.prop="selectedColumns" :data.prop="data" />
  </div>
</template>
`;

  const angularCode = ``;

  const demo = <Example />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};
export default columnArrangement;
