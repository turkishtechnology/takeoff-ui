import React, { useEffect, useState } from 'react';
import { TkCard, TkButton, TkRadioGroup, TkRadio } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const CardWithFooter = () => {
  const [codeSampleReact, setCodeSampleReact] = useState('');
  const [codeSampleVue, setCodeSampleVue] = useState('');

  const [footerType, setFooterType] = useState<'basic' | 'divided' | 'light'>(
    'divided',
  );
  const footerTypes = [
    { label: 'Basic', value: 'basic' },
    { label: 'Divided', value: 'divided' },
    { label: 'Light', value: 'light' },
  ];

  const handleFooterTypeChange = (event) => {
    setFooterType(event.detail);
  };

  useEffect(() => {
    const attributesList = [
      `header="${
        footerType.charAt(0).toUpperCase() + footerType.slice(1)
      } Footer"`,
      `subheader="Interactive Example"`,
      `footerType="${footerType}"`,
    ].filter(Boolean);
    const attributes = attributesList.join('\n  ');

    const newCodeSampleReact = `import { TkCard, TkButton } from "@takeoff-ui/react";

<TkCard
 ${attributes}
>
    <p>
        This card demonstrates the use of a footer with action buttons.
    </p>
    <div slot="footer-actions">
        <TkButton variant="primary">Submit</TkButton>
        <TkButton variant="secondary" type="text">Cancel</TkButton>
    </div>
</TkCard>`;

    const newCodeSampleVue = `<TkCard
  ${attributes}
>
    <p>
        This card demonstrates the use of a footer with action buttons.
    </p>
    <div slot="footer-actions">
        <TkButton variant="primary">Submit</TkButton>
        <TkButton variant="secondary" type="text">Cancel</TkButton>
    </div>
</TkCard>
`;
    setCodeSampleReact(newCodeSampleReact);
    setCodeSampleVue(newCodeSampleVue);
  }, [footerType]);

  const demo = (
    <>
      <div style={{ overflow: 'overlay' }} className="mb-4">
        <TkRadioGroup
          label="Options"
          value={footerType}
          onTkChange={handleFooterTypeChange}
        >
          {footerTypes.map((radio, index) => {
            return (
              <TkRadio label={radio.label} key={index} value={radio.value} />
            );
          })}
        </TkRadioGroup>
      </div>
      <TkCard header="Card with Footer" footerType={footerType}>
        <p>This card demonstrates the use of a footer with action buttons.</p>
        <div slot="footer-actions">
          <TkButton label="Cancel" variant="neutral" type="text"></TkButton>
          <TkButton label="Submit" variant="primary"></TkButton>
        </div>
      </TkCard>
    </>
  );

  return (
    <FeatureDemo
      demo={demo}
      reactCode={codeSampleReact}
      vueCode={codeSampleVue}
      angularCode={''}
    ></FeatureDemo>
  );
};
export default CardWithFooter;
