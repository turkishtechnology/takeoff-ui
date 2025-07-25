import { ITableColumn } from '@takeoff-ui/core';
import { TkTable } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React, { useState } from 'react';
import { data } from './data';

const Example = () => {
  const column: ITableColumn[] = [
    {
      expander: true,
      field: '',
      header: '',
    },
    {
      field: 'id',
      header: 'Id',
    },
    {
      field: 'name',
      header: 'Name',
    },
    {
      field: 'quantity',
      header: 'Quantity',
      sortable: true,
      sorter: (a: any, b: any) => (Number(a.quantity) > Number(b.quantity) ? 1 : -1),
    },
  ];

  const [expandedRows, setExpandedRows] = useState<any[]>([]);

  const handleExpandedRowsChange = (rows: any[]) => {
    console.log(rows);
    setExpandedRows([...rows]);
  };

  const renderExpandedRows = () => {
    return expandedRows.map((item, index) => {
      return (
        <div slot={`expand-content-${item.id}`} key={'expanded-row-' + index}>
          <div className="flex gap-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book.
          </div>
        </div>
      );
    });
  };

  return (
    <TkTable
      columns={column}
      data={data}
      dataKey="id"
      paginationMethod="client"
      rowsPerPage={5}
      totalItems={data.length}
      expandedRows={expandedRows}
      onTkExpandedRowsChange={e => handleExpandedRowsChange(e.detail)}
    >
      {renderExpandedRows()}
    </TkTable>
  );
};

const ExpandedRows = () => {
  const reactCode = `const column: ITableColumn[] = [
  {
    expander: true,
    field: "",
    header: "",
  },
  {
    field: "id",
    header: "Id",
  },
  {
    field: "name",
    header: "Name",
  },
  {
    field: "quantity",
    header: "Quantity",
    sortable: true,
    sorter: (a: any, b: any) =>
      Number(a.quantity) > Number(b.quantity) ? 1 : -1,
  },
];
const [expandedRows, setExpandedRows] = useState<any[]>([]);
const handleExpandedRowsChange = (rows: any[]) => {
  console.log(rows);
  setExpandedRows([...rows]);
};
const renderExpandedRows = () => {
  return expandedRows.map((item, index) => {
    return (
      <div slot={\`expand-content-\${item.id}\`} key={"expanded-row-" + index}>
        <div style={{ display: "flex", gap: "8px" }}>content</div>
      </div>
    );
  });
};
return (
  <TkTable
    columns={column}
    data={data}
    dataKey="id"
    paginationMethod="client"
    rowsPerPage={5}
    totalItems={data.length}
    expandedRows={expandedRows}
    onTkExpandedRowsChange={(e) => handleExpandedRowsChange(e.detail)}
  >
    {renderExpandedRows()}
  </TkTable>
);`;

  const vueCode = `<script setup>
import { TkTable } from '@takeoff-ui/vue'
import { ref } from 'vue';

const data = [
  {
    id: "f230fh0g3",
    name: "Bamboo Watch",
    category: "Accessories",
    quantity: 24,
  },
  {
    id: "nvklal433",
    name: "Black Watch",
    category: "Onyama",
    quantity: 42,
  },
  {
    id: "zz21cz3c1",
    name: "Blue Band",
    category: "Accessories",
    quantity: 87,
  },
  {
    id: "244wgerg2",
    name: "Blue T-Shirt",
    category: "Fitness",
    quantity: 12,
  },
  {
    id: "h456wer53",
    name: "Bracelet",
    category: "Clothing",
    quantity: 45,
  },
  {
    id: "344wgerg2",
    name: "Art Venere",
    category: "Accessories",
    quantity: 23,
  },
  {
    id: "144wgerg3",
    name: "Simona Morasca",
    category: "Clothing",
    quantity: 56,
  },
  {
    id: "444wgerg6",
    name: "Leota Dilliard",
    category: "Fitness",
    quantity: 89,
  },
  {
    id: "k14wgerj1",
    name: "Sage Wieser",
    category: "Accessories",
    quantity: 77,
  },
  {
    id: "fq4wgergq",
    name: "Kris Marrier",
    category: "Clothing",
    quantity: 65,
  },
  {
    id: "764wger11",
    name: "Abel Maclead",
    category: "Clothing",
    quantity: 61,
  },
  {
    id: "08ge885f",
    name: "Mattie Poquette",
    category: "Fitness",
    quantity: 42,
  },
  {
    id: "wg57erg2",
    name: "Meaghan Garufi",
    category: "Accessories",
    quantity: 99,
  },
  {
    id: "264w3erg2",
    name: "Gladys Rim",
    category: "Magalhaes",
    quantity: 92,
  },
];
const column = [
  {
    expander: true,
    field: "",
    header: "",
  },
  {
    field: "id",
    header: "Id",
  },
  {
    field: "name",
    header: "Name",
  },
  {
    field: "quantity",
    header: "Quantity",
    sortable: true,
    sorter: (a, b) =>
      Number(a.quantity) > Number(b.quantity) ? 1 : -1,
  },
];

const expandedRows = ref([])
const handleExpandedRowsChange = (rows) => {
  console.log(rows);
  expandedRows.value = [...rows]
};
</script>

<template>
 <TkTable
    :columns.prop="column"
    :data.prop="data"
    dataKey="id"
    paginationMethod="client"
    :rowsPerPage="5"
    :totalItems="data.length"
    :expandedRows="expandedRows"
    @tkExpandedRowsChange="(e) => handleExpandedRowsChange(e.detail)"
  >
      <div v-for="item, index in expandedRows" :slot="\`expand-content-\${item.id}\`" :key="'expanded-row-' + index">
        <div :style="{ display: 'flex', gap: '8px' }">content</div>
      </div>
  </TkTable>
</template>   
`;

  const demo = <Example />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''}></FeatureDemo>;
};

export default ExpandedRows;
