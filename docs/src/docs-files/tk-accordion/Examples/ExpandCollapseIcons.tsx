import { TkAccordion, TkAccordionItem } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Icons = () => {
  const reactCode = `<TkAccordion expand-icon="add" collapse-icon="remove">
  <TkAccordionItem icon="flight"> 
    <span slot="header">Panel 1 Title</span>
    <div slot="content">Panel 1 Content</div>
  </TkAccordionItem>
  <TkAccordionItem icon="flight">
    <span slot="header">Panel 2 Title</span>
    <div slot="content">Panel 2 Content</div>
  </TkAccordionItem>
</TkAccordion>`;

  const vueCode = `<TkAccordion expand-icon="add" collapse-icon="remove">
  <TkAccordionItem icon="flight">
    <span slot="header">Panel 1 Title</span>
    <div slot="content">Panel 1 Content</div>
  </TkAccordionItem>
  <TkAccordionItem icon="flight">
    <span slot="header">Panel 2 Title</span>
    <div slot="content">Panel 2 Content</div>
  </TkAccordionItem>
</TkAccordion>`;

  const angularCode = `<tk-accordion expand-icon="add" collapse-icon="remove">
  <tk-accordion-item icon="flight">
    <span slot="header">Panel 1 Title</span>
    <div slot="content">Panel 1 Content</div>
  </tk-accordion-item>
  <tk-accordion-item icon="flight">
    <span slot="header">Panel 2 Title</span>
    <div slot="content">Panel 2 Content</div>
  </tk-accordion-item>
</tk-accordion>`;

  const demo = (
    <>
      <div className="container">
        <TkAccordion expand-icon="add" collapse-icon="remove">
          <TkAccordionItem icon="flight">
            <span slot="header">Panel 1 Title</span>
            <div slot="content">Panel 1 Content</div>
          </TkAccordionItem>
          <TkAccordionItem icon="flight">
            <span slot="header">Panel 2 Title</span>
            <div slot="content">Panel 2 Content</div>
          </TkAccordionItem>
        </TkAccordion>
      </div>
    </>
  );
  return (
    <>
      <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>
    </>
  );
};

export default Icons;
