import { TkAccordion, TkAccordionItem } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Mode = () => {
  const reactCode = `<TkAccordion mode="default">
  <TkAccordionItem>
    <span slot="header">Panel 1 Title</span>
    <div slot="content">Panel 1 Content</div>
  </TkAccordionItem>
</TkAccordion>

<TkAccordion mode="compact">
  <TkAccordionItem>
    <span slot="header">Panel 1 Title</span>
    <div slot="content">Panel 1 Content</div>
  </TkAccordionItem>
</TkAccordion>`;

  const vueCode = `<TkAccordion mode="default">
  <TkAccordionItem>
    <span slot="header">Panel 1 Title</span>
    <div slot="content">Panel 1 Content</div>
  </TkAccordionItem>
</TkAccordion>

<TkAccordion mode="compact">
  <TkAccordionItem>
    <span slot="header">Panel 1 Title</span>
    <div slot="content">Panel 1 Content</div>
  </TkAccordionItem>
</TkAccordion>`;

  const angularCode = `<tk-accordion mode="default">
    <tk-accordion-item>
      <span slot="header">Panel 1 Title</span>
      <div slot="content">Panel 1 Content</div>
    </tk-accordion-item>
  </tk-accordion>
  
  <tk-accordion mode="compact">
    <tk-accordion-item>
      <span slot="header">Panel 1 Title</span>
      <div slot="content">Panel 1 Content</div>
    </tk-accordion-item>
  </tk-accordion>`;

  const demo = (
    <>
      <div className="container">
        <div>Default Mode</div>
        <TkAccordion mode="default">
          <TkAccordionItem>
            <span slot="header">Panel 1 Title</span>
            <div slot="content">Panel 1 Content</div>
          </TkAccordionItem>
          <TkAccordionItem>
            <span slot="header">Panel 2 Title</span>
            <div slot="content">Panel 2 Content</div>
          </TkAccordionItem>
        </TkAccordion>
      </div>
      <br />

      <div className="container">
        <div>Compact Mode</div>
        <TkAccordion mode="compact">
          <TkAccordionItem>
            <span slot="header">Panel 1 Title</span>
            <div slot="content">Panel 1 Content</div>
          </TkAccordionItem>
          <TkAccordionItem>
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

export default Mode;
