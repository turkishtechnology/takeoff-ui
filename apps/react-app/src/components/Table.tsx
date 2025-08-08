import { ITableColumn, ITableRequest, TkTableCustomEvent } from '@takeoff-ui/core';
import { TkButton, TkInput, TkTable } from '@takeoff-ui/react';
import { useRef, useState } from 'react';

function Table() {
  const allData: any[] = [
    {
      id: '1',
      name: 'Harun',
      surname: { key: 'surname', value: 'Demir' },
      age: 29,
      avatar: 'value 1',
      country: 'Text here 1',
      date: '2024-01-02',
      data1: 'value 1',
      data2: 'value 2',
      data3: 'value 3',
    },
    {
      id: '2',
      name: 'Serkan',
      surname: { key: 'surname', value: 'Demir' },
      age: 23,
      country: 'Text here 2',
      date: '2024-01-02',
      data1: 'value 1',
      data2: 'value 2',
      data3: 'value 3',
    },
    {
      id: '3',
      name: 'Harun',
      surname: { key: 'surname', value: 'Demir' },
      age: 31,
      country: 'Text here 3',
      date: '2024-01-02',
      data1: 'value 1',
      data2: 'value 2',
      data3: 'value 3',
    },
    {
      id: 4,
      name: 'Zeki',
      surname: { key: 'surname', value: 'Demir' },
      age: 28,
      country: 'Text here 4',
      date: '2024-01-02',
    },
    {
      id: 5,
      name: 'Harun',
      surname: { key: 'surname', value: 'Demir' },
      age: 31,
      country: 'Text here 5',
      date: '2024-01-02',
    },
    {
      id: 6,
      name: 'Serkan',
      surname: { key: 'surname', value: 'Demir' },
      age: 23,
      country: 'Text here 6',
      date: '2024-01-02',
    },
    {
      id: 7,
      name: 'Zeki',
      surname: { key: 'surname', value: 'Demir' },
      age: 28,
      country: 'Text here 7',
      date: '2024-01-02',
    },
    {
      id: 8,
      name: 'Rukiye',
      surname: { key: 'surname', value: 'Demir' },
      age: 23,
      country: 'Text here 8',
      date: '2024-01-02',
    },
    {
      id: 9,
      name: 'Harun',
      surname: { key: 'surname', value: 'Demir' },
      age: 29,
      country: 'Text here 9',
      date: '2024-01-02',
    },
    {
      id: 10,
      name: 'Beytullah',
      surname: { key: 'surname', value: 'Demir' },
      age: 23,
      country: 'Text here 10',
      date: '2024-01-02',
    },
    {
      id: 11,
      name: 'Rukiye',
      surname: { key: 'surname', value: 'Demir' },
      age: 31,
      country: 'Text here 11',
      date: '2024-01-02',
    },
    {
      id: 12,
      name: 'Zeliha',
      surname: { key: 'surname', value: 'Demir' },
      age: 23,
      country: 'Text here 12',
      date: '2024-01-02',
    },
    {
      id: 13,
      name: 'Harun',
      surname: { key: 'surname', value: 'Demir' },
      age: 29,
      country: 'Text here 13',
      date: '2024-01-02',
    },
    {
      id: 14,
      name: 'Beytullah',
      surname: { key: 'surname', value: 'Demir' },
      age: 23,
      country: 'Text here 14',
      date: '2024-01-02',
    },
    {
      id: 15,
      name: 'Rukiye',
      surname: { key: 'surname', value: 'Demir' },
      age: 31,
      country: 'Text here 15',
      date: '2024-01-02',
    },
    {
      name: 'Zeliha',
      surname: { key: 'surname', value: 'Demir' },
      age: 23,
      country: 'Text here 16',
      date: '2024-01-02',
    },
    {
      name: 'Zekeriya',
      surname: { key: 'surname', value: 'Demir' },
      age: 31,
      country: 'Text here 17',
      date: '2024-01-02',
    },
  ];
  const [rowsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(allData.length);
  const [data, setData] = useState(allData);
  const [expandedRows, setExpandedRows] = useState<any[]>([]);
  const tableRef = useRef<HTMLTkTableElement>(null);
  const selectOptions = [
    { label: 'test 1', value: 'value 1' },
    { label: 'test 2', value: 'value 2' },
    { label: 'test 3', value: 'value 3' },
  ];
  const columns: ITableColumn[] = [
    {
      header: 'Ad',
      field: 'name',
      sortable: true,
      searchable: true,
      // editable: true,
      // inputType: 'text',
    },
    {
      header: 'Surname',
      field: 'surname.value',
      sortable: true,
      searchable: true,
      inputType: 'text',
      width: '100px',
      // html: (row: any) => {
      //   const tkButton: HTMLTkInputElement = document.createElement('tk-input');
      //   tkButton.setAttribute('class', 'tk-table-input');
      //   tkButton.setAttribute('value', row.surname.value);
      //   tkButton.setAttribute('size', 'small');
      //   tkButton.setAttribute('icon', 'flight');
      //   tkButton.addEventListener('tk-blur', () => {
      //     console.log(tkButton.value);
      //   });

      //   return tkButton;
      // },
    },
    {
      header: 'Tarih',
      field: 'date',
      width: '120px',
      // html: (row: any) => {
      //   const tkButton: HTMLTkDatepickerElement =
      //     document.createElement('tk-datepicker');
      //   tkButton.setAttribute('class', 'tk-table-datepicker');
      //   tkButton.setAttribute('value', row.date);
      //   tkButton.addEventListener('tk-change', () => {
      //     row.date = tkButton.value;
      //     console.log(tkButton.value);
      //   });

      //   return tkButton;
      // },
    },
    {
      header: 'Avatar',
      field: 'avatar',
      // html: (row: any) => {
      //   const tkButton: HTMLTkSelectElement =
      //     document.createElement('tk-select');
      //   tkButton.setAttribute('class', 'tk-table-select');
      //   tkButton.setAttribute('value', row.avatar);
      //   tkButton.options = [...selectOptions];
      //   tkButton.setAttribute('size', 'small');
      //   tkButton.addEventListener('tk-change', () => {
      //     row.avatar = tkButton.value;
      //     console.log(tkButton.value);
      //   });

      //   return tkButton;
      // },
    },
    // {
    //   header: 'Country',
    //   field: 'country',
    //   // html: (row: any) => {
    //   //   return {
    //   //     element: `<div style="display:flex; align-items: center; gap: 8px;">
    //   //                 <i class="material-symbols-outlined" style="font-size:20px;color: var(--states-info-dark);">flight</i>
    //   //                 <span>${row.country}</span>
    //   //               </div>`,
    //   //   };
    //   // },
    // },
    // {
    //   header: 'Age',
    //   field: 'age',
    //   sortable: true,
    //   searchable: true,
    //   html: (row: any) => {
    //     const tkButton: HTMLElement = document.createElement('tk-button');
    //     tkButton.setAttribute('label', row.age);
    //     tkButton.setAttribute('size', 'small');
    //     tkButton.addEventListener('click', () => {
    //       testFunc();
    //     });

    //     return tkButton;
    //   },
    // },
    // {
    //   header: 'data 1',
    //   field: 'data1',
    // },
    // {
    //   header: 'data 2',
    //   field: 'data2',
    // },
    // {
    //   header: 'data 3',
    //   field: 'data3',
    // },
  ];

  const [test, setTest] = useState(1);

  const testFunc = () => {
    console.log('d', test);
  };

  const handleTkRequest = (e: TkTableCustomEvent<ITableRequest>) => {
    console.log(e.detail);
    if (e.detail.filters?.length > 0) {
      let filteredData: any[] = [];

      e.detail.filters?.forEach(filter => {
        filteredData = allData.filter(item => item[filter.field] == filter.value);
      });

      setTotalItems(filteredData.length);

      const startIndex = (e.detail.currentPage - 1) * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      setData(filteredData.slice(startIndex, endIndex));
    }
  };

  const handleExpandedRowsChange = (rows: any[]) => {
    console.log(rows);
    setExpandedRows([...rows]);
  };

  const renderExpandedRows = () => {
    return expandedRows.map((item, index) => {
      return (
        <div slot={`expand-content-${item.id}`} key={'expanded-row-' + index}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <TkInput label="data 1" value={item.data1} onTkChange={e => (item.data1 = e.detail)} />
            <TkInput label="data 2" value={item.data2} onTkChange={e => (item.data2 = e.detail)} />
            <TkInput label="data 3" value={item.data3} onTkChange={e => (item.data3 = e.detail)} />
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <TkTable
        ref={tableRef}
        dataKey="id"
        size="small"
        cardTitle="Deneme Table"
        onTkRequest={handleTkRequest}
        rowsPerPage={rowsPerPage}
        paginationMethod={'client'}
        totalItems={totalItems}
        columns={columns}
        data={data}
        selectionMode="checkbox"
        expandedRows={expandedRows}
        onTkExpandedRowsChange={e => handleExpandedRowsChange(e.detail)}
        onTkCellEdit={e => {
          console.log('apptsx cell edit: ', e.detail);
          const cellEdit = e.detail;
          const tmpData = [...data];
          const rowData = tmpData.find(item => item.id == cellEdit.rowId);
          rowData[cellEdit.field] = cellEdit.value;

          setData([...tmpData]);
        }}
        onTkSelectionChange={e => console.log(e.detail)}
        // cellStyle={(row, col) => {
        //   if (col.field == 'name' && row.name == 'Harun') {
        //     return { background: 'var(--primary-base)', color: 'white' };
        //   }
        // }}
        // rowStyle={(row) => {
        //   if (row.age > 29) {
        //     return {
        //       background: 'var(--states-success-sub-base)',
        //       color: 'black',
        //     };
        //   }
        // }}
      >
        {renderExpandedRows()}
        <div slot="header-right" style={{ display: 'flex', gap: '8px' }}>
          <TkButton onTkClick={() => setData(allData.slice(5, 10))} label="pdf"></TkButton>
          <TkButton
            onTkClick={() =>
              tableRef.current?.exportFile({
                type: 'excel',
                ignoreColumnsFields: ['name'],
              })
            }
            label="excel"
          ></TkButton>
          <TkButton onTkClick={() => tableRef.current?.exportFile({ type: 'csv' })} label="csv"></TkButton>
        </div>
      </TkTable>
    </div>
  );
}

export default Table;
