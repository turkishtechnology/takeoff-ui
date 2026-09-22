import { ITableColumn } from '@takeoff-ui/core';
import { TkCard, TkTable } from '@takeoff-ui/react';
import { useMemo, useState } from 'react';

/**
 * Bağlı uçuşlar (linked flights) örneği.
 *
 * Bağlı iki uçuş veri tarafında TEK satır olarak tutulur (legs dizisi). Her sütunun `html`
 * fonksiyonu satırda kaç bacak varsa o kadar katman çizer. Grup çerçevesi ise komponentin
 * `rowStyle` (üst/alt kenar + zemin) ve `cellStyle` (ilk/son sütunda sol/sağ kenar) ile verilir.
 */

type Status = 'Airborne' | 'Scheduled' | 'Boarding';
type Tone = 'danger' | 'neutral';

interface Leg {
  flightNo: string;
  from: string;
  to: string;
  fromCity: string;
  toCity: string;
  std: string;
  stdDate: string;
  sta: string;
  staDate: string;
  status: Status;
  aircraft: string;
  gate: string;
  terminal: string;
  delay?: string;
  crew: string;
}

interface FlightRow {
  id: string;
  /** Çerçeve rengi. Sadece bağlı satırlarda kullanılır. */
  tone?: Tone;
  legs: Leg[];
}

const LEG_HEIGHT = 64;

const TONES: Record<Tone, { border: string; background: string }> = {
  danger: { border: 'var(--states-danger-base)', background: 'var(--states-danger-lightest)' },
  neutral: { border: 'var(--neutral-500)', background: 'var(--neutral-50)' },
};

const STATUS_VARIANT: Record<Status, string> = {
  Airborne: 'success',
  Scheduled: 'info',
  Boarding: 'neutral',
};

const ACTIONS = [
  { value: 'edit', label: 'Edit flight' },
  { value: 'delay', label: 'Add delay' },
  { value: 'cancel', label: 'Cancel flight' },
];

const data: FlightRow[] = [
  {
    id: 'TK003-TK004',
    tone: 'danger',
    legs: [
      {
        flightNo: 'TK003',
        from: 'IST',
        to: 'JFK',
        fromCity: 'Istanbul',
        toCity: 'New York',
        std: '07:35',
        stdDate: '27 May',
        sta: '18:10',
        staDate: '27 May',
        status: 'Airborne',
        aircraft: 'TC-LPA',
        gate: 'A5',
        terminal: '1',
        crew: '12 / 2',
      },
      {
        flightNo: 'TK004',
        from: 'JFK',
        to: 'IST',
        fromCity: 'New York',
        toCity: 'Istanbul',
        std: '20:20',
        stdDate: '27 May',
        sta: '06:05',
        staDate: '28 May',
        status: 'Scheduled',
        aircraft: 'TC-LPA',
        gate: 'B12',
        terminal: '4',
        crew: '11 / 2',
      },
    ],
  },
  {
    id: 'TK1981-TK1982',
    tone: 'neutral',
    legs: [
      {
        flightNo: 'TK1981',
        from: 'IST',
        to: 'LHR',
        fromCity: 'Istanbul',
        toCity: 'London',
        std: '09:10',
        stdDate: '27 May',
        sta: '11:40',
        staDate: '27 May',
        status: 'Scheduled',
        aircraft: 'TC-LDB',
        gate: 'D8',
        terminal: '1',
        crew: '10 / 2',
      },
      {
        flightNo: 'TK1982',
        from: 'LHR',
        to: 'IST',
        fromCity: 'London',
        toCity: 'Istanbul',
        std: '14:30',
        stdDate: '27 May',
        sta: '20:55',
        staDate: '27 May',
        status: 'Scheduled',
        aircraft: 'TC-LDB',
        gate: 'D8',
        terminal: '1',
        crew: '10 / 2',
      },
    ],
  },
  {
    id: 'TK2150',
    legs: [
      {
        flightNo: 'TK2150',
        from: 'IST',
        to: 'ESB',
        fromCity: 'Istanbul',
        toCity: 'Ankara',
        std: '12:15',
        stdDate: '27 May',
        sta: '13:20',
        staDate: '27 May',
        status: 'Boarding',
        aircraft: 'TC-LNE',
        gate: 'F4',
        terminal: '1',
        delay: '+0:15',
        crew: '8 / 2',
      },
    ],
  },
  {
    id: 'TK2428',
    legs: [
      {
        flightNo: 'TK2428',
        from: 'IST',
        to: 'AYT',
        fromCity: 'Istanbul',
        toCity: 'Antalya',
        std: '16:50',
        stdDate: '27 May',
        sta: '18:20',
        staDate: '27 May',
        status: 'Scheduled',
        aircraft: 'TC-LNF',
        gate: 'C3',
        terminal: '2',
        crew: '9 / 2',
      },
    ],
  },
];

