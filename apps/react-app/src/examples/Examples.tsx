import { TkCard } from '@takeoff-ui/react';
import { Link } from 'react-router-dom';

function Examples() {
  return (
    <TkCard>
      <div slot="header">
        <h1 className="p-3 text-3xl font-semibold text-slate-500">Examples</h1>
      </div>

      <p>
        Komponentlerin birlikte ve daha kompleks kullanımlarını deneyebilmemiz
        için oluşturuldu.
      </p>

      <div className="grid grid-cols-6 gap-4 mt-4">
        <Link
          to="react-hook-form"
          className="p-4 border border-indigo-600 rounded-md text-center hover:bg-violet-100"
        >
          React Hook Form
        </Link>
        <Link
          to="zod-validation"
          className="p-4 border border-indigo-600 rounded-md text-center hover:bg-violet-100"
        >
          Zod Validation
        </Link>
      </div>
    </TkCard>
  );
}
export default Examples;
