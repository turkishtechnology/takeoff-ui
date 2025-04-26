import { TkAccordion, TkAccordionItem } from '@takeoff-ui/react';

import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Position = () => {
  const reactCode = `<TkAccordion arrow-position="left">
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
  const vueCode = `<TkAccordion arrow-position="left">
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

  const demo = (
    <>
      <div className="container">
        <div>Right Positioned Arrows</div>
        <TkAccordion allow-multiple="false">
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
      <br />

      <div className="container">
        <div>Left Positioned Arrows</div>
        <TkAccordion allow-multiple="false" arrow-position="left">
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
        angularCode={''}
      ></FeatureDemo>
    </>
  );
};

export default Position;