const isLinked = (row: FlightRow) => row.legs.length > 1;
const toneOf = (row: FlightRow) => TONES[row.tone ?? 'neutral'];

const MUTED_DASH = `<span style="color:var(--text-sub-base)">—</span>`;

/** Üstte kalın, altta soluk iki satırlı hücre içeriği (Route, STD, STA). */
const twoLines = (primary: string, secondary: string) => `<div>
  <div style="font-weight:600;color:var(--text-darkest)">${primary}</div>
  <div style="color:var(--text-sub-base)">${secondary}</div>
</div>`;

/**
 * Bir hücreyi, satırdaki her bacak için bir katman olacak şekilde çizer.
 * Bağlı satırlarda hücre padding'i rowStyle ile sıfırlandığı için padding burada verilir;
 * böylece katmanları ayıran çizgi hücrenin tamamına yayılır ve sütunlar arasında hizalı kalır.
 */
function stack(row: FlightRow, renderLeg: (leg: Leg, index: number) => string, align = 'flex-start'): HTMLElement {
  const container = document.createElement('div');
  container.innerHTML = isLinked(row)
    ? row.legs
        .map(
          (leg, index) => `
            <div style="display:flex;align-items:center;justify-content:${align};height:${LEG_HEIGHT}px;padding:0 16px;box-sizing:border-box;
              ${index > 0 ? 'border-top:1px solid var(--border-light);' : ''}">${renderLeg(leg, index)}</div>`,
        )
        .join('')
    : `<div style="display:flex;align-items:center;justify-content:${align};">${renderLeg(row.legs[0], 0)}</div>`;
  return container;
}

/** Sol sütun: bağlı satırlarda noktalar ve aralarındaki çizgi, tek satırlarda "—". */
function renderLinkCell(row: FlightRow): HTMLElement {
  const container = document.createElement('div');
  if (!isLinked(row)) {
    container.innerHTML = MUTED_DASH;
    return container;
  }

  const color = toneOf(row).border;
  const dots = row.legs
    .map(
      (_, index) => `
        <div style="position:absolute;left:50%;top:${index * LEG_HEIGHT + LEG_HEIGHT / 2}px;width:14px;height:14px;
          margin:-7px 0 0 -7px;border-radius:50%;background:${color};"></div>`,
    )
    .join('');
  container.innerHTML = `
    <div style="position:relative;width:100%;height:${row.legs.length * LEG_HEIGHT}px;">
      <div style="position:absolute;left:50%;top:${LEG_HEIGHT / 2}px;height:${(row.legs.length - 1) * LEG_HEIGHT}px;width:2px;margin-left:-1px;background:${color};"></div>
      ${dots}
    </div>`;
  return container;
}

/** Bağlı satır: hücre padding'i sıfırlanır, zemin ve çerçevenin üst/alt kenarı her hücreye uygulanır. */
const rowStyle = (row: FlightRow) => {
  if (!isLinked(row)) return undefined;
  const tone = toneOf(row);
  return {
    padding: '0',
    background: tone.background,
    borderTop: `2px solid ${tone.border}`,
    borderBottom: `2px solid ${tone.border}`,
  };
};

/** Çerçevenin sol ve sağ kenarı sadece sabitlenmiş (fixed) ilk ve son sütuna çizilir. */
const cellStyle = (row: FlightRow, col: ITableColumn) => {
  if (!isLinked(row)) return undefined;
  const border = `2px solid ${toneOf(row).border}`;
  if (col.fixed === 'left') return { borderLeft: border };
  if (col.fixed === 'right') return { borderRight: border };
  return undefined;
};

/**
 * Sütunlar bileşen dışında kurulur: her render'da yeni bir dizi verilirse tk-table tüm gövdeyi
 * (hücrelerdeki tk-dropdown'lar dahil) yeniden kurar ve açık olan menü kapanır.
 */
