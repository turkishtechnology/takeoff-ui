import { ITableColumn, ITableRequest, TkTableCustomEvent } from '@takeoff-ui/core';
import { TkButton, TkInput, TkTable } from '@takeoff-ui/react';
import { useRef, useState, useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - dummy.js is plain JS with d.ts provided
import dummyData from './dummy';

function Table() {
  const allData: any[] = dummyData as any[];
  const [rowsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(allData.length);
  const [data, setData] = useState(allData);
  const [expandedRows, setExpandedRows] = useState<any[]>([]);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [persistentSelection, setPersistentSelection] = useState<any[]>([]);
  const tableRef = useRef<HTMLTkTableElement>(null);
  const selectOptions = [
    { label: 'test 1', value: 'value 1' },
    { label: 'test 2', value: 'value 2' },
    { label: 'test 3', value: 'value 3' },
  ];

  // Helper to set nested field paths like 'surname.value'
  const setNestedValue = (obj: any, path: string, value: any) => {
    const keys = path.split('.');
    const last = keys.pop() as string;
    let cursor = obj;
    keys.forEach(k => {
      if (cursor[k] == null || typeof cursor[k] !== 'object') cursor[k] = {};
      cursor = cursor[k];
    });
    cursor[last] = value;
  };
  const columns: ITableColumn[] = [
    {
      header: 'Ad',
      field: 'name',
      sortable: true,
      searchable: true,
      fixed: 'left',
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

      html: (row: any) => {
        const tkInput: HTMLTkInputElement = document.createElement('tk-input');
        tkInput.setAttribute('class', 'tk-table-input');
        tkInput.setAttribute('value', row.surname.value);
        tkInput.setAttribute('size', 'small');
        tkInput.setAttribute('icon', 'flight');
        // Commit on blur to avoid excessive events
        tkInput.addEventListener('tk-blur', () => {
          const host = tkInput.closest('tk-table');
          const value = tkInput.value as any;
          row.surname.value = value;
          host?.dispatchEvent(
            new CustomEvent('tk-cell-edit', {
              detail: { rowId: row.id ?? row['id'], field: 'surname.value', value },
              bubbles: true,
              composed: true,
            }),
          );
        });

        return tkInput;
      },
    },
    {
      header: 'Tarih',
      field: 'date',
      width: '120px',
      html: (row: any) => {
        const tkButton: HTMLTkDatepickerElement = document.createElement('tk-datepicker');
        tkButton.setAttribute('class', 'tk-table-datepicker');
        tkButton.setAttribute('value', row.date);
        tkButton.addEventListener('tk-change', () => {
          const host = tkButton.closest('tk-table');
          const value = tkButton.value as any;
          row.date = value;
          host?.dispatchEvent(
            new CustomEvent('tk-cell-edit', {
              detail: { rowId: row.id ?? row['id'], field: 'date', value },
              bubbles: true,
              composed: true,
            }),
          );
        });

        return tkButton;
      },
    },
    {
      header: 'Avatar',
      field: 'avatar',
      html: (row: any) => {
        const tkButton: HTMLTkSelectElement = document.createElement('tk-select');
        tkButton.setAttribute('class', 'tk-table-select');
        tkButton.setAttribute('value', row.avatar);
        tkButton.options = [...selectOptions];
        tkButton.setAttribute('size', 'small');
        tkButton.addEventListener('tk-change', () => {
          const host = tkButton.closest('tk-table');
          const value = tkButton.value as any;
          row.avatar = value;
          host?.dispatchEvent(
            new CustomEvent('tk-cell-edit', {
              detail: { rowId: row.id ?? row['id'], field: 'avatar', value },
              bubbles: true,
              composed: true,
            }),
          );
        });

        return tkButton;
      },
    },
    {
      header: 'Age',
      field: 'age',
      sortable: true,
      searchable: true,
      html: (row: any) => {
        const tkButton: HTMLTkButtonElement = document.createElement('tk-button');
        tkButton.setAttribute('label', String(row.age));
        tkButton.setAttribute('size', 'small');
        tkButton.setAttribute('type', 'outlined');
        tkButton.addEventListener('tk-click', () => {
          testFunc();
        });

        return tkButton as unknown as HTMLElement;
      },
    },
    {
      header: 'Status',
      field: 'status',
      width: '80px',
      html: (row: any) => {
        const cb: HTMLTkCheckboxElement = document.createElement('tk-checkbox');
        cb.setAttribute('class', 'tk-table-checkbox');
        cb.value = Boolean(row.status);
        cb.addEventListener('tk-change', (e: any) => {
          const host = cb.closest('tk-table');
          const value = e.detail;
          row.status = value;
          host?.dispatchEvent(
            new CustomEvent('tk-cell-edit', {
              detail: { rowId: row.id ?? row['id'], field: 'status', value },
              bubbles: true,
              composed: true,
            }),
          );
        });
        return cb;
      },
    },
    {
      header: 'Priority',
      field: 'priority',
      width: '120px',
      html: (row: any) => {
        const select: HTMLTkSelectElement = document.createElement('tk-select');
        select.setAttribute('class', 'tk-table-select');
        select.value = row.priority;
        select.optionValueKey = 'value';
        select.options = [
          { label: 'Low', value: 'low' },
          { label: 'Medium', value: 'medium' },
          { label: 'High', value: 'high' },
        ];
        if (row.priority) select.setAttribute('value', row.priority);
        select.setAttribute('size', 'small');
        select.addEventListener('tk-change', () => {
          const host = select.closest('tk-table');
          const value = select.value as any;
          row.priority = value;
          host?.dispatchEvent(
            new CustomEvent('tk-cell-edit', {
              detail: { rowId: row.id ?? row['id'], field: 'priority', value },
              bubbles: true,
              composed: true,
            }),
          );
        });
        return select;
      },
    },
    {
      header: 'Score',
      field: 'score',
      width: '100px',
      html: (row: any) => {
        const input: HTMLTkInputElement = document.createElement('tk-input');
        input.setAttribute('class', 'tk-table-input');
        input.setAttribute('size', 'small');
        input.setAttribute('placeholder', '0-100');
        if (row.score !== undefined) input.setAttribute('value', String(row.score));
        input.addEventListener('tk-blur', () => {
          const host = input.closest('tk-table');
          const value = input.value as any;
          row.score = value;
          host?.dispatchEvent(
            new CustomEvent('tk-cell-edit', {
              detail: { rowId: row.id ?? row['id'], field: 'score', value },
              bubbles: true,
              composed: true,
            }),
          );
        });
        return input;
      },
    },
    {
      header: 'Follow Up',
      field: 'followUp',
      width: '140px',
      html: (row: any) => {
        const dp: HTMLTkDatepickerElement = document.createElement('tk-datepicker');
        dp.setAttribute('class', 'tk-table-datepicker');
        if (row.followUp) dp.setAttribute('value', row.followUp);
        dp.addEventListener('tk-change', () => {
          const host = dp.closest('tk-table');
          const value = dp.value as any;
          row.followUp = value;
          host?.dispatchEvent(
            new CustomEvent('tk-cell-edit', {
              detail: { rowId: row.id ?? row['id'], field: 'followUp', value },
              bubbles: true,
              composed: true,
            }),
          );
        });
        return dp;
      },
    },
    {
      header: 'Flag',
      field: 'flag',
      width: '80px',
      html: (row: any) => {
        return `<span style=\"padding:2px 8px;border-radius:12px;background:${row.flag ? 'var(--states-error-sub-base)' : 'var(--states-info-sub-base)'};color:#111;\">${row.flag ? 'Red' : 'Blue'}</span>`;
      },
    },
    {
      header: 'Action',
      field: 'action',
      width: '110px',
      html: (row: any) => {
        const btn: HTMLTkButtonElement = document.createElement('tk-button');
        btn.setAttribute('label', 'Details');
        btn.setAttribute('size', 'small');
        btn.setAttribute('type', 'text');
        btn.addEventListener('tk-click', () => {
          console.log('Row details:', row);
        });
        return btn as unknown as HTMLElement;
      },
    },
    {
      header: 'Choice',
      field: 'choice',
      width: '110px',
      html: (row: any) => {
        const radioYes: HTMLTkRadioElement = document.createElement('tk-radio');
        radioYes.value = 'yes';
        radioYes.name = `choice-${row.id ?? ''}`;
        radioYes.label = 'Yes';
        radioYes.checked = row.choice === 'yes';
        radioYes.addEventListener('tk-change', () => {
          const host = radioYes.closest('tk-table');
          row.choice = 'yes';
          host?.dispatchEvent(
            new CustomEvent('tk-cell-edit', {
              detail: { rowId: row.id ?? row['id'], field: 'choice', value: 'yes' },
              bubbles: true,
              composed: true,
            }),
          );
        });

        const radioNo: HTMLTkRadioElement = document.createElement('tk-radio');
        radioNo.value = 'no';
        radioNo.name = `choice-${row.id ?? ''}`;
        radioNo.label = 'No';
        radioNo.checked = row.choice === 'no';
        radioNo.addEventListener('tk-change', () => {
          const host = radioNo.closest('tk-table');
          row.choice = 'no';
          host?.dispatchEvent(
            new CustomEvent('tk-cell-edit', {
              detail: { rowId: row.id ?? row['id'], field: 'choice', value: 'no' },
              bubbles: true,
              composed: true,
            }),
          );
        });

        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.gap = '8px';
        wrapper.appendChild(radioYes);
        wrapper.appendChild(radioNo);
        return wrapper as unknown as HTMLElement;
      },
    },
    {
      header: 'Note',
      field: 'note',
      width: '200px',
      html: (row: any) => {
        const note: HTMLTkInputElement = document.createElement('tk-input');
        note.setAttribute('placeholder', 'Add note');
        note.setAttribute('size', 'small');
        if (row.note) note.setAttribute('value', row.note);
        note.addEventListener('tk-blur', () => {
          const host = note.closest('tk-table');
          const value = note.value as any;
          row.note = value;
          host?.dispatchEvent(
            new CustomEvent('tk-cell-edit', {
              detail: { rowId: row.id ?? row['id'], field: 'note', value },
              bubbles: true,
              composed: true,
            }),
          );
        });
        return note;
      },
    },
    {
      header: 'Email',
      field: 'email',
      width: '220px',
      html: (row: any) => {
        return `<a href=\"mailto:${row.email || 'user@example.com'}\" style=\"color:var(--primary-base);text-decoration:none;\">${row.email || 'user@example.com'}</a>`;
      },
    },
    {
      header: 'City',
      field: 'city',
      width: '160px',
      html: (row: any) => {
        const input: HTMLTkInputElement = document.createElement('tk-input');
        input.setAttribute('size', 'small');
        input.setAttribute('placeholder', 'City');
        if (row.city) input.setAttribute('value', row.city);
        input.addEventListener('tk-blur', () => {
          const host = input.closest('tk-table');
          const value = input.value as any;
          row.city = value;
          host?.dispatchEvent(
            new CustomEvent('tk-cell-edit', {
              detail: { rowId: row.id ?? row['id'], field: 'city', value },
              bubbles: true,
              composed: true,
            }),
          );
        });
        return input;
      },
    },
    {
      header: 'Website',
      field: 'website',
      width: '200px',
      fixed: 'right',
      html: (row: any) => {
        const url = row.website || 'https://takeoffui.com';
        return `<a href=\"${url}\" target=\"_blank\" style=\"color:var(--states-info-dark);text-decoration:none;\">Open</a>`;
      },
    },
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

    // If this is a page change, restore selection after a short delay
    if (e.detail.currentPage && persistentSelection.length > 0) {
      console.log('Page change detected, will restore selection');
      setTimeout(() => {
        console.log('Restoring selection after page change:', persistentSelection);
        if (tableRef.current) {
          (tableRef.current as any).selection = [...persistentSelection];
        }
      }, 50);
    }

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

  const handleSelectionChange = (e: any) => {
    const newSelection = e.detail;
    console.log('Selection changed:', newSelection);
    console.log('Current persistent selection:', persistentSelection);

    // If selection was cleared (empty array) but we have persistent selection,
    // it means the core component cleared it during page change
    if (newSelection.length === 0 && persistentSelection.length > 0) {
      console.log('Selection cleared by core component, ignoring and will restore');
      // Don't update selectedRows, let useEffect restore it
      return;
    }

    // Update both states for genuine user selection changes
    console.log('Updating selection states with:', newSelection);
    setSelectedRows(newSelection);
    setPersistentSelection(newSelection);
  };

  // Effect to restore selection after core component clears it
  useEffect(() => {
    console.log('useEffect triggered - selectedRows:', selectedRows, 'persistentSelection:', persistentSelection);
    if (selectedRows.length === 0 && persistentSelection.length > 0 && tableRef.current) {
      console.log('Restoring selection after core component cleared it');
      // Small delay to ensure the table has finished its page change processing
      const timeoutId = setTimeout(() => {
        console.log('Executing selection restoration with:', persistentSelection);
        setSelectedRows([...persistentSelection]);
      }, 10);

      return () => clearTimeout(timeoutId);
    }
  }, [selectedRows, persistentSelection]);

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
        selection={selectedRows.length > 0 ? selectedRows : persistentSelection}
        expandedRows={expandedRows}
        onTkExpandedRowsChange={e => handleExpandedRowsChange(e.detail)}
        onTkCellEdit={e => {
          const { rowId, field, value } = e.detail;

          // Update visible slice minimally
          setData(prev =>
            prev.map(r => {
              if (r.id == rowId) {
                const updated = { ...r };
                setNestedValue(updated, field, value);
                return updated;
              }
              return r;
            }),
          );

          // Update backing dataset so paging/filtering keeps the edit
          const idx = allData.findIndex(r => r.id == rowId);
          if (idx > -1) {
            const updated = { ...allData[idx] } as any;
            setNestedValue(updated, field, value);
            allData[idx] = updated;
          }
        }}
        onTkSelectionChange={handleSelectionChange}
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
