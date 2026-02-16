import React from 'react';
import { TkCard, TkButton } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const CardWithFooter = () => {
  const reactCode = `<TkCard header="Card with Footer" footerType="basic">
  <p>This card demonstrates the use of a footer with action buttons.</p>
  <div slot="footer-actions">
    <TkButton label="Cancel" variant="neutral" type="text"></TkButton>
    <TkButton label="Submit" variant="primary"></TkButton>
  </div>
</TkCard>

<TkCard header="Card with Footer" footerType="divided">
  <p>This card demonstrates the use of a footer with action buttons.</p>
  <div slot="footer-actions">
    <TkButton label="Cancel" variant="neutral" type="text"></TkButton>
    <TkButton label="Submit" variant="primary"></TkButton>
  </div>
</TkCard>

<TkCard header="Card with Footer" footerType="light">
  <p>This card demonstrates the use of a footer with action buttons.</p>
  <div slot="footer-actions">
    <TkButton label="Cancel" variant="neutral" type="text"></TkButton>
    <TkButton label="Submit" variant="primary"></TkButton>
  </div>
</TkCard>`;

  const vueCode = `<TkCard header="Card with Footer" footerType="basic">
  <p>This card demonstrates the use of a footer with action buttons.</p>
  <div slot="footer-actions">
    <TkButton label="Cancel" variant="neutral" type="text"></TkButton>
    <TkButton label="Submit" variant="primary"></TkButton>
  </div>
</TkCard>

<TkCard header="Card with Footer" footerType="divided">
  <p>This card demonstrates the use of a footer with action buttons.</p>
  <div slot="footer-actions">
    <TkButton label="Cancel" variant="neutral" type="text"></TkButton>
    <TkButton label="Submit" variant="primary"></TkButton>
  </div>
</TkCard>

<TkCard header="Card with Footer" footerType="light">
  <p>This card demonstrates the use of a footer with action buttons.</p>
  <div slot="footer-actions">
    <TkButton label="Cancel" variant="neutral" type="text"></TkButton>
    <TkButton label="Submit" variant="primary"></TkButton>
  </div>
</TkCard>`;

  const angularCode = `<tk-card header="Card with Footer" footer-type="basic">
  <p>This card demonstrates the use of a footer with action buttons.</p>
  <div slot="footer-actions">
    <tk-button label="Cancel" variant="neutral" type="text"></tk-button>
    <tk-button label="Submit" variant="primary"></tk-button>
  </div>
</tk-card>

<tk-card header="Card with Footer" footer-type="divided">
  <p>This card demonstrates the use of a footer with action buttons.</p>
  <div slot="footer-actions">
    <tk-button label="Cancel" variant="neutral" type="text"></tk-button>
    <tk-button label="Submit" variant="primary"></tk-button>
  </div>
</tk-card>

<tk-card header="Card with Footer" footer-type="light">
  <p>This card demonstrates the use of a footer with action buttons.</p>
  <div slot="footer-actions">
    <tk-button label="Cancel" variant="neutral" type="text"></tk-button>
    <tk-button label="Submit" variant="primary"></tk-button>
  </div>
</tk-card>`;

  const demo = (
    <>
      <div>
        <h3>Basic Footer</h3>
        <TkCard header="Card with Footer" footerType="basic">
          <p>This card demonstrates the use of a footer with action buttons.</p>
          <div slot="footer-actions">
            <TkButton label="Cancel" variant="neutral" type="text"></TkButton>
            <TkButton label="Submit" variant="primary"></TkButton>
          </div>
        </TkCard>
      </div>
      <br />
      <div>
        <h3>Divided Footer</h3>
        <TkCard header="Card with Footer" footerType="divided">
          <p>This card demonstrates the use of a footer with action buttons.</p>
          <div slot="footer-actions">
            <TkButton label="Cancel" variant="neutral" type="text"></TkButton>
            <TkButton label="Submit" variant="primary"></TkButton>
          </div>
        </TkCard>
      </div>
      <br />
      <div>
        <h3>Light Footer</h3>
        <TkCard header="Card with Footer" footerType="light">
          <p>This card demonstrates the use of a footer with action buttons.</p>
          <div slot="footer-actions">
            <TkButton label="Cancel" variant="neutral" type="text"></TkButton>
            <TkButton label="Submit" variant="primary"></TkButton>
          </div>
        </TkCard>
      </div>
    </>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};
export default CardWithFooter;
