import { TkAccordion, TkAccordionItem } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const ItemActive = () => {
  const reactCode = `<TkAccordion>
  <TkAccordionItem header="Panel 1" active={true}>
    <div slot="content">Panel 1 Content</div>
  </TkAccordionItem>
  <TkAccordionItem header="Panel 2">
    <div slot="content">Panel 2 Content</div>
  </TkAccordionItem>
  <TkAccordionItem header="Panel 3">
    <div slot="content">Panel 3 Content</div>
  </TkAccordionItem>
</TkAccordion>`;

  const vueCode = `<TkAccordion>
  <TkAccordionItem header="Panel 1" :active="true">
    <div slot="content">Panel 1 Content</div>
  </TkAccordionItem>
  <TkAccordionItem header="Panel 2">
    <div slot="content">Panel 2 Content</div>
  </TkAccordionItem>
  <TkAccordionItem header="Panel 3">
    <div slot="content">Panel 3 Content</div>
  </TkAccordionItem>
</TkAccordion>`;

  const angularCode = `<tk-accordion>
  <tk-accordion-item header="Panel 1" [active]="true">
    <div slot="content">Panel 1 Content</div>
  </tk-accordion-item>
  <tk-accordion-item header="Panel 2">
    <div slot="content">Panel 2 Content</div>
  </tk-accordion-item>
  <tk-accordion-item header="Panel 3">
    <div slot="content">Panel 3 Content</div>
  </tk-accordion-item>
</tk-accordion>`;

  const demo = (
    <TkAccordion>
      <TkAccordionItem header="Panel 1" active={true}>
        <div slot="content">Panel 1 Content</div>
      </TkAccordionItem>
      <TkAccordionItem header="Panel 2">
        <div slot="content">Panel 2 Content</div>
      </TkAccordionItem>
      <TkAccordionItem header="Panel 3">
        <div slot="content">Panel 3 Content</div>
      </TkAccordionItem>
    </TkAccordion>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default ItemActive;
