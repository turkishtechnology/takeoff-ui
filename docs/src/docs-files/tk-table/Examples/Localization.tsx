import { ITableColumn } from '@takeoff-ui/core';
import { TkRadio, TkRadioGroup, TkTable } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';
import { data } from './data';

const Localization = () => {
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
      sorter: (a: any, b: any) => (a.name > b.name ? 1 : -1),
      filter: (value: string, row: any) =>
        row.name
          .toString()
          .toLowerCase()
          .indexOf(value?.toString().toLowerCase() as string) > -1,
    },
    {
      field: 'category',
      header: 'Category',
      searchable: true,
      sortable: true,
      sorter: (a: any, b: any) => (a.category > b.category ? 1 : -1),
      filter: (value: string, row: any) =>
        row.category
          .toString()
          .toLowerCase()
          .indexOf(value?.toString().toLowerCase() as string) > -1,
    },
    {
      field: 'quantity',
      header: 'Quantity',
      sortable: true,
      sorter: (a: any, b: any) => (Number(a.quantity) > Number(b.quantity) ? 1 : -1),
    },
  ];

  const reactCode = `import { ITableColumn } from '@takeoff-ui/core';
import { TkTable } from '@takeoff-ui/react';

<TkTable
  columns={column}
  data={data}
  paginationMethod="client"
  rowsPerPage={5}
  pageReportTemplate="page: {currentPage} / {totalPages}"
  itemsReportTemplate="item: {startItem}-{endItem} / {totalItems}"
/>

<TkTable
  columns={column}
  data={data}
  paginationMethod="client"
  rowsPerPage={5}
  pageReportTemplate="sayfa: {currentPage} / {totalPages}"
  itemsReportTemplate="kayıt: {startItem}-{endItem} / {totalItems}"
/>
`;

  const vueCode = `<script setup>
import { TkTable } from '@takeoff-ui/vue';

</script>

<template>
  <TkTable
    :columns="column"
    :data="data"
    paginationMethod="client"
    :rowsPerPage="5"
    pageReportTemplate="page: {currentPage} / {totalPages}"
    itemsReportTemplate="items: {startItem}-{endItem} / {totalItems}"
  />

  <TkTable
    :columns="column"
    :data="data"
    paginationMethod="client"
    :rowsPerPage="5"
    pageReportTemplate="sayfa: {currentPage} / {totalPages}"
    itemsReportTemplate="kayıt: {startItem}-{endItem} / {totalItems}"
  />

</template>`;
  const [language, setLanguage] = React.useState('en');
  const demo = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <TkRadioGroup onTkChange={e => setLanguage(e.detail)} value={language}>
        <TkRadio value="en" label="English"></TkRadio>
        <TkRadio value="tr" label="Turkish"></TkRadio>
      </TkRadioGroup>

      {language === 'en' && <TkTable columns={column} data={data} paginationMethod="client" rowsPerPage={5} />}
      {language === 'tr' && (
        <TkTable
          columns={column}
          data={data}
          paginationMethod="client"
          rowsPerPage={5}
          pageReportTemplate="sayfa: {currentPage} / {totalPages}"
          itemsReportTemplate="kayıt: {startItem}-{endItem} / {totalItems}"
        />
      )}
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default Localization;
