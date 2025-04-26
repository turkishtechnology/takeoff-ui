import {
  ITableColumn,
  TkTableCustomEvent,
  ITableRequest,
} from '@takeoff-ui/core';
import { TkTable } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useEffect, useRef, useState } from 'react';
import fetchFromServer from './server';

const Example = () => {
  const column: ITableColumn[] = [
    {
      field: 'id',
      header: 'Id',
    },
    {
      field: 'name',
      header: 'Name',
      searchable: true,
      sortable: true,
      html: (row) => {
        const tkInput: HTMLTkInputElement = document.createElement('tk-input');
        tkInput.classList.add('tk-table-input');
        tkInput.value = row.name;
        tkInput.icon = 'person';
        tkInput.addEventListener('tk-blur', () => {
          console.log('input value changed: ' + tkInput.value);
        });
        return tkInput;
      },
    },
    {
      field: 'category',
      header: 'Category',
      searchable: true,
      sortable: true,
      html: (row) => {
        return `<tk-badge label="${row.category}" ></tk-badge>`;
      },
    },
    {
      field: 'quantity',
      header: 'Quantity',
      sortable: true,
    },
    {
      field: '-',
      header: 'Actions',
      html: (row) => {
        const tkButton: HTMLTkButtonElement =
          document.createElement('tk-button');
        tkButton.label = 'Detail';
        tkButton.type = 'text';
        tkButton.variant = 'info';
        tkButton.addEventListener('tk-click', () => {
          alert('clicked row: ' + JSON.stringify(row));
        });
        return tkButton;
      },
    },
  ];

  const tableRef = useRef<HTMLTkTableElement>(null);
  const [data, setData] = useState();
  const [totalItem, setTotalItem] = useState();
  const [loading, setLoading] = useState(false);

  const handleRequest = async (e: TkTableCustomEvent<ITableRequest>) => {
    setLoading(true);
    const result: any = await fetchFromServer(
      e.detail.currentPage,
      e.detail.rowsPerPage,
      e.detail.filters,
      e.detail.sortField,
      e.detail.sortOrder,
    );

    setData(result?.data);
    setTotalItem(result?.totalItem);
    setLoading(false);
  };

  useEffect(() => {
    tableRef.current.serverRequest();
  }, []);

  return (
    <TkTable
      ref={tableRef}
      columns={column}
      data={data}
      paginationMethod="server"
      rowsPerPage={5}
      totalItems={totalItem}
      loading={loading}
      onTkRequest={handleRequest}
    />
  );
};

const CustomCell = () => {
  const reactCode = `const column: ITableColumn[] = [
    {
      field: "id",
      header: "Id",
    },
    {
      field: "name",
      header: "Name",
      searchable: true,
      sortable: true,
    },
    {
      field: "category",
      header: "Category",
      searchable: true,
      sortable: true,
      html: (row) => {
        return \`<tk-badge label="\${row.category}" ></tk-badge>\`;
      },
    },
    {
      field: "quantity",
      header: "Quantity",
      sortable: true,
    },
    {
      field: "-",
      header: "Actions",
      html: (row) => {
        const tkButton: HTMLTkButtonElement =
          document.createElement("tk-button");
        tkButton.label = "Detail";
        tkButton.type = "text";
        tkButton.variant = "info";
        tkButton.addEventListener("tk-click", () => {
          alert("clicked row: " + JSON.stringify(row));
        });
        return tkButton;
      },
    },
  ];
const [data, setData] = useState();
const [totalItem, setTotalItem] = useState();
const [loading, setLoading] = useState(false);

const handleRequest = async (e: TkTableCustomEvent<ITableRequest>) => {
  setLoading(true);
  const result: any = await fetchFromServer(
    e.detail.currentPage,
    e.detail.rowsPerPage,
    e.detail.filters,
    e.detail.sortField,
    e.detail.sortOrder
  );
  setData(result?.data);
  setTotalItem(result?.totalItem);
  setLoading(false);
};

return (
  <TkTable
    columns={column}
    data={data}
    paginationMethod="server"
    rowsPerPage={5}
    totalItems={totalItem}
    loading={loading}
    onTkRequest={handleRequest}
  />
);`;

  const vueCode = `<script setup>
import { TkTable } from '@takeoff-ui/vue'
import { ref } from 'vue';

const column = [
  {
    field: "id",
    header: "Id",
  },
  {
    field: "name",
    header: "Name",
    searchable: true,
    sortable: true,
  },
  {
    field: "category",
    header: "Category",
    searchable: true,
    sortable: true,
    html: (row) => {
      return \`<tk-badge label="\${row.category}" ></tk-badge>\`;
    },
  },
  {
    field: "quantity",
    header: "Quantity",
    sortable: true,
  },
  {
    field: "-",
    header: "Actions",
    html: (row) => {
      const tkButton =
        document.createElement("tk-button");
      tkButton.label = "Detail";
      tkButton.type = "text";
      tkButton.variant = "info";
      tkButton.addEventListener("tk-click", () => {
        alert("clicked row: " + JSON.stringify(row));
      });
      return tkButton;
    },
  },
];

const data = ref([])
const totalItem = ref(0)
const loading = ref(false)

const handleRequest = async (e) => {
  loading.value = true
  const result = await fetchFromServer(
    e.detail.currentPage,
    e.detail.rowsPerPage,
    e.detail.filters,
    e.detail.sortField,
    e.detail.sortOrder
  );
  data.value = result?.data
  totalItem.value = result?.totalItem
  loading.value = false
};
</script>

<template>
  <TkTable :columns.prop="column" :data.prop="data" paginationMethod="server" :rowsPerPage="5" :totalItems="totalItem"
    :loading="loading" @tkRequest="handleRequest" />
</template>
`;

  const demo = <Example />;

  return (
    <FeatureDemo
      demo={demo}
      reactCode={reactCode}
      vueCode={vueCode}
      angularCode={''}
    ></FeatureDemo>
  );
};

export default CustomCell;
