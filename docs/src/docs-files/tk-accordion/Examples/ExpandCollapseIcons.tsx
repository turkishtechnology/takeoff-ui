import { TkAccordion, TkAccordionItem } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const ExpandCollapseIcons = () => {
  const reactCode = `<TkAccordion expandIcon="add" collapseIcon="remove">
  <TkAccordionItem icon="flight"> 
    <span slot="header">Panel 1 Title</span>
    <div slot="content">Panel 1 Content</div>
  </TkAccordionItem>
  <TkAccordionItem icon="flight">
    <span slot="header">Panel 2 Title</span>
    <div slot="content">Panel 2 Content</div>
  </TkAccordionItem>
</TkAccordion>`;

  const vueCode = `<TkAccordion expandIcon="add" collapseIcon="remove">
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
    <TkAccordion expandIcon="add" collapseIcon="remove">
      <TkAccordionItem icon="flight">
        <span slot="header">Panel 1 Title</span>
        <div slot="content">Panel 1 Content</div>
      </TkAccordionItem>
      <TkAccordionItem icon="flight">
        <span slot="header">Panel 2 Title</span>
        <div slot="content">Panel 2 Content</div>
      </TkAccordionItem>
    </TkAccordion>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default ExpandCollapseIcons;
