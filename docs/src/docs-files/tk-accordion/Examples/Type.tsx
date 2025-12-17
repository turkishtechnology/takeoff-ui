import { TkAccordion, TkAccordionItem } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Styles = () => {
  const reactCode = `<TkAccordion type="grouped">
  <TkAccordionItem>
    <span slot="header">Panel 1 Title</span>
    <div slot="content">Panel 1 Content</div>
  </TkAccordionItem>
  <TkAccordionItem>
    <span slot="header">Panel 2 Title</span>
    <div slot="content">Panel 2 Content</div>
  </TkAccordionItem>
  <TkAccordionItem>
    <span slot="header">Panel 3 Title</span>
    <div slot="content">Panel 3 Content</div>
  </TkAccordionItem>
</TkAccordion>

<TkAccordion type="divided">
  <TkAccordionItem size="base">
    <span slot="header">Panel 1 Title</span>
    <div slot="content">Panel 1 Content</div>
  </TkAccordionItem>
  <TkAccordionItem>
    <span slot="header">Panel 2 Title</span>
    <div slot="content">Panel 2 Content</div>
  </TkAccordionItem>
  <TkAccordionItem>
    <span slot="header">Panel 3 Title</span>
    <div slot="content">Panel 3 Content</div>
  </TkAccordionItem>
</TkAccordion>`;

  const vueCode = `<TkAccordion type="grouped">
  <TkAccordionItem>
    <span slot="header">Panel 1 Title</span>
    <div slot="content">Panel 1 Content</div>
  </TkAccordionItem>
  <TkAccordionItem>
    <span slot="header">Panel 2 Title</span>
    <div slot="content">Panel 2 Content</div>
  </TkAccordionItem>
  <TkAccordionItem>
    <span slot="header">Panel 3 Title</span>
    <div slot="content">Panel 3 Content</div>
  </TkAccordionItem>
</TkAccordion>
<TkAccordion type="divided">
  <TkAccordionItem>
    <span slot="header">Panel 1 Title</span>
    <div slot="content">Panel 1 Content</div>
  </TkAccordionItem>
  <TkAccordionItem>
    <span slot="header">Panel 2 Title</span>
    <div slot="content">Panel 2 Content</div>
  </TkAccordionItem>
  <TkAccordionItem>
    <span slot="header">Panel 3 Title</span>
    <div slot="content">Panel 3 Content</div>
  </TkAccordionItem>
</TkAccordion>`;

  const angularCode = `<tk-accordion type="grouped">
    <tk-accordion-item>
      <span slot="header">Panel 1 Title</span>
      <div slot="content">Panel 1 Content</div>
    </tk-accordion-item>
    <tk-accordion-item>
      <span slot="header">Panel 2 Title</span>
      <div slot="content">Panel 2 Content</div>
    </tk-accordion-item>
    <tk-accordion-item>
      <span slot="header">Panel 3 Title</span>
      <div slot="content">Panel 3 Content</div>
    </tk-accordion-item>
  </tk-accordion>
  
  <tk-accordion type="divided">
    <tk-accordion-item>
      <span slot="header">Panel 1 Title</span>
      <div slot="content">Panel 1 Content</div>
    </tk-accordion-item>
    <tk-accordion-item>
      <span slot="header">Panel 2 Title</span>
      <div slot="content">Panel 2 Content</div>
    </tk-accordion-item>
    <tk-accordion-item>
      <span slot="header">Panel 3 Title</span>
      <div slot="content">Panel 3 Content</div>
    </tk-accordion-item>
  </tk-accordion>`;

  const demo = (
    <>
      <div className="container">
        <div>Grouped</div>
        <TkAccordion type="grouped">
          <TkAccordionItem>
            <span slot="header">Panel 1 Title</span>
            <div slot="content">Panel 1 Content</div>
          </TkAccordionItem>
          <TkAccordionItem>
            <span slot="header">Panel 2 Title</span>
            <div slot="content">Panel 2 Content</div>
          </TkAccordionItem>
          <TkAccordionItem>
            <span slot="header">Panel 3 Title</span>
            <div slot="content">Panel 3 Content</div>
          </TkAccordionItem>
        </TkAccordion>
      </div>
      <br />

      <div className="container">
        <div>Divided</div>
        <TkAccordion type="divided">
          <TkAccordionItem>
            <span slot="header">Panel 1 Title</span>
            <div slot="content">Panel 1 Content</div>
          </TkAccordionItem>
          <TkAccordionItem>
            <span slot="header">Panel 2 Title</span>
            <div slot="content">Panel 2 Content</div>
          </TkAccordionItem>
          <TkAccordionItem>
            <span slot="header">Panel 3 Title</span>
            <div slot="content">Panel 3 Content</div>
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

export default Styles;
