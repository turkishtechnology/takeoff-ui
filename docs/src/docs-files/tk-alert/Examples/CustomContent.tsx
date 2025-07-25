import { TkAlert } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Content = () => {
  const reactCode = `<TkAlert
  variant="info"
  type="outlined"
>
  <div slot="content">...</div>
</TkAlert>`;

  const vueCode = `<TkAlert
  variant="info"
  type="outlined"
>
  <div slot="content">...</div>
</TkAlert>`;

  const angularCode = `<tk-alert
  variant="info"
  type="outlined"
>
  <div slot="content">...</div>
</tk-alert>
`;

  const demo = (
    <div className="mb-4 flex flex-col gap-2">
      <TkAlert type="outlined" variant="info">
        <div
          slot="content"
          className="text-sm text-gray-800 leading-relaxed space-y-2"
        >
          <p>
            <h4 className="text-blue-600">İnfo</h4> lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quisquam, quos.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>
              <span className="font-medium">Email</span>: lorem ipsum dolor sit
              amet
            </li>
          </ul>
          <p>
            lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
        </div>
      </TkAlert>
    </div>
  );
  return (
    <>
      <FeatureDemo
        demo={demo}
        reactCode={reactCode}
        vueCode={vueCode}
        angularCode={angularCode}
      ></FeatureDemo>
    </>
  );
};

export default Content;
