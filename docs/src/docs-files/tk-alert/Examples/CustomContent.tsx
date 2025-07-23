import { TkAlert, TkIcon } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Content = () => {
  const reactCode = `<TkAlert
  variant="warning"
  type="outlined"
>
  <div slot="content">...</div>
</TkAlert>`;

  const vueCode = `<TkAlert
  variant="warning"
  type="outlined"
>
  <div slot="content">...</div>
</TkAlert>`;

  const angularCode = `<tk-alert
  variant="warning"
  type="outlined"
>
  <div slot="content">...</div>
</tk-alert>
`;

  const demo = (
    <div className="mb-4 flex flex-col gap-2">
      <TkAlert type="outlined" variant="warning">
        <div
          slot="content"
          className="text-sm text-gray-800 leading-relaxed space-y-2"
        >
          <p>
            <h4 className="text-red-600">Error</h4> Your form could not be
            submitted due to the following issues:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>
              <span className="font-medium">Email</span>: Please enter a valid
              email address.
            </li>
            <li>
              <span className="font-medium">Password</span>: Must be at least 8
              characters and contain one uppercase letter.
            </li>
            <li>
              <span className="font-medium">Terms & Conditions</span>: You must
              accept the terms to proceed.
            </li>
          </ul>
          <p>
            Fix the above errors and try submitting again. If you need
            assistance, please visit our{' '}
            <a className="text-blue-600 underline hover:text-blue-800">
              support page
            </a>
            .
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
