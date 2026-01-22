import { TkAccordion, TkAccordionItem } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Position = () => {
  const reactCode = `<TkAccordion>
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

<TkAccordion arrowPosition="left">
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

  const vueCode = `<TkAccordion>
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

<TkAccordion arrowPosition="left">
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

  const angularCode = `<tk-accordion>
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
</tk-accordion>

<tk-accordion arrow-position="left">
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
    <div className="flex flex-col gap-4">
      <div>
        <div className="mb-2">Right Positioned Arrows</div>
        <TkAccordion allowMultiple={false}>
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

      <div>
        <div className="mb-2">Left Positioned Arrows</div>
        <TkAccordion allowMultiple={false} arrowPosition="left">
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
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Position;
