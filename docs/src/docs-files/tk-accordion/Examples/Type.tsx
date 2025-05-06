import { TkAccordion, TkAccordionItem } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Styles = () => {
  const reactCode = `<TkAccordion allow-multiple="false" type="grouped">
  <TkAccordionItem icon="flight">
    <span slot="header">Panel 1 Title</span>
    <div slot="content">Panel 1 Content</div>
  </TkAccordionItem>
  <TkAccordionItem icon="flight">
    <span slot="header">Panel 2 Title</span>
    <div slot="content">Panel 2 Content</div>
  </TkAccordionItem>
  <TkAccordionItem icon="travel">
    <span slot="header">Panel 3 Title</span>
    <div slot="content">Panel 3 Content</div>
  </TkAccordionItem>
</TkAccordion>

<TkAccordion allow-multiple="true" type="divided">
  <TkAccordionItem size="base" icon="flight">
    <span slot="header">Panel 1 Title</span>
    <div slot="content">Panel 1 Content</div>
  </TkAccordionItem>
  <TkAccordionItem icon="flight">
    <span slot="header">Panel 2 Title</span>
    <div slot="content">Panel 2 Content</div>
  </TkAccordionItem>
  <TkAccordionItem icon="travel">
    <span slot="header">Panel 3 Title</span>
    <div slot="content">Panel 3 Content</div>
  </TkAccordionItem>
</TkAccordion>`;

  const vueCode = `<TkAccordion allow-multiple="false" type="grouped">
  <TkAccordionItem icon="flight">
    <span slot="header">Panel 1 Title</span>
    <div slot="content">Panel 1 Content</div>
  </TkAccordionItem>
  <TkAccordionItem icon="flight">
    <span slot="header">Panel 2 Title</span>
    <div slot="content">Panel 2 Content</div>
  </TkAccordionItem>
  <TkAccordionItem icon="travel">
    <span slot="header">Panel 3 Title</span>
    <div slot="content">Panel 3 Content</div>
  </TkAccordionItem>
</TkAccordion>
<TkAccordion allow-multiple="true" type="divided">
  <TkAccordionItem size="base" icon="flight">
    <span slot="header">Panel 1 Title</span>
    <div slot="content">Panel 1 Content</div>
  </TkAccordionItem>
  <TkAccordionItem icon="flight">
    <span slot="header">Panel 2 Title</span>
    <div slot="content">Panel 2 Content</div>
  </TkAccordionItem>
  <TkAccordionItem icon="travel">
    <span slot="header">Panel 3 Title</span>
    <div slot="content">Panel 3 Content</div>
  </TkAccordionItem>
</TkAccordion>`;

  const angularCode = `<tk-accordion allow-multiple="false" type="grouped">
  <tk-accordion-item icon="flight">
    <span slot="header">Panel 1 Title</span>
    <div slot="content">Panel 1 Content</div>
  </tk-accordion-item>
  <tk-accordion-item icon="flight">
    <span slot="header">Panel 2 Title</span>
    <div slot="content">Panel 2 Content</div>
  </tk-accordion-item>
  <tk-accordion-item icon="travel">
    <span slot="header">Panel 3 Title</span>
    <div slot="content">Panel 3 Content</div>
  </tk-accordion-item>
</tk-accordion>
<tk-accordion allow-multiple="true" type="divided">
  <tk-accordion-item size="base" icon="flight">
    <span slot="header">Panel 1 Title</span>
    <div slot="content">Panel 1 Content</div>
  </tk-accordion-item>
  <tk-accordion-item icon="flight">
    <span slot="header">Panel 2 Title</span>
    <div slot="content">Panel 2 Content</div>
  </tk-accordion-item>
  <tk-accordion-item icon="travel">
    <span slot="header">Panel 3 Title</span>
    <div slot="content">Panel 3 Content</div>
  </tk-accordion-item>
</tk-accordion>`;

  const demo = (
    <>
      <div className="container">
        <div>Grouped</div>
        <TkAccordion allow-multiple="false" type="grouped">
          <TkAccordionItem icon="flight">
            <span slot="header">Panel 1 Title</span>
            <div slot="content">Panel 1 Content</div>
          </TkAccordionItem>
          <TkAccordionItem icon="flight">
            <span slot="header">Panel 2 Title</span>
            <div slot="content">Panel 2 Content</div>
          </TkAccordionItem>
          <TkAccordionItem icon="travel">
            <span slot="header">Panel 3 Title</span>
            <div slot="content">Panel 3 Content</div>
          </TkAccordionItem>
        </TkAccordion>
      </div>
      <br />

      <div className="container">
        <div>Divided</div>
        <TkAccordion allow-multiple="true" type="divided">
          <TkAccordionItem size="base" icon="flight">
            <span slot="header">Panel 1 Title</span>
            <div slot="content">Panel 1 Content</div>
          </TkAccordionItem>
          <TkAccordionItem icon="flight">
            <span slot="header">Panel 2 Title</span>
            <div slot="content">Panel 2 Content</div>
          </TkAccordionItem>
          <TkAccordionItem icon="travel">
            <span slot="header">Panel 3 Title</span>
            <div slot="content">Panel 3 Content</div>
          </TkAccordionItem>
        </TkAccordion>
      </div>
    </>
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

export default Styles;