function buildColumns(onAction: (action: string) => void): ITableColumn[] {
  return [
    {
      header: '',
      field: 'link',
      width: '56px',
      fixed: 'left',
      headerHtml: () => `<tk-icon icon="link" size="small" variant="neutral"></tk-icon>`,
      html: (row: FlightRow) => renderLinkCell(row),
    },
    {
      header: 'Flight',
      field: 'flight',
      width: '200px',
      sortable: true,
      sorter: (a: FlightRow, b: FlightRow) => a.legs[0].flightNo.localeCompare(b.legs[0].flightNo),
      html: (row: FlightRow) =>
        stack(row, (leg, index) => {
          const badge =
            index === 0 && isLinked(row)
              ? `<tk-badge label="${row.legs.length} linked" size="small" type="filledlight" rounded
                   variant="${row.tone ?? 'neutral'}" style="margin-left:8px"></tk-badge>`
              : '';
          return `<div style="display:flex;align-items:center">
                    <span style="font-weight:700;font-size:16px;color:var(--text-darkest)">${leg.flightNo}</span>${badge}
                  </div>`;
        }),
    },
    {
      header: 'Route',
      field: 'route',
      width: '220px',
      html: (row: FlightRow) => stack(row, leg => twoLines(`${leg.from} → ${leg.to}`, `${leg.fromCity} → ${leg.toCity}`)),
    },
    {
      header: 'STD',
      field: 'std',
      width: '120px',
      sortable: true,
      sorter: (a: FlightRow, b: FlightRow) => a.legs[0].std.localeCompare(b.legs[0].std),
      html: (row: FlightRow) => stack(row, leg => twoLines(leg.std, leg.stdDate)),
    },
    {
      header: 'STA',
      field: 'sta',
      width: '120px',
      html: (row: FlightRow) => stack(row, leg => twoLines(leg.sta, leg.staDate)),
    },
    {
      header: 'Status',
      field: 'status',
      width: '150px',
      html: (row: FlightRow) => stack(row, leg => `<tk-badge label="${leg.status}" type="filledlight" rounded variant="${STATUS_VARIANT[leg.status]}"></tk-badge>`),
    },
    {
      header: 'Aircraft',
      field: 'aircraft',
      width: '130px',
      html: (row: FlightRow) => stack(row, leg => leg.aircraft),
    },
    {
      header: 'Gate',
      field: 'gate',
      width: '90px',
      html: (row: FlightRow) => stack(row, leg => leg.gate),
    },
    {
      header: 'Terminal',
      field: 'terminal',
      width: '110px',
      html: (row: FlightRow) => stack(row, leg => leg.terminal),
    },
    {
      header: 'Delay',
      field: 'delay',
      width: '110px',
      html: (row: FlightRow) => stack(row, leg => (leg.delay ? `<span style="color:var(--states-danger-base);font-weight:700">${leg.delay}</span>` : MUTED_DASH)),
    },
    {
      header: 'Crew',
      field: 'crew',
      width: '110px',
      html: (row: FlightRow) => stack(row, leg => leg.crew),
    },
    {
      header: 'Actions',
      field: 'actions',
      width: '110px',
      fixed: 'right',
      html: (row: FlightRow) => {
        const cell = stack(
          row,
          leg => `<tk-dropdown position="bottom-end" data-flight="${leg.flightNo}">
                    <tk-button slot="trigger" icon="more_vert" type="text" variant="neutral" size="small"></tk-button>
                  </tk-dropdown>`,
          'center',
        );
        // options bir dizi olduğu için attribute ile değil property olarak verilir.
        cell.querySelectorAll<HTMLTkDropdownElement>('tk-dropdown').forEach(dropdown => {
          dropdown.options = ACTIONS;
          dropdown.addEventListener('tk-item-click', (event: Event) => {
            const item = (event as CustomEvent<{ label: string }>).detail;
            onAction(`${dropdown.dataset.flight}: ${item.label}`);
          });
        });
        return cell;
      },
    },
  ];
}

function LinkedFlightsTable() {
  const [lastAction, setLastAction] = useState('');
  // setLastAction kimliği sabittir, bu yüzden sütunlar bir kez kurulur.
  const columns = useMemo(() => buildColumns(setLastAction), []);

  return (
    <TkCard>
      <div slot="header">
        <h1 className="p-3 text-3xl font-semibold text-slate-500">Linked Flights Table</h1>
      </div>
      <p className="mb-4">
        Bağlı uçuşlar tek satır olarak tutulur; her hücre <code>html</code> ile bacak sayısı kadar katman çizer. Çerçeve <code>rowStyle</code> (üst/alt) ve <code>cellStyle</code>{' '}
        (sol/sağ) ile verilir.
      </p>
      <p className="mb-4">
        Son aksiyon: <strong>{lastAction || '—'}</strong>
      </p>
      <TkTable dataKey="id" columns={columns} data={data} rowStyle={rowStyle} cellStyle={cellStyle} />
    </TkCard>
  );
}

export default LinkedFlightsTable;
