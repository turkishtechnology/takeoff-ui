import { TkAccordion, TkAccordionItem } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Size = () => {
  const reactCode = `<TkAccordion>
  <TkAccordionItem header="Base Size Panel" size="base">
    <div slot="content">Panel 1 Content</div>
  </TkAccordionItem>
  <TkAccordionItem header="Large Size Panel" size="large">
    <div slot="content">Panel 2 Content</div>
  </TkAccordionItem>
</TkAccordion>`;

  const vueCode = `<tk-accordion>
  <tk-accordion-item header="Base Size Panel" size="base">
    <div slot="content">Panel 1 Content</div>
  </tk-accordion-item>
  <tk-accordion-item header="Large Size Panel" size="large">
    <div slot="content">Panel 2 Content</div>
  </tk-accordion-item>
</tk-accordion>`;

  const angularCode = `<tk-accordion>
  <tk-accordion-item header="Base Size Panel" size="base">
    <div slot="content">Panel 1 Content</div>
  </tk-accordion-item>
  <tk-accordion-item header="Large Size Panel" size="large">
    <div slot="content">Panel 2 Content</div>
  </tk-accordion-item>
</tk-accordion>`;

  const demo = (
    <TkAccordion>
      <TkAccordionItem header="Base Size Panel" size="base">
        <div slot="content">Panel 1 Content</div>
      </TkAccordionItem>
      <TkAccordionItem header="Large Size Panel" size="large">
        <div slot="content"> Panel 2 Content</div>
      </TkAccordionItem>
    </TkAccordion>
  );
  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Size;
