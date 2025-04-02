import { TkCard } from '@takeoff-ui/react';
import { Link } from 'react-router-dom';

function Components() {
  return (
    <TkCard>
      <div slot="header">
        <h1 className="p-3 text-3xl font-semibold text-slate-500">
          Components
        </h1>
      </div>

      <p>
        Komponent testleri için aşağıdan komponent seçebilirsiniz. Burada
        olmayan komponentleri benzer düzende ekleyebilirsiniz.
      </p>

      <div className="grid grid-cols-6 gap-4 mt-4">
        <Link
          to="input"
          className="p-4 border border-indigo-600 rounded-md text-center hover:bg-violet-100"
        >
          Input
        </Link>
        <Link
          to="select"
          className="p-4 border border-indigo-600 rounded-md text-center hover:bg-violet-100"
        >
          Select
        </Link>
        <Link
          to="table"
          className="p-4 border border-indigo-600 rounded-md text-center hover:bg-violet-100"
        >
          Table
        </Link>
        <Link
          to="datepicker"
          className="p-4 border border-indigo-600 rounded-md text-center hover:bg-violet-100"
        >
          Datepicker
        </Link>
        <Link
          to="radio"
          className="p-4 border border-indigo-600 rounded-md text-center hover:bg-violet-100"
        >
          Radio
        </Link>
        <Link
          to="dialog"
          className="p-4 border border-indigo-600 rounded-md text-center hover:bg-violet-100"
        >
          Dialog
        </Link>
        <Link
          to="dropdown"
          className="p-4 border border-indigo-600 rounded-md text-center hover:bg-violet-100"
        >
          Dropdown
        </Link>
        <Link
          to="button"
          className="p-4 border border-indigo-600 rounded-md text-center hover:bg-violet-100"
        >
          Button
        </Link>
        <Link
          to="checkbox"
          className="p-4 border border-indigo-600 rounded-md text-center hover:bg-violet-100"
        >
          Checkbox
        </Link>
        <Link
          to="rating"
          className="p-4 border border-indigo-600 rounded-md text-center hover:bg-violet-100"
        >
          Rating
        </Link>
        <Link
          to="tooltip"
          className="p-4 border border-indigo-600 rounded-md text-center hover:bg-violet-100"
        >
          Tooltip
        </Link>
        <Link
          to="alert"
          className="p-4 border border-indigo-600 rounded-md text-center hover:bg-violet-100"
        >
          Alert
        </Link>
        <Link
          to="accordion"
          className="p-4 border border-indigo-600 rounded-md text-center hover:bg-violet-100"
        >
          Accordion
        </Link>
      </div>
    </TkCard>
  );
}
export default Components;
